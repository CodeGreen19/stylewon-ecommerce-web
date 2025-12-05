"use client";

import Loading from "@/components/shared/loading";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { loadCartFromLocalStorage } from "../../helpers";
import { useCartItems } from "../../hooks/use-cart-items";
import { getCartItems } from "../../server/actions";
import { CartItemsBox } from "./cart-items-box";
import { DBCartItemsBox } from "./db-cart-items-box";
export default function CartToPaymentWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { isPending, data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [shouldAuthBoxOpen, setShouldAuthBoxOpen] = useState(false);
  //db carts
  const { data } = useQuery({
    queryKey: ["login-user-carts"],
    queryFn: () => getCartItems({ userId: session?.user.id }),
    enabled: !!session,
  });
  const dbCarts = data ?? [];
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
          {(session ? dbCarts.length !== 0 : carts.length !== 0) && (
            <ExistCartTag />
          )}
        </span>
      </SheetTrigger>
      <SheetContent className="noise-bg overflow-y-auto border-cyan-950 sm:max-w-lg">
        {shouldAuthBoxOpen ? (
          <div className="p-6">
            <div>Todo: auth required</div>
          </div>
        ) : isPending ? (
          <Loading />
        ) : session ? (
          <DBCartItemsBox />
        ) : (
          <CartItemsBox setOpenAuth={(v) => setShouldAuthBoxOpen(v)} />
        )}
      </SheetContent>
    </Sheet>
  );
}

function ExistCartTag() {
  return (
    <span className="animation-duration-[3000] absolute top-0 right-0 inline-block size-2 animate-pulse rounded-full bg-white"></span>
  );
}
