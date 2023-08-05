import ConsoleView from "@/components/console-view";
import NotificationsMenu from "@/components/notifications-menu";

const ConsolePage = () => {
  return (
    <div className="relative w-full h-full bg-background p-6 rounded-lg shadow-[-5px_5px_10px_0_hsl(var(--primary)_/0.5)] overflow-y-hidden">
      <div className="absolute top-3 right-3">
        <NotificationsMenu />
      </div>

      <div className="mt-10 p-6 h-full overflow-y-auto">
        <ConsoleView />
      </div>
    </div>
  );
};

export default ConsolePage;
