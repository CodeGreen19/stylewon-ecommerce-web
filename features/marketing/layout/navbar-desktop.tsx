import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { User as UserType } from "better-auth";
import { ChevronDown, Search, ShoppingCartIcon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthDialogWrapper } from "@/features/auth/components/auth-dialog-wrapper";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
type UserSession = {
  isPending: boolean;
  user: UserType | undefined;
};
export function NavbarDesktop(session: UserSession) {
  const isMobile = useIsMobile();
  return (
    <div className="flex items-center justify-between">
      <section>
        <Logo />
      </section>
      <section className="space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              Categories <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant={"ghost"}>Products</Button>
      </section>
      <section className="flex items-center justify-center gap-1">
        <Button>
          Search <Search />
        </Button>
        <Button>
          Cart <ShoppingCartIcon />
        </Button>
        {session.isPending ? (
          <Skeleton className="h-9 w-24 bg-black/80" />
        ) : session.user ? (
          <Link href={isMobile ? "/account" : "/account/dashboard"}>
            <Button>
              Account <User />
            </Button>
          </Link>
        ) : (
          <AuthDialogWrapper>
            <Button>
              Sign in <User />
            </Button>
          </AuthDialogWrapper>
        )}
      </section>
    </div>
  );
}
