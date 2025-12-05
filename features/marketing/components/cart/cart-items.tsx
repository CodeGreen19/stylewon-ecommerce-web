"use client";

import { Button } from "@/components/ui/button";
import { Ban, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCartItems } from "../../hooks/use-cart-items";

export default function CartItems() {
  const { carts, guestUserUpdateQuantity, guestUserRemoveFromCart } =
    useCartItems();

  if (carts.length === 0)
    return (
      <div className="flex items-center justify-center space-x-2 rounded-md border border-dashed border-cyan-600 py-20">
        <span>Your cart is empty</span> <Ban />
      </div>
    );

  return (
    <div className="mx-auto max-w-xl space-y-4">
      {carts.map((item) => (
        <div
          key={item.productId}
          className="relative rounded-xl border border-cyan-500 p-4 shadow-sm"
        >
          <div className="space-y-3">
            <h3 className="truncate font-medium">{item.name}</h3>
            <div className="flex items-center gap-3">
              <div className="overflow-hidden rounded-sm">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    height={50}
                    width={50}
                    alt="order"
                  />
                )}
              </div>
              <p className="text-base font-semibold">
                {item.price * item.quantity} &#x09F3;
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="my-2 flex items-center">
              <Button
                variant={"outline"}
                onClick={() =>
                  guestUserUpdateQuantity(
                    item.productId,
                    item.quantity > 1 ? item.quantity - 1 : 1,
                  )
                }
              >
                <Minus />
              </Button>
              <Button variant={"outline"}>{item.quantity}</Button>
              <Button
                variant={"outline"}
                onClick={() =>
                  guestUserUpdateQuantity(item.productId, item.quantity + 1)
                }
              >
                <Plus />
              </Button>
            </div>
            <Button
              variant={"outline"}
              onClick={() => guestUserRemoveFromCart(item.productId)}
              className="rounded-full text-sm text-red-500"
            >
              remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
