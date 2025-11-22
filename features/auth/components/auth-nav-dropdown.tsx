"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ReactNode, useState, useTransition } from "react";
export default function AuthNavDropdown({ children }: { children: ReactNode }) {
  const [isPending, startTransitions] = useTransition();
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="relative overflow-visible" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/account/profile"}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href={"/account/orders"}>
          <DropdownMenuItem>Orders</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => {
            startTransitions(async () => {
              await authClient.signOut();
              setOpen(false);
              //   await new Promise((res) => setTimeout(res, 1000));
            });
          }}
        >
          <LoadingSwap isLoading={isPending}>
            <span>Logout</span>
          </LoadingSwap>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
