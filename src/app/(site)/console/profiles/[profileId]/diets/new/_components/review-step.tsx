"use client";

import successMark from "@/assets/success-red.png";
import Image from "next/image";

const ReviewItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-6">
    <Image src={successMark} alt="success" className="w-8 h-8" />
    <p>{label}</p>
  </div>
);
const ReviewStep = () => {
  return (
    <div className="space-y-6">
      <h3 className="section-header">Diet Plan Review:</h3>

      <ReviewItem label="Profile Calculations" />
      <ReviewItem label="Serves Distripution" />
      <ReviewItem label="Meals" />
      <ReviewItem label="Schedules" />

      <p className="text-primary font-semibold">
        * By Creating Diet Plan, your patient will recieve a notification and
        will be able to review the new plan.
      </p>
    </div>
  );
};

export default ReviewStep;
