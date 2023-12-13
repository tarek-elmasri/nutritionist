"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/ui/page-loader";
import useCreateDietPlan from "@/hooks/use-create-diet-plan";
import useSteps from "@/hooks/use-steps";
import ProfileCalculator from "@/lib/profile-calculator";
import { type FC, useEffect, useState } from "react";

interface CustomInputProps {
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}
const CustomInput: FC<CustomInputProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor={name} className="text-xs font-semibold">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        maxLength={2}
        className="w-12 hover:ring-0 focus-visible:ring-0 text-center"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) ?? 0)}
      />
    </div>
  );
};

const ProfileSummaryStep = () => {
  const { profileCalculator: profile, setProfileCalculator } =
    useCreateDietPlan();
  const { nextStep } = useSteps();

  const initCustomFactors = {
    customCaloriesFactor:
      profile?.customCalorieFactor ?? profile?.getCaloriesFactor() ?? 0,
    customProtienPercentage: profile?.customProtienPercentage ?? 20,
    customCHOPercentage: profile?.customCHOPercentage ?? 60,
  };

  useEffect(() => {
    if (profile) {
      setCustomFactors({
        customCaloriesFactor:
          profile.customCalorieFactor ?? profile.getCaloriesFactor() ?? 0,
        customProtienPercentage: profile.customProtienPercentage ?? 20,
        customCHOPercentage: profile.customCHOPercentage ?? 60,
      });
    }
  }, [profile]);

  const [customFactors, setCustomFactors] = useState(initCustomFactors);

  if (!profile) return <PageLoader />;
  const idealBodyWeight = profile.getIdealBodyWeight();
  const minIdealZone = profile.getIdealZone().min;
  const maxIdealZone = profile.getIdealZone().max;
  const desiredBodyWeight = profile.getDesiredBodyWeight();
  const BMI = profile.getBMI();
  const weightCategory = profile.getWeightCategory();
  const totalProtiens = profile.getTotalProtein();
  const totalCHO = profile.getTotalCHO();
  const totalFat = profile.getTotalFat();
  const totalCalories = profile.getTotalCalories();
  const totalStauratedFats = profile.getMaximumSaturatedFat();

  const applyCustomValues = () => {
    const newProfile = new ProfileCalculator({
      name: profile.name,
      activityLevel: profile.activityLevel,
      dob: profile.dob,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
    });
    newProfile.customCHOPercentage = customFactors.customCHOPercentage;
    newProfile.customCalorieFactor = customFactors.customCaloriesFactor;
    newProfile.customProtienPercentage = customFactors.customProtienPercentage;
    setProfileCalculator(newProfile);
  };

  return (
    <div className="space-y-6">
      <h3 className="section-header">Profile Summary:</h3>

      <div className="grid grid-cols-1 max-w-lg  gap-y-1">
        <div className="grid grid-cols-2 ">
          <p>BMI:</p>
          <p>{BMI}</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Weight Category:</p>
          <p>{weightCategory}</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Ideal Zone: </p>
          <p>{`${minIdealZone} KG - ${maxIdealZone} KG`}</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Ideal Body Weight:</p>
          <p>{idealBodyWeight} KG</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Desire Body Weight: </p>
          <p>{desiredBodyWeight} KG</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Total Calories:</p>
          <p>{totalCalories} KCAL</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Total CHO:</p>
          <p>{totalCHO} gm</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Total Protiens:</p>
          <p>{totalProtiens} gm</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Total Fats:</p>
          <p>{totalFat} gm</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p>Total Saturated Fats:</p>
          <p>{totalStauratedFats} gm</p>
        </div>
      </div>

      <div className="space-y-2 p-3">
        <h4 className="font-semibold">Custom Strategy?</h4>
        <div className="flex items-center gap-6 p-3 rounded-lg ring-2 ring-primary">
          <CustomInput
            name="customCaloriesFactor"
            label="Calories Factor"
            value={customFactors.customCaloriesFactor}
            onChange={(customCaloriesFactor) =>
              setCustomFactors((prev) => ({ ...prev, customCaloriesFactor }))
            }
          />

          <CustomInput
            name="customCHOPercentage"
            label="CHO Percentage"
            value={customFactors.customCHOPercentage}
            onChange={(customCHOPercentage) =>
              setCustomFactors((prev) => ({ ...prev, customCHOPercentage }))
            }
          />

          <CustomInput
            name="customProtienPercentage"
            label="Protien Percentage"
            value={customFactors.customProtienPercentage}
            onChange={(customProtienPercentage) =>
              setCustomFactors((prev) => ({ ...prev, customProtienPercentage }))
            }
          />

          <Button
            size={"sm"}
            className="text-sm rounded-full"
            onClick={applyCustomValues}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-end gap-6 items-center">
        <Button onClick={() => nextStep()}>Next</Button>
      </div>
    </div>
  );
};

export default ProfileSummaryStep;
