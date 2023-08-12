"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";

const WelcomeMessage = () => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-0">
        <Image src={logo} alt="" className="mx-auto opacity-10" />
      </div>
      <div className="space-y-6">
        <h4 className="section-header text-primary">
          <span className="text-3xl">Welcome</span> to our platform!
          <br />
          We are thrilled to have you on board as a registered member.
        </h4>
        <p>
          Congratulations on taking the first step towards a healthier
          lifestyle!
        </p>
        <p>
          We understand that acheiving your health and wellness goals can be
          challenging, but we rest assured, our team of expert nutritionists is
          already hard at work creating a personalized diet plan just for you.
        </p>
        <p>
          Our dedicated professionals are committed to providing you with the
          guidance and support you need to make positive changesin your life.
          They will take into account your unique preferences, dietry
          restrictions, and health objectives to develop a plan that is tailored
          specifivally to meet your needs.
        </p>
        <p>
          When your first diet is ready, you will recieve a notification to
          explore the plans created for you.
        </p>
        <p>
          Once again, congratulations on joining our platform! We are excited
          about the opportunity to assist you in achieving your health goals.
        </p>
        <p className="font-semibold text-primary"> Stay Tuned !!</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
