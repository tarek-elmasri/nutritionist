"use client";

import { ActivityLevel, Gender, Goal } from "@/type";
import { Profile } from "@prisma/client";
import { create } from "zustand";

export type CreateProfileForm = Partial<Omit<Profile, "id">> &
  Partial<{ height: number; weight: number }>;
interface UseCreateProfileProps {
  form: CreateProfileForm;
  setForm: (form: CreateProfileForm) => void;
  totalSteps: number;
  setStepsCount: (stepsCount: number) => void;
  currentStepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
}

const initalFormData: CreateProfileForm = {
  goal: Goal.LOSE_WEIGHT,
  name: "",
  dob: new Date(new Date().setFullYear(1985)),
  gender: Gender.MALE,
  activityLevel: ActivityLevel.LOW,
  weight: 0,
  height: 0,
  objective: "",
  userId: "",
  subscriptionPlanId: "",
};

const useCreateProfile = create<UseCreateProfileProps>((set) => ({
  form: initalFormData,
  totalSteps: 0,
  currentStepIndex: 0,
  setForm: (fields) =>
    set((state) => ({ ...state, form: { ...state.form, ...fields } })),
  setStepsCount: (stepsCount) =>
    set((state) => ({ ...state, totalSteps: stepsCount })),
  nextStep: () =>
    set((state) => {
      const nextStepIndex =
        state.currentStepIndex === state.totalSteps - 1
          ? state.currentStepIndex
          : state.currentStepIndex + 1;
      return {
        ...state,
        currentStepIndex: nextStepIndex,
      };
    }),
  prevStep: () =>
    set((state) => {
      const prevStepIndex =
        state.currentStepIndex === 0 ? 0 : state.currentStepIndex - 1;
      return {
        ...state,
        currentStepIndex: prevStepIndex,
      };
    }),
}));

export default useCreateProfile;
