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

  return <CreateDietForm profile={profile} foodList={food} />;
};

export default CreateDietPage;
