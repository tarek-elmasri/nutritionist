"use client";

import { Bell } from "lucide-react";
import React from "react";

const NotificationsMenu = () => {
  return (
    <div className="p-3 rounded-full shadow-primary hover:bg-lightgreen/40 hover:shadow-md focus-visible:bg-lightgreen/40 focus-visible:shadow-md grid place-content-center cursor-pointer">
      <Bell className="w-6 h-6 text-neutral-600" />
    </div>
  );
};

export default NotificationsMenu;
