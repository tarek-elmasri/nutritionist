import getCurrentUser from "@/actions/get CurrentUser";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/getProfiles";
import Sidebar from "@/components/sidebar/sidebar";
import UserTabs from "@/components/sidebar/user-tabs";
import NotificationsMenu from "@/components/notifications-menu";
import UserView from "@/components/user-view";

const ProfilePage = async () => {
  const user = await getCurrentUser();
  const profile = await getProfile(user!.id); // protected page, user should be available

  if (!profile) {
    redirect("/new");
  }

  return <UserView userId={user!.id} profileId={profile.id} />;
};

export default ProfilePage;
