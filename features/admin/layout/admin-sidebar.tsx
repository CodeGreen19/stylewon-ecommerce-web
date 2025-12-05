"use client";

import { LifeBuoy, Send, SquareDashedBottomCode } from "lucide-react";
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
import { AdminAccounts } from "@/features/admin/layout/admin-accounts";
import { AdminSidebarMenu } from "@/features/admin/layout/admin-sidebar-menu";

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

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-sm">
                  <SquareDashedBottomCode className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-xl leading-6 font-bold">
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
        <AdminSidebarMenu />
      </SidebarContent>
      <SidebarFooter>
        <AdminAccounts user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
