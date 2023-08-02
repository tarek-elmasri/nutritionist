import { Button } from "@/components/ui/button";
import Image from "next/image";
import headerImg from "@/assets/pngwing 2.png";

const Header = () => {
  return (
    <div>
      <header className="w-full py-12 bg-gradient-green flex items-center justify-between shadow-md">
        {/* content */}
        <div className="pl-24 space-y-20 max-w-lg">
          <h1 className="text-4xl font-medium">
            <span className="text-darkred text-6xl font-bold leading-[6rem]">
              Healthy
            </span>{" "}
            living
            <br />
            Made Easy!!
          </h1>
          <p className="font-medium text-3xl ">
            Get your custum plans &<br /> one-to-one guidance from our experts
          </p>
          <div>
            <Button className="text-foreground shadow-lg text-3xl px-20 py-8 rounded-xl hover:text-neutral-100 transition duration-300 bg-gradient-green--invert ">
              Sign in
            </Button>
            <p className="ml-2 text-medium font-light leading-8">
              Sign in & get started today.
            </p>
          </div>
        </div>
        <Image alt="fruits" src={headerImg} />
      </header>
    </div>
  );
};

export default Header;
