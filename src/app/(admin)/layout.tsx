"use client";

import Header from "@/components/HeaderAdmin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  BusFront,
  Calendar,
  Users,
  MapPinned,
  LayoutDashboard,
} from "lucide-react";
interface MenuItem {
  link: string;
  title: string;
  icon: React.ElementType;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const menus: MenuItem[] = [
    { link: "/", title: "Trang chủ", icon: LayoutDashboard },
    { link: "/cars", title: "Xe", icon: BusFront },
    { link: "/trips", title: "Chuyến đi", icon: MapPinned },
    { link: "/users", title: "Tài khoản", icon: Users },
    { link: "/bookings", title: "Đặt lịch", icon: Calendar },
  ];
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <main className="flex flex-grow">
        <nav className="w-1/6 border-r py-4 px-6 flex flex-col gap-1 bg-[#f5f7f9]">
          {menus.map((menu, index) => (
            <Link key={index} href={menu.link}>
              <div
                className={`flex items-center gap-3 cursor-pointer hover:bg-slate-200 p-2 rounded-md ${
                  pathname === menu.link
                    ? "bg-white shadow text-red-500 font-bold"
                    : ""
                }`}
              >
                <menu.icon size={18} />
                <p>{menu.title}</p>
              </div>
            </Link>
          ))}
        </nav>
        <article className="w-5/6 p-4">{children}</article>
      </main>
    </div>
  );
}
