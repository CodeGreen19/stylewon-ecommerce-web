"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavMainType = {
  title: string;
  lists: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
};

export function NavMain({ navItems }: { navItems: NavMainType[] }) {
  const pathname = usePathname();
  const selectedRoute = (url: string) => {
    const originalUrl = url.split("?")[0];
    if (pathname.startsWith(originalUrl)) {
      return true;
    } else {
      return false;
    }
  };
  return navItems.map((item) => (
    <SidebarGroup key={item.title} className="py-0">
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      <SidebarMenu>
        {item.lists.map((list) => (
          <SidebarMenuItem key={list.url}>
            <Link href={list.url}>
              <SidebarMenuButton
                className={cn(
                  "py-5 px-4 rounded-full ",
                  selectedRoute(list.url) &&
                    "bg-primary text-white hover:bg-primary active:text-white active:bg-primary hover:text-white"
                )}
              >
                <list.icon />
                <span>{list.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
