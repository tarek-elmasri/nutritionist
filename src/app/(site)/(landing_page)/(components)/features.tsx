import Image, { StaticImageData } from "next/image";
import saladImg from "@/assets/salad.png";
import cocktailImg from "@/assets/cocktail.png";
import juiceImg from "@/assets/juice.png";
import superJuiceImg from "@/assets/super-juice.png";
import separator from "@/assets/separator.svg";

const HealthyBite = ({
  imgSrc,
  title,
  description,
}: {
  imgSrc: StaticImageData;
  title: string;
  description: string;
}) => (
  <div className="w-full">
    <div className="flex items-center gap-3">
      <Image alt="" src={imgSrc} />
      <div className="flex flex-col justify-between items-start gap-3">
        <h5 className="text-lg font-semibold">{title}</h5>
        <p className="font-medium text-neutral-600">{description}</p>
      </div>
    </div>

    <Image src={separator} alt="" />
  </div>
);

const Features = () => {
  return (
    <div className="mt-6 p-6 w-full max-w-6xl mx-auto space-y-12" id="benefits">
      <h3 className="text-xl font-bold text-center">
        Have a <span className="text-darkred text-6xl"> NourishMe </span> for
      </h3>

      <div className="grid grid-cols-2 gap-x-24 gap-y-12">
        <HealthyBite
          imgSrc={saladImg}
          title="Find a diet you love"
          description="Find a nutritios fits your lifestyle and food preferences. Take Chargeof your daily habbits with one of the many ongoing Diets including Clean Eating and High Protein."
        />
        <HealthyBite
          imgSrc={cocktailImg}
          title="Start a simplified meal"
          description="Follow a 7-21 day Meal Plan and get four pre-planned recipes a day. Depending on ypur health goals, there are many Meal Plans to choose from including Keto Burn and Vegan for a week."
        />

        <HealthyBite
          imgSrc={juiceImg}
          title="Track your way to success"
          description="Track your activities and what you eat with the help of our food-, exercise- and water trackers to maintain a balanced everyday life."
        />

        <HealthyBite
          imgSrc={superJuiceImg}
          title="Start your own healthy journey"
          description="To help reach your goals and customize your health journey you can add favourite meals, food  items, recipes and exercises to your Favorites."
        />
      </div>
    </div>
  );
};

export default Features;
