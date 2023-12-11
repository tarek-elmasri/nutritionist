import Image, { StaticImageData } from "next/image";
import pic1 from "@/assets/pic-1.png";
import pic2 from "@/assets/pic-2.png";
import pic3 from "@/assets/pic-3.png";
import appleIcon from "@/assets/apple-icon.png";
import bananIcon from "@/assets/banana-icon.png";
import avocadoIcon from "@/assets/avocado-icon.png";
import separator from "@/assets/separator.svg";
import successMark from "@/assets/success-red.png";

const Feature = ({ text }: { text: string }) => (
  <li className="flex items-center justify-start gap-6">
    <Image alt="" src={successMark} />
    <p className="font-medium">{text}</p>
  </li>
);

const Plan = ({ label, icon }: { label: string; icon: StaticImageData }) => (
  <li className="flex items-center gap-3">
    <Image alt="apple-icon" src={icon} />
    <p className="font-semibold text-xl">{label}</p>
  </li>
);

const Benifits = () => {
  return (
    <div
      className="relative w-full max-w-6xl mx-auto py-16 overflow-hidden"
      id="why-healthy"
    >
      <div className="grid gap-6 grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="relative col-span-2 flex items-center justify-center ">
          <h2 className="absolute inset-0 text-6xl md:text-8xl opacity-10 flex items-center justify-center">
            LIFE STYLE
          </h2>
          <h3 className="text-center text-3xl md:text-5xl font-bold">
            Why Healthy
          </h3>
        </div>

        <Image
          alt="healthy lady eating salad"
          src={pic1}
          className="order-3 md:order-1 md:row-span-2  object-cover justify-self-start self-center pt-6"
        />

        <div className="order-1 md:order-2 col-span-2 md:col-span-1  row-span-2  flex justify-start items-center">
          <ul className="h-full flex flex-col justify-around items-start gap-6">
            <Feature text="Improved physical health." />
            <Feature text="Better mental health." />
            <Feature text="Increased longevity." />
            <Feature text="Weight management." />
            <Feature text="Improved self-confidence." />
            <Feature text="Reduced stress." />
          </ul>
        </div>

        <Image
          className="order-2 w-full object-cover self-end justify-self-start"
          alt="young lady doing yuga"
          src={pic2}
        />

        <Image
          alt="bars"
          src={pic3}
          className="order-4 col-span-2 w-full object-cover justify-self-start"
        />
      </div>

      {/* plans container */}
      <div className="pt-12 md:pt-24 max-w-6xl mx-auto">
        <div className="w-full pt-12 pb-6 px-6 bg-gradient-green shadow-md shadow-primary/30 rounded-[4rem]">
          <p className="font-semibold text-xl text-center">We have plans for</p>
          <p className="text-sm font-medium text-neutral-600 text-balance text-center">
            Build healthier habbits with personalized lessons
          </p>

          {/* separator line */}
          <Image alt="separator" src={separator} className="mt-3 mb-8" />

          {/* plans */}
          <ul className="flex flex-col md:flex-row justify-between md:items-center gap-6">
            <Plan label="Loosing weight" icon={appleIcon} />
            <Plan label="Gaining weight" icon={bananIcon} />
            <Plan label="Maintaining weight" icon={avocadoIcon} />
          </ul>
        </div>
      </div>

      {/* background strawberries */}
    </div>
  );
};

export default Benifits;
