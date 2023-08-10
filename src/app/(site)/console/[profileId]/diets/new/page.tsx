import { getProfileById } from "@/actions/getProfiles";
import NotificationsMenu from "@/components/notifications-menu";
import { FC } from "react";
import CreateDietForm from "./create-diet-form";
import { redirect } from "next/navigation";
import getFood from "@/actions/getFood";

interface CreateDietPageProps {
  params: {
    profileId: string;
  };
}

const CreateDietPage: FC<CreateDietPageProps> = async ({ params }) => {
  const profile = await getProfileById(params.profileId);
  if (!profile) redirect("/not-found");

  const food = await getFood();

  return (
    <div className="relative w-full h-full bg-background p-6 pt-[4.5rem] rounded-lg shadow-[-5px_5px_10px_0_hsl(var(--primary)_/0.5)] overflow-y-hidden">
      <div className="absolute top-3 right-3">
        <NotificationsMenu />
      </div>

      <div className="p-6 h-full overflow-y-auto">
        <CreateDietForm profile={profile} foodList={food} />
      </div>
    </div>
  );
};

export default CreateDietPage;
