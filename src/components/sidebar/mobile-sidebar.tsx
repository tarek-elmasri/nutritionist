"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import minLogo from "@/assets/mini-logo.png";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import useClickOutside from "@/hooks/use-click-outside";
import ConsoleTabs from "./console-tabs";
import UserTabs from "./user-tabs";

const MobileSidebar = ({
  tabs: ChildrenTabs,
}: {
  tabs: typeof ConsoleTabs | typeof UserTabs;
}) => {
  const sidebarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useClickOutside(sidebarRef, () => setIsMenuOpen(false));
  const variants = {
    close: {
      left: "-67%",
    },
    open: {
      left: 0,
    },
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <Menu
          size={25}
          className="mt-3 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
        <Image src={minLogo} alt="Dr.Aya Salem" />
      </div>

      {/* shadow bg */}
      {isMenuOpen && <div className="fixed inset-0 z-20 bg-black/50" />}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed z-50 -left-2/3 inset-y-0 w-2/3 bg-background overflow-x-hidden"
            variants={variants}
            animate={"open"}
            exit={"close"}
            ref={sidebarRef}
          >
            <Button
              variant={"ghost"}
              className="p-0 absolute top-3 right-3 rounded-full w-8 h-8 text-muted-foreground hover:text-foreground focus-visible:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="sr-only">Close Menu</span>
              <X className="w-6 h-6" />
            </Button>

            <div className="p-6 pt-20 space-y-6">
              <Image
                src={logo}
                alt="Aya Salem"
                className="w-32 mx-auto h-auto"
                priority
              />
              <ul className="pt-10 space-y-3">
                <ChildrenTabs onClick={() => setIsMenuOpen(false)} />
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;
