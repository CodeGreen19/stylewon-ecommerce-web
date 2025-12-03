"use client";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { useCartItems } from "../../hooks/use-cart-items";
import { CartItem } from "./cart-item";
import { CartItemsBox } from "./cart-items-box";
export function DBCartItemsBox() {
  const { carts } = useCartItems();
  return (
    <Fragment>
      <SheetHeader>
        <SheetTitle className="text-2xl">Shopping Carts</SheetTitle>
      </SheetHeader>
      <div className="p-5 space-y-4">
        {carts.length === 0 ? (
          <CartItemsBox />
        ) : (
          carts.map((item) => (
            <CartItem type="db" key={item.productId} item={item} />
          ))
        )}
      </div>
      <SheetFooter className="flex flex-row items-center justify-between">
        <Button variant={"ghost"} className="py-6 rounded-full ">
          Total : 500 &#x09F3;
        </Button>
        <Button onClick={() => {}} className="py-6  rounded-full w-32">
          Proceed <ChevronRight />
        </Button>
      </SheetFooter>
    </Fragment>
  );
}
