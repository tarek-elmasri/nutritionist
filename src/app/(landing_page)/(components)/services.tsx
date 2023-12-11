import Image from "next/image";
import bulletIcon from "@/assets/bullet-icon.png";
import servicesImg from "@/assets/services.png";

const Service = ({ label }: { label: string }) => (
  <li className="flex items-center justify-start gap-6">
    <Image alt="" src={bulletIcon} />
    <p className="font-medium text-lg">{label}</p>
  </li>
);

const Services = () => {
  return (
    <div className="relative py-12" id="services">
      <div className=" w-full max-w-6xl mx-auto space-y-12">
        {/* title */}
        <h4 className="text-lg font-bold text-center text-balance">
          What is a <span className="text-6xl text-darkred">NourishMe</span> for
          you
        </h4>

        {/* container */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-start gap-12 md:gap-24">
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
    </div>
  );
};

export default Services;
