"use client";

import { Bell } from "lucide-react";
import { Notification } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components//ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { getNotifications } from "@/actions/getNotifications";
import updateNotification from "@/actions/updateNotification";
import PageLoader from "@/components/ui/page-loader";

interface NotificationCellProps {
  seen: boolean;
  label: string;
  onClick?: () => void;
}

const NotificationCell: FC<NotificationCellProps> = ({
  seen,
  label,
  onClick,
}) => (
  <li
    className={cn(
      "p-3 bg-neutral-100 w-full border-b border-b-neutral-300 cursor-pointer hover:bg-lightgreen",
      !seen && "bg-lightgreen/40"
    )}
  >
    <div className="w-full" role="link" onClick={onClick}>
      {label}
    </div>
  </li>
);

const NoNotifications = () => (
  <div className="h-[10rem] grid place-items-center">
    <p>No Notifications.</p>
  </div>
);

const NotificationsMenu = () => {
  const router = useRouter();
  const NOTIFICATION_LIMIT = 10;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [notificationsOffset, setNotificationsOffset] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data, refetch } = useFetch(() =>
    getNotifications(NOTIFICATION_LIMIT, notificationsOffset)
  );

  useEffect(() => {
    if (data && data.notifications) {
      setNotificationList((prev) => [...prev, ...data.notifications]);
      setNewNotificationsCount(data.newNotificationsCount);
    }
  }, [data, setNotificationList, setNewNotificationsCount]);

  const handleNavigation = async (
    notification: Notification,
    index: number
  ) => {
    // set menu closed
    setIsMenuOpen(false);
    try {
      // if seen is false trigger action to turn it true
      if (notification.seen === false) {
        setIsUpdating(true);
        await updateNotification(notification.id);
        // update current notification list and new counts
        const newList = [...notificationList];
        newList[index].seen = true;
        setNotificationList(newList);
        setNewNotificationsCount((prev) => prev - 1);
      }
      // redirect to href
      router.push(notification.href);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {isUpdating && <PageLoader />}
      <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="relative rounded-full p-0 w-12 h-12 hover:bg-lightgreen focus-visible:bg-lightgreen"
          >
            <Bell className="w-6 h-6 text-neutral-600" />
            {newNotificationsCount > 0 && (
              <div className="absolute top-0 right-0 w-4 aspect-square rounded-full bg-red-500 flex justify-center items-center">
                <p className="text-xs text-white">{newNotificationsCount}</p>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 h-[15rem] overflow-y-auto p-0 bg-neutral-300"
          align="end"
        >
          <ul className="w-full [&_li:last-child]:border-b-0">
            {notificationList.length === 0 ? (
              <NoNotifications />
            ) : (
              notificationList.map((notification, index) => (
                <NotificationCell
                  seen={notification.seen}
                  label={notification.label}
                  key={notification.id}
                  onClick={() => handleNavigation(notification, index)}
                />
              ))
            )}

            {data?.hasMore && (
              <NotificationCell
                seen={true}
                label="View More"
                onClick={() => {
                  setNotificationsOffset(
                    (prev) => prev + NOTIFICATION_LIMIT - 1
                  );
                  refetch();
                }}
              />
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationsMenu;
