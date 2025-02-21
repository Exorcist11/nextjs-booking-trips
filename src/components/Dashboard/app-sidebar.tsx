"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bus,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Quản lý phương tiện",
      url: "",
      icon: Bus,
      items: [
        {
          title: "Xe khách",
          url: "/cars",
        },
        
      ],
    },
    {
      title: "Quản lý chuyến đi",
      url: "/trips",
      icon: Map,
      items: [
        {
          title: "Lịch trình",
          url: "/trips/schedule",
        },
        {
          title: "Chuyến đi",
          url: "/trips",
        },
        
      ],
    },
    {
      title: "Quản lý người dùng",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "Danh sách người dùng",
          url: "/users",
        },
        {
          title: "Team",
          url: "#",
        },
        
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
