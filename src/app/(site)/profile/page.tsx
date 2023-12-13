import getCurrentUser from "@/actions/get CurrentUser";
import { getDietPlansCount } from "@/actions/getDietPlans";
import { getProfile } from "@/actions/getProfiles";
import UserView from "@/components/user-view";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await getCurrentUser();
  const profile = await getProfile(user!.id); // protected page, user should be available
  if (!profile) {
    redirect("/new");
  }

  const dietPlansCount = await getDietPlansCount(profile.id);

  return (
    <UserView
      userId={user!.id}
      profileId={profile.id}
      showWelcomeMessage={dietPlansCount === 0}
      username={profile.name}
    />
  );
};

export default ProfilePage;
