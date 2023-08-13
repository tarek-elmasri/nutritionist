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

  return (
    <div className="relative w-full h-full bg-background p-6 rounded-lg shadow-[-5px_5px_10px_0_hsl(var(--primary)_/0.5)] ">
      <div className="absolute top-3 right-3">
        <NotificationsMenu />
      </div>

      <div className="pt-10 p-6 h-full overflow-y-auto">
        <UserView userId={user!.id} profileId={profile.id} />
      </div>
    </div>
  );
};

export default ProfilePage;
