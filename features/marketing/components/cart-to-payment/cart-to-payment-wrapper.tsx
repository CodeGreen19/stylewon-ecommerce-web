"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, useEffect, useState } from "react";
import { useCartItems } from "../../hooks/use-cart-items";
import CartItems from "./cart-items";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { loadCartFromLocalStorage } from "../../helpers";
import { authClient } from "@/lib/auth-client";
import CartItemsAuthUsers from "./cart-items-auth-user";
import { getCartItems } from "../../actions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export default function CartToPaymentWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { isPending, data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  //login carts
  const { data: authCarts } = useQuery({
    queryKey: ["login-user-carts"],
    queryFn: () => getCartItems({ userId: session?.user.id }),
    enabled: !!session,
  });
  const loggedinCarts = authCarts ?? [];

  // localstorage carts
  const { carts, setCarts } = useCartItems();

  useEffect(() => {
    if (window !== undefined) {
      setCarts(loadCartFromLocalStorage());
    }
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <span className="relative">
          {children}

          {(carts.length !== 0 || loggedinCarts.length !== 0) && (
            <span className="inline-block animate-pulse absolute top-0 right-0 animation-duration-[3000] size-2 rounded-full bg-white "></span>
          )}
        </span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg border-cyan-950 noise-bg">
        <SheetHeader>
          <SheetTitle className="text-2xl">Shopping Carts</SheetTitle>
        </SheetHeader>
        {isPending ? (
          <div>Loading...</div>
        ) : session ? (
          <div className="px-4">
            <CartItemsAuthUsers />
          </div>
        ) : (
          <div className="px-4">
            <CartItems />
          </div>
        )}
        <SheetFooter className="flex flex-row items-center justify-between">
          <Button variant={"ghost"} className="py-6 rounded-full ">
            Total :
            {session
              ? loggedinCarts.reduce((prev, current) => {
                  return prev + current.price * current.quantity;
                }, 0)
              : carts.reduce((prev, current) => {
                  return prev + current.price * current.quantity;
                }, 0)}{" "}
            &#x09F3;
          </Button>
          <Button
            onClick={() => {
              if (isPending) {
                return null;
              }
              setOpen(false);
              if (session) {
                router.push("/checkout");
              } else {
                router.push(`/auth/sign-in?success_redirect_to=/checkout`);
              }
            }}
            className="py-6  rounded-full w-32"
          >
            Proceed <ChevronRight />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
