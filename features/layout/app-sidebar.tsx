"use client";

import {
  Album,
  Cat,
  Inbox,
  LifeBuoy,
  List,
  Send,
  SquareDashedBottomCode,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain, NavMainType } from "@/features/layout/nav-main";
import { NavUser } from "@/features/layout/nav-user";

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
    title: "Home",
    lists: [
      {
        title: "Overviews",
        icon: Album,
        url: "/admin/home/overviews",
      },
    ],
  },
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
  {
    title: "Sales",
    lists: [
      {
        title: "Orders",
        icon: List,
        url: "/admin/sales/orders",
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
