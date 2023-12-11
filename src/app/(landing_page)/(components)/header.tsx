import { Button } from "@/components/ui/button";
import Image from "next/image";
import headerImg from "@/assets/pngwing 2.png";

const Header = () => {
  return (
    <header className="relative grid md:grid-cols-2 overflow-hidden">
      {/* content */}
      <div className="self-center order-2 md:order-1 px-6 md:px-12 lg:px-20 space-y-10 text-center md:text-left text-balance">
        <h1 className="text-2xl md:text-4xl font-medium">
          <span className="text-darkred text-4xl md:text-6xl font-bold leading-[6rem]">
            Healthy
          </span>{" "}
          Living Made Easy!!
        </h1>
        <p className="font-medium text-lg md:text-2xl ">
          Get your custum plans & one-to-one guidance from our experts
        </p>
        <div>
          <Button className="text-foreground shadow-lg text-xl md:text-3xl px-12 py-8 rounded-xl hover:text-neutral-100 transition duration-300 bg-gradient-green--invert">
            Get Started
          </Button>
        </div>
      </div>

      <Image
        alt="fruits"
        src={headerImg}
        className="order-1 md:order-2 w-full max-w-[250px] md:max-w-[40rem] justify-self-end"
      />
    </header>
  );
};

export default Header;
