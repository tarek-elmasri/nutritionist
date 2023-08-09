"use client";

import { ActivityLevel, Gender, Goal } from "@/type";
import { Profile } from "@prisma/client";
import { create } from "zustand";

export type CreateProfileForm = Partial<Omit<Profile, "id">> &
  Partial<{ height: number; weight: number }>;
interface UseCreateProfileProps {
  form: CreateProfileForm;
  setForm: (form: CreateProfileForm) => void;
}

const initalFormData: CreateProfileForm = {
  goal: Goal.LOSE_WEIGHT,
  name: "",
  dob: new Date(new Date().setFullYear(1985)),
  gender: Gender.MALE,
  activityLevel: ActivityLevel.LOW,
  weight: 0,
  height: 0,
  chronicDisease: undefined,
  foodAllergy: undefined,
  previousDiet: false,
  objective: "",
  userId: "",
  subscriptionPlanId: "",
};

const useCreateProfile = create<UseCreateProfileProps>((set) => ({
  form: initalFormData,
  setForm: (fields) =>
    set((state) => ({ ...state, form: { ...state.form, ...fields } })),
}));

export default useCreateProfile;
