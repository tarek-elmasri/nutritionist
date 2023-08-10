import getCurrentUser from "@/actions/get CurrentUser";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/getProfiles";
import Sidebar from "@/components/sidebar/sidebar";
import UserTabs from "@/components/sidebar/user-tabs";
import NotificationsMenu from "@/components/notifications-menu";

const ProfilePage = async () => {
  const user = await getCurrentUser();
  const profile = await getProfile(user!.id); // protected page, user should be available

  if (!profile) {
    redirect("/profile/new");
  }

  return (
    <div className="h-full bg-gradient-green flex">
      <Sidebar>
        <UserTabs />
      </Sidebar>

      <div className="w-full h-full md:p-3">
        <div className="relative w-full h-full bg-background p-6 rounded-lg shadow-[-5px_5px_10px_0_hsl(var(--primary)_/0.5)] ">
          <div className="absolute top-3 right-3">
            <NotificationsMenu />
          </div>
          <p className="">UserView</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
