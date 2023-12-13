import getFood from "@/actions/getFood";
import { getProfileById } from "@/actions/getProfiles";
import { redirect } from "next/navigation";
import type { FC } from "react";
import CreateDietForm from "./create-diet-form";

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
