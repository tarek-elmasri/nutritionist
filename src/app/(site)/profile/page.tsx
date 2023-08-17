import getCurrentUser from "@/actions/get CurrentUser";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/getProfiles";
import Sidebar from "@/components/sidebar/sidebar";
import UserTabs from "@/components/sidebar/user-tabs";
import NotificationsMenu from "@/components/notifications-menu";
import UserView from "@/components/user-view";
import { getDietPlansCount } from "@/actions/getDietPlans";

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
