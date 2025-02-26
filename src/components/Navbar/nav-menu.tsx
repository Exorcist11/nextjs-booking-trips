"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavMenu = (props: NavigationMenuProps) => {
  const pathname = usePathname();
  const menus = [
    { path: "/", label: "Home" },
    { path: "/blogs", label: "Blog" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact Us" },
  ];
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.path}>
            <NavigationMenuLink asChild>
              <Link
                href={menu.path}
                className={cn(
                  "px-4 py-2  transition-all duration-300",
                  pathname === menu.path
                    ? "tablet:border-b-2 laptop:border-b-2 desktop:border-b-2"
                    : "text-gray-700 hover:bg-gray-200"
                )}
              >
                {menu.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
