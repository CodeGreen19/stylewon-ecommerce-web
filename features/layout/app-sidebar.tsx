"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Cat,
  Command,
  Frame,
  Inbox,
  LifeBuoy,
  List,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareDashedBottomCode,
  SquareTerminal,
} from "lucide-react";

import { NavMain, NavMainType } from "@/features/layout/nav-main";
import { NavSecondary } from "@/features/layout/nav-secondary";
import { NavUser } from "@/features/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Ahmed",
    email: "ahmed@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [{}],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

const navItems: NavMainType[] = [
  {
    title: "Catalog",
    lists: [
      {
        title: "Products",
        icon: List,
        url: "/admin/catalog/products",
      },
      {
        title: "Inventory",
        icon: Inbox,
        url: "/admin/catalog/inventory",
      },
      {
        title: "Categories",
        icon: Cat,
        url: "/admin/catalog/categories",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-sm">
                  <SquareDashedBottomCode className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm  leading-tight">
                  <span className="truncate font-bold leading-6 text-xl">
                    Admin Panel
                  </span>
                  <span className="truncate text-xs leading-tight">
                    Manager
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain navItems={navItems} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
