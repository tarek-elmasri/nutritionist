import ConsoleTabs from "@/components/sidebar/console-tabs";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

const ConsoleLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-gradient-green flex">
      <Sidebar>
        <ConsoleTabs />
      </Sidebar>

      <div className="w-full h-full md:p-3">{children}</div>
    </div>
  );
};

export default ConsoleLayout;
