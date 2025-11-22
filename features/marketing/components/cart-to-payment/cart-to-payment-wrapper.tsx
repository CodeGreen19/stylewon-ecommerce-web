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
export default function CartToPaymentWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { cart } = useCartItems();
  const [cartCount, setCartCount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (window !== undefined) {
      if (cart) {
        setCartCount(cart.length);
      }
    }
  }, [cart]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <span className="relative">
          {children}

          <span className="absolute -top-3 right-1 font-sans text-sm">
            {cartCount}
          </span>
        </span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl">Cart to payment here.</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <CartItems />
        </div>
        <SheetFooter className="flex flex-row items-center">
          <Button variant={"ghost"} className="py-6 rounded-full ">
            Total :{" "}
            {cart.reduce((prev, current) => {
              return prev + current.price * current.quantity;
            }, 0)}
          </Button>
          <Link href={"/checkout"} className="flex-1">
            <Button
              onClick={() => setOpen(false)}
              className="py-6  rounded-full w-full"
            >
              Proceed <ChevronRight />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
