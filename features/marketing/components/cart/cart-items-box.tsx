"use client";
import { Button } from "@/components/ui/button";
import { SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { useCartItems } from "../../hooks/use-cart-items";
import { CartItem } from "./cart-item";
import { EmptyCartBox } from "./empty-cart-box";
export function CartItemsBox({
  setOpenAuth,
}: {
  setOpenAuth?: (v: boolean) => void;
}) {
  const { carts } = useCartItems();

  const total =
    carts.length === 0
      ? 0
      : carts.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  return (
    <Fragment>
      <SheetHeader>
        <SheetTitle className="text-2xl">Shopping Carts</SheetTitle>
      </SheetHeader>
      <div className="p-5 space-y-4">
        {carts.length === 0 ? (
          <EmptyCartBox />
        ) : (
          carts.map((item) => (
            <CartItem type="local" key={item.productId} item={item} />
          ))
        )}
      </div>
      <SheetFooter className="flex flex-row items-center justify-between">
        <Button variant={"ghost"} className="py-6 text-2xl rounded-full ">
          Total : {total} &#x09F3;
        </Button>
        <Button
          onClick={() => setOpenAuth && setOpenAuth(true)}
          className="py-6  rounded-full w-32"
        >
          Proceed <ChevronRight />
        </Button>
      </SheetFooter>
    </Fragment>
  );
}
