import Image from "next/image";
import bulletIcon from "@/assets/bullet-icon.png";
import servicesImg from "@/assets/services.png";
import orangesImg from "@/assets/oranges.png";

const Service = ({ label }: { label: string }) => (
  <li className="flex items-center justify-start gap-6">
    <Image alt="" src={bulletIcon} />
    <p className="font-medium text-lg">{label}</p>
  </li>
);

const Services = () => {
  return (
    <div className="relative mt-36 w-full" id="services">
      <div className="p-6 py-24 w-full max-w-6xl mx-auto space-y-12">
        {/* title */}
        <h4 className="text-lg font-medium">
          What is a <span className="text-6xl text-darkred">HealthyBite</span>{" "}
          for you
        </h4>

        {/* container */}
        <div className="flex items-center justify-start gap-52">
          {/* image */}
          <Image alt="" src={servicesImg} />

          {/* services */}
          <div className="flex flex-col justify-between gap-6">
            <Service label="Diet tracker" />
            <Service label="Best nutrition advice" />
            <Service label="Exercise portal" />
            <Service label="Meal planner" />
            <Service label="Recipes database" />
            <Service label="One stop shop for nutritions" />
            <Service label="Community" />
          </div>
        </div>
      </div>

      {/* background oranges */}

      <div className="absolute right-0 bottom-0 overflow-hidden">
        <Image alt="" src={orangesImg} className="translate-x-40 max-w-2xl" />
      </div>
    </div>
  );
};

export default Services;
