import { Button } from "@/components/ui/button";
import questionMark from "@/assets/question-mark.png";
import Image from "next/image";
import Link from "next/link";

const CTX = () => {
  return (
    <div className="py-12 ">
      <div className="py-6 px-6 md:px-12 max-w-2xl mx-auto bg-lightgreen rounded-3xl grid grid-cols-[1.5fr,1fr] justify-items-center gap-3 shadow-md shadow-primary">
        <div>
          <p className="font-semibold text-lg text-balance">
            Don&apos;t know what&apos;s the right meal plan or the diet for you
          </p>
          <Link href={"/signin"}>
            <Button className="mt-8 bg-gradient-green--invert text-foreground shadow-lg text-lg px-4 md:px-10 py-6 rounded-xl hover:text-neutral-100 transition duration-300">
              Get Started
            </Button>
          </Link>
        </div>
        <Image
          src={questionMark}
          alt=""
          className="justify-self-end self-center"
        />
      </div>
    </div>
  );
};

export default CTX;
