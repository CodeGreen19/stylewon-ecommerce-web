"use client";

import { Button } from "@/components/ui/button";
import { Ban, Minus, Plus, X } from "lucide-react";
import { useCartItems } from "../../hooks/use-cart-items";
import Image from "next/image";

export default function CartItems() {
  const { cart, removeFromCart, updateQuantity } = useCartItems();

  if (cart.length === 0)
    return (
      <div className="flex justify-center items-center space-x-2 rounded-md py-20 border border-cyan-600 border-dashed">
        <span>Your cart is empty</span> <Ban />
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      {cart.map((item) => (
        <div
          key={item.productId}
          className=" p-4 border rounded-xl shadow-sm relative"
        >
          <div>
            <h3 className="font-medium truncate">{item.name}</h3>
            <p className="text-sm text-neutral-500">
              ${item.price * item.quantity}
            </p>
          </div>
          <div className=" absolute top-4 right-2 rounded-md">
            {item.image && (
              <Image src={item.image} height={50} width={50} alt="order" />
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center my-2">
              <Button
                variant={"outline"}
                onClick={() =>
                  updateQuantity(
                    item.productId,
                    item.quantity > 1 ? item.quantity - 1 : 1
                  )
                }
              >
                <Minus />
              </Button>
              <Button variant={"outline"}>{item.quantity}</Button>
              <Button
                variant={"outline"}
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
              >
                <Plus />
              </Button>
            </div>
            <Button
              variant={"outline"}
              onClick={() => removeFromCart(item.productId)}
              className="text-red-500 rounded-full text-sm"
            >
              remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
