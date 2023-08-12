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

      <div className="w-full h-full md:p-3">{children}</div>
    </div>
  );
};

export default ProfileLayout;
