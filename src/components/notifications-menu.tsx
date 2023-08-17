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
import { FC, useCallback, useEffect, useReducer, useTransition } from "react";
import { getNotifications } from "@/actions/getNotifications";
import updateNotification from "@/actions/updateNotification";
import PageLoader from "@/components/ui/page-loader";

type NotificationState = {
  offset: number;
  limit: number;
  list: Notification[];
  hasMore: boolean;
  newCount: number;
  isMenuOpen: boolean;
};

const defaultState = {
  offset: 0,
  limit: 10,
  list: [],
  hasMore: false,
  newCount: 0,
  isMenuOpen: false,
};

type NotificationAction = { type: string; payload: unknown };

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case "setOffset":
      return { ...state, offset: action.payload as number };
    case "updateNotificationStatus":
      const { index, seen } = action.payload as {
        index: number;
        seen: boolean;
      };
      const newList = [...state.list];
      newList[index].seen = seen;
      return { ...state, list: newList };
    case "setIsMenuOpen":
      return { ...state, isMenuOpen: action.payload as boolean };
    case "addToList":
      return {
        ...state,
        list: [...state.list, ...(action.payload as Notification[])],
      };
    case "setHasMore":
      return { ...state, hasMore: action.payload as boolean };
    case "setNewCount":
      return { ...state, newCount: action.payload as number };
    case "decrementNewCount":
      return { ...state, newCount: state.newCount - 1 };

    default:
      return state;
  }
};
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
  const [isPending, startTransition] = useTransition();
  const [data, dispatch] = useReducer(notificationReducer, defaultState);

  const fetchNotifications = useCallback(async () => {
    try {
      const newNotificationsData = await getNotifications(
        data.limit,
        data.offset
      );
      dispatch({ type: "setHasMore", payload: newNotificationsData.hasMore });
      dispatch({
        type: "addToList",
        payload: newNotificationsData.notifications,
      });
      dispatch({
        type: "setNewCount",
        payload: newNotificationsData.newNotificationsCount,
      });
    } catch (error) {
      console.log(error);
    }
  }, [getNotifications, data.limit, data.offset, dispatch]);

  useEffect(() => {
    fetchNotifications();
  }, [data.offset, fetchNotifications]);

  const handleNavigation = async (
    notification: Notification,
    index: number
  ) => {
    dispatch({ type: "setIsMenuOpen", payload: false });
    startTransition(async () => {
      try {
        // if seen is false trigger action to turn it true
        if (notification.seen === false) {
          await updateNotification(notification.id);
          dispatch({
            type: "updateNotificationStatus",
            payload: { index, seen: true },
          });
          dispatch({ type: "decrementNewCount", payload: null });
        }
        // redirect to href
        router.push(notification.href);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      {isPending && <PageLoader />}
      <Popover
        open={data.isMenuOpen}
        onOpenChange={(v) => dispatch({ type: "setIsMenuOpen", payload: v })}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="relative rounded-full p-0 w-12 h-12 hover:bg-lightgreen focus-visible:bg-lightgreen"
          >
            <Bell className="w-6 h-6 text-neutral-600" />
            {data.newCount > 0 && (
              <div className="absolute top-0 right-0 w-4 aspect-square rounded-full bg-red-500 flex justify-center items-center">
                <p className="text-xs text-white">{data.newCount}</p>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 h-[15rem] overflow-y-auto p-0 bg-neutral-300"
          align="end"
        >
          <ul className="w-full [&_li:last-child]:border-b-0">
            {data.list.length === 0 ? (
              <NoNotifications />
            ) : (
              data.list.map((notification, index) => (
                <NotificationCell
                  seen={notification.seen}
                  label={notification.label}
                  key={notification.id}
                  onClick={() => handleNavigation(notification, index)}
                />
              ))
            )}

            {data.hasMore && (
              <NotificationCell
                seen={true}
                label="View More"
                onClick={() =>
                  dispatch({
                    type: "setOffset",
                    payload: data.offset + data.limit,
                  })
                }
              />
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationsMenu;
