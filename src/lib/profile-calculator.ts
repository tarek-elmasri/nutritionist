import { ActivityLevel, Gender, IdealZone, WeightCategory } from "@/type";
import { Profile, Record } from "@prisma/client";
import { calculateAgeFromDOB } from "./utils";

class ProfileCalculator {
  weight: number;
  height: number;
  age: number;
  dob: Date;
  gender: Gender;
  activityLevel: ActivityLevel;
  name: string;

  customCalorieFactor?: number;
  customCHOPercentage?: number;
  customProtienPercentage?: number;

  constructor(
    profile: Pick<Profile, "name" | "dob" | "gender" | "activityLevel"> &
      Pick<Record, "height" | "weight">
  ) {
    this.name = profile.name;
    this.weight = profile.weight;
    this.height = profile.height;
    this.dob = profile.dob;
    this.age = calculateAgeFromDOB(profile.dob);
    this.gender = profile.gender as Gender;
    this.activityLevel = profile.activityLevel as ActivityLevel;
  }

  getIdealBodyWeight = () => {
    return this.height - 100;
  };

  getIdealZone = (): IdealZone => {
    const idealBodyWeight = this.getIdealBodyWeight();
    const maxZone = 0.3 * idealBodyWeight + idealBodyWeight;
    let minZone = 0.3 * idealBodyWeight - idealBodyWeight;

    if (minZone < 0) {
      minZone = -1 * minZone;
    }

    return {
      max: parseFloat(maxZone.toFixed(2)),
      min: parseFloat(minZone.toFixed(2)),
    };
  };

  getDesiredBodyWeight = () => {
    const idealBodyWeight = this.getIdealBodyWeight();
    const idealZone = this.getIdealZone();
    const genderFactor = this.gender === Gender.MALE ? 0.38 : 0.32;

    // scenario no1 => weight in ideal zone
    if (this.weight <= idealZone.max && this.weight >= idealZone.min) {
      return idealBodyWeight;
    }

    // scenario no2 => outside range
    const desiredBodyWeight =
      (this.weight - idealBodyWeight) * genderFactor + idealBodyWeight;
    return parseFloat(desiredBodyWeight.toFixed(2));
  };

  getBMI = () => {
    const BMI = this.weight / ((this.height / 100) * (this.height / 100));
    return parseFloat(BMI.toFixed(2));
  };

  getWeightCategory = (): WeightCategory => {
    const BMI = this.getBMI();

    return BMI > 40
      ? WeightCategory.DANGEROUS_OBESE
      : BMI > 35
      ? WeightCategory.CRITICAL_OBESE
      : BMI > 30
      ? WeightCategory.OBESE
      : BMI > 25
      ? WeightCategory.OVER_WEIGHT
      : BMI > 18.5
      ? WeightCategory.NORMAL
      : BMI > 16.5
      ? WeightCategory.UNDER_WEIGHT
      : WeightCategory.SEVERELY_UNDER_WEIGHT;
  };

  getCaloriesFactor = () => {
    const BMI = this.getBMI();
    switch (this.activityLevel) {
      case ActivityLevel.LOW:
        return BMI > 25 ? 20 : BMI > 18.5 ? 30 : 35;

      case ActivityLevel.MEDIUM:
        return BMI > 25 ? 30 : BMI > 18.5 ? 35 : 40;

      case ActivityLevel.HIGH:
        return BMI > 25 ? 35 : BMI > 18.5 ? 40 : 45;

      default:
        return 0;
    }
  };

  getTotalCalories = (customCalorieFactor?: number) => {
    const calorieFactor = this.customCalorieFactor || this.getCaloriesFactor();
    const totalCalories = calorieFactor * this.getDesiredBodyWeight();
    return parseFloat(totalCalories.toFixed(2));
  };

  getTotalProtein = (
    customProtienPercentage?: number,
    customCalorieFactor?: number
  ) => {
    const protienPercentage = this.customProtienPercentage
      ? this.customProtienPercentage / 100
      : 0.2;

    // healthy adults
    if (this.age > 18) {
      const adultsTotalProtiens =
        (protienPercentage * this.getTotalCalories(this.customCalorieFactor)) /
        4;
      return parseFloat(adultsTotalProtiens.toFixed(2));
    }

    // kids
    const kidsTotalProtiens = 1.5 * this.getDesiredBodyWeight();
    return parseFloat(kidsTotalProtiens.toFixed(2));
  };

  getTotalCHO = (
    customCHOPercentage?: number,
    customCalorieFactor?: number
  ) => {
    const percentage = this.customCHOPercentage
      ? this.customCHOPercentage / 100
      : 0.6;

    const totalCHO =
      (percentage * this.getTotalCalories(this.customCalorieFactor)) / 4;
    return parseFloat(totalCHO.toFixed(2));
  };

  getTotalFat = (customs?: {
    customCalorieFactor?: number;
    customCHOPercentage?: number;
    customProtienPercentage?: number;
  }) => {
    const totalCal = this.getTotalCalories(this.customCalorieFactor);

    const totalProtienInKCAL =
      this.getTotalProtein(this.customProtienPercentage) * 4;

    const totalCHOinKCAL = this.getTotalCHO(this.customCHOPercentage) * 4;

    const totalFatinKCAL = totalCal - totalProtienInKCAL - totalCHOinKCAL;

    const totalFat = totalFatinKCAL / 9;

    return parseFloat(totalFat.toFixed(2));
  };

  getMaximumSaturatedFat = (customCalorieFactor?: number) => {
    const maxSaturated =
      (0.1 * this.getTotalCalories(this.customCalorieFactor)) / 9;
    return parseFloat(maxSaturated.toFixed(2));
  };

  getMaximumUnsaturatedFat = (
    consumedSaturatedFat: number,
    customs?: {
      customCalorieFactor?: number;
      customCHOPercentage?: number;
      customProtienPercentage?: number;
    }
  ) => parseFloat((this.getTotalFat() - consumedSaturatedFat).toFixed(2));
}

export default ProfileCalculator;
