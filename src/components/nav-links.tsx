"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  const routes = [
    {
      href: "/#why-healthy",
      label: "Why Healthy",
      active: pathname === "/#why-healthy",
    },
    {
      href: "/#benefits",
      label: "Benefits",
      active: pathname === "/#benefits",
    },
    {
      href: "/#services",
      label: "Services",
      active: pathname === "/#services",
    },
  ];

  return (
    <>
      {routes.map((route) => (
        <Link href={route.href} key={route.href}>
          <li
            className={cn(
              "text-neutral-600 hover:text-neutral-900",
              route.active && "font-bold text-neutral-900"
            )}
          >
            {route.label}
          </li>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
