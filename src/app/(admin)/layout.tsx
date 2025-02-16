"use client";

import Header from "@/components/HeaderAdmin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BusFront, Calendar, Users, MapPinned, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const menus = [
    { link: "/", title: "Trang chủ", icon: <LayoutDashboard size={18} /> },
    { link: "/cars", title: "Xe", icon: <BusFront size={18} /> },
    { link: "/trips", title: "Chuyến đi", icon: <MapPinned size={18} /> },
    { link: "/users", title: "Tài khoản", icon: <Users size={18} /> },
    { link: "/bookings", title: "Đặt lịch", icon: <Calendar size={18} /> },
  ];
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <main className="flex flex-grow">
        <nav className="w-1/6 border-r-2 py-4 px-6 flex flex-col gap-1 ">
          {menus.map((menu, index) => (
            <Link key={index} href={menu.link}>
              <div
                className={`flex items-center gap-3 cursor-pointer hover:bg-slate-200 p-2 rounded-md ${
                  pathname === menu.link ? "bg-blue-100" : ""
                }`}
              >
                {menu.icon}
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
