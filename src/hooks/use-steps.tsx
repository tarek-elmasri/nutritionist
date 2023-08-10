import { create } from "zustand";

interface UseStepsProps {
  totalSteps: number;
  setStepsCount: (stepsCount: number) => void;
  currentStepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
}

const useSteps = create<UseStepsProps>((set) => ({
  totalSteps: 0,
  currentStepIndex: 0,
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

export default useSteps;
