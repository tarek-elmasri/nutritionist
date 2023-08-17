"use client";

import { Button } from "@/components/ui/button";
import useSteps from "@/hooks/use-steps";
import React from "react";
import ServesTable from "./serves-table";

const ServesStep = () => {
  const { prevStep, nextStep } = useSteps();

  return (
    <div>
      <ServesTable />
      <div className="py-12 w-full flex justify-end gap-6 items-center">
        <Button
          variant={"outline"}
          className="ring-lightgreen"
          onClick={() => prevStep()}
        >
          Back
        </Button>
        <Button onClick={() => nextStep()}>Next</Button>
      </div>
    </div>
  );
};

export default ServesStep;
