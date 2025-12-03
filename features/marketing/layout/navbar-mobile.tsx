import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CompleteAuth from "@/features/auth/components/complete-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { User as UserType } from "better-auth";
import {
  ListChecks,
  Loader2,
  Menu,
  Search,
  ShoppingCartIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type UserSession = {
  isPending: boolean;
  user: UserType | undefined;
};
type CompType = "CATEGORY" | "USER" | "SEARCH";
export function NavbarMobile(session: UserSession) {
  const isMobile = useIsMobile();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDrawerType, setSelectedDrawerType] =
    useState<CompType>("CATEGORY");
  return (
    <div className="flex items-center justify-between">
      <section>
        <Logo />
      </section>
      <section className="flex items-center gap-1 md:hidden">
        <Button>
          Cart <ShoppingCartIcon />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setOpenDrawer(true);
                setSelectedDrawerType("CATEGORY");
              }}
            >
              <ListChecks /> Categories
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setOpenDrawer(true);
                setSelectedDrawerType("SEARCH");
              }}
            >
              <Search /> Search
            </DropdownMenuItem>
            {session.isPending ? (
              <DropdownMenuItem>
                <Loader2 className="animate-spin" />
              </DropdownMenuItem>
            ) : session.user ? (
              <Link href={isMobile ? "/account" : "/account/dashboard"}>
                <DropdownMenuItem>
                  <User /> Accounts
                </DropdownMenuItem>
              </Link>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  setOpenDrawer(true);
                  setSelectedDrawerType("USER");
                }}
              >
                <User /> Sign in
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger asChild>{null}</DrawerTrigger>
        <DrawerContent className="min-h-2/3 rounded-none!">
          <DrawerHeader className="hidden">
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            {selectedDrawerType === "CATEGORY" ? (
              <div>Category</div>
            ) : selectedDrawerType == "SEARCH" ? (
              <div>search</div>
            ) : (
              <CompleteAuth onClose={() => setOpenDrawer(false)} />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function MenuItems({ isPending, user }: UserSession) {
  return null;
}
