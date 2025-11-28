"use client";

import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import AuthNavDropdown from "@/features/auth/components/auth-nav-dropdown";
import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { authClient } from "@/lib/auth-client";
import {
  ChevronRight,
  Menu,
  Search,
  ShoppingCartIcon,
  User,
} from "lucide-react";
import CartToPaymentWrapper from "../components/cart-to-payment/cart-to-payment-wrapper";
import { User as UserType } from "better-auth";
export default function Navbar() {
  const { isPending, data } = authClient.useSession();
  return (
    <div
      id="marketing-navbar"
      className="border-b border-cyan-600 border-dashed backdrop-blur-md  sticky top-0 right-0"
    >
      <div className="max-w-7xl m-auto flex items-center justify-between h-20 px-2 xl:px-0">
        <section>
          <Logo />
        </section>
        <section className=" md:hidden flex gap-1 items-center ">
          <CartToPaymentWrapper>
            <Button>
              Cart <ShoppingCartIcon />
            </Button>
          </CartToPaymentWrapper>
          <MobileMenuItems data={data?.user} isPending={isPending} />
        </section>

        <section className=" hidden md:flex  items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                Categories <ChevronRight />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant={"ghost"}>
            Products <ChevronRight />
          </Button>
        </section>

        <section className="hidden md:flex  items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                Search <Search />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="space-y-4">
              <Label>Search</Label>
              <Input placeholder="search here..." />
            </PopoverContent>
          </Popover>

          <CartToPaymentWrapper>
            <Button>
              Cart <ShoppingCartIcon />
            </Button>
          </CartToPaymentWrapper>

          {isPending ? (
            <Skeleton className="h-9 w-24 bg-black/50" />
          ) : (
            <div>
              {data ? (
                <AuthNavDropdown>
                  <Button>
                    Account <User />
                  </Button>
                </AuthNavDropdown>
              ) : (
                <AuthWrapper>
                  <Button>
                    Sign in <User />
                  </Button>
                </AuthWrapper>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function MobileMenuItems({
  data,
  isPending,
}: {
  isPending: boolean;
  data: UserType | undefined;
}) {
  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none! border-none h-1/2 noise-bg">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div>
          {isPending ? (
            <Skeleton className="h-9 w-24 bg-black/50" />
          ) : (
            <div>
              {data ? (
                <AuthNavDropdown>
                  <Button>
                    Account <User />
                  </Button>
                </AuthNavDropdown>
              ) : (
                <AuthWrapper>
                  <Button>
                    Sign in <User />
                  </Button>
                </AuthWrapper>
              )}
            </div>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose>works</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
