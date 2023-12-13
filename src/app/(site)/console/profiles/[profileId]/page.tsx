import { getProfileById } from "@/actions/getProfiles";
import DietPlansSection from "@/components/sections/diet-plans-section";
import RecordsChartSection from "@/components/sections/records-chart-section";
import RecordsSection from "@/components/sections/records-section";
import Separator from "@/components/ui/separator";
import routes from "@/constants/routes";
import { calculateAgeFromDOB } from "@/lib/utils";
import { redirect } from "next/navigation";
import type { FC } from "react";
import NewPlanButton from "./_new-plan-button";

interface ConsoleViewProfilePageProps {
  params: {
    profileId: string;
  };
}

const ConsoleViewProfilePage: FC<ConsoleViewProfilePageProps> = async ({
  params,
}) => {
  const profile = await getProfileById(params.profileId);

  if (!profile) redirect("/not-found");

  return (
    <div className="space-y-6 pb-24">
      <section>
        <h4 className="section-header">{profile.name}</h4>
        <p className="text-xs text-muted-foreground">
          Joined in: {profile.createdAt.toDateString()}
        </p>
      </section>
      <NewPlanButton
        href={`${routes.consoleProfiles}/${params.profileId}/diets/new`}
      />
      <Separator />
      <section className="space-y-6 max-w-md">
        <h4 className="section-header">Profile Information:</h4>
        <div className="grid grid-cols-[auto_1fr] gap-3">
          <p className="font-semibold">Goal:</p>
          <p>{profile.goal.toLowerCase()}</p>

          <p className="font-semibold">Activity Level:</p>
          <p>{profile.activityLevel.toLowerCase()}</p>

          <p className="font-semibold">Age:</p>
          <p>{calculateAgeFromDOB(profile.dob)}</p>

          <p className="font-semibold">Gender:</p>
          <p>{profile.gender.toLowerCase()}</p>
          <p className="font-semibold">Previous Diet:</p>
          <p>{profile.previousDiet ? "Yes" : "No"}</p>
          <p className="font-semibold">Chronic Diseases:</p>
          <p>{profile.chronicDisease ?? "None"}</p>
          <p className="font-semibold ">Food Allergy:</p>
          <p>{profile.foodAllergy ?? "None"}</p>
          <p className="font-semibold">Objective:</p>
          <p className="whitespace-pre-wrap">{profile.objective}</p>
        </div>
      </section>

      <Separator />
      <RecordsSection profileId={profile.id} viewMode />

      <RecordsChartSection profileId={profile.id} />

      <Separator />
      <DietPlansSection
        profileId={profile.id}
        href={`${routes.consoleProfiles}/${profile.id}/diets`}
      />
    </div>
  );
};

export default ConsoleViewProfilePage;
