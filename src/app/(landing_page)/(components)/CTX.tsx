import { Button } from "@/components/ui/button";
import questionMark from "@/assets/question-mark.png";
import Image from "next/image";

const CTX = () => {
  return (
    <div className="mt-24 p-12 max-w-2xl mx-auto bg-lightgreen rounded-3xl flex justify-around items-center gap-6 shadow-md shadow-primary">
      <div className=" max-w-[50%]">
        <p className="font-semibold text-lg">
          Don&apos;t know what&apos;s the right meal plan or the diet for you
        </p>

        <Button className="mt-8 bg-gradient-green--invert text-foreground shadow-lg text-lg px-10 py-6 rounded-xl hover:text-neutral-100 transition duration-300">
          Sign in today
        </Button>
      </div>

      <Image src={questionMark} alt="" />
    </div>
  );
};

export default CTX;
