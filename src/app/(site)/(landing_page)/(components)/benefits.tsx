import Image, { StaticImageData } from "next/image";
import pic1 from "@/assets/pic-1.png";
import pic2 from "@/assets/pic-2.png";
import pic3 from "@/assets/pic-3.png";
import appleIcon from "@/assets/apple-icon.png";
import bananIcon from "@/assets/banana-icon.png";
import avocadoIcon from "@/assets/avocado-icon.png";
import separator from "@/assets/separator.svg";
import strawberry from "@/assets/strawberries.png";
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
    <div className="relative w-full py-6 mt-6" id="why-healthy">
      <div className="p-6 w-full max-w-6xl mx-auto grid grid-cols-[1.5fr_1fr_1fr]">
        <div className="relative col-span-2 flex items-center justify-center ">
          <h2 className="absolute inset-0 text-8xl opacity-10 flex items-center justify-center">
            LIFE STYLE
          </h2>
          <h3 className="text-center text-4xl font-bold">Why Healthy</h3>
        </div>

        <Image
          alt="healthy lady eating salad"
          src={pic1}
          className="row-span-2 w-full object-cover justify-self-start self-center pt-6"
        />

        <div className="row-span-2 flex justify-start items-center">
          <ul className="h-full flex flex-col justify-around items-start">
            <Feature text="Improved physical health." />
            <Feature text="Better mental health." />
            <Feature text="Increased longevity." />
            <Feature text="Weight management." />
            <Feature text="Improved self-confidence." />
            <Feature text="Reduced stress." />
          </ul>
        </div>

        <Image
          className="w-full object-cover self-end justify-self-start"
          alt="young lady doing yuga"
          src={pic2}
        />

        <Image
          alt="bars"
          src={pic3}
          className="col-span-2 w-full object-cover justify-self-start"
        />
      </div>

      {/* plans container */}
      <div className="py-24 max-w-6xl mx-auto">
        <div className="w-full pt-12 pb-6 px-12 bg-gradient-green shadow-md shadow-primary/30 rounded-[4rem]">
          <p className="font-semibold text-xl text-center">
            We have plans for
            <br />
            <span className="text-sm font-medium text-neutral-600">
              Build healthier habbits with personalized lessons
            </span>
          </p>

          {/* separator line */}
          <Image alt="separator" src={separator} className="mt-3 mb-8" />

          {/* plans */}
          <ul className="flex justify-between items-center">
            <Plan label="Loosing weight" icon={appleIcon} />
            <Plan label="Gaining weight" icon={bananIcon} />
            <Plan label="Maintaining weight" icon={avocadoIcon} />
          </ul>
        </div>
      </div>

      {/* background strawberries */}
      <div className="absolute left-0 bottom-28 w-[30vw] max-w-xs h-auto translate-x-[-35%] z-10">
        <Image alt="strawberry fruits" src={strawberry} />
      </div>
    </div>
  );
};

export default Benifits;
