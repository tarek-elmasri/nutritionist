import NotificationsMenu from "@/components/notifications-menu";
import Sidebar from "@/components/sidebar/sidebar";
import UserTabs from "@/components/sidebar/user-tabs";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
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

          <div className="pt-10 p-6 h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
