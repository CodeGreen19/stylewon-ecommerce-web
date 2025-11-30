"use client";

import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ban, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { cartActions, getCartItems } from "../../actions";

export default function CartItemsAuthUsers() {
  const qc = getQueryClient();
  const {
    isPending,
    data: carts,
    error,
  } = useQuery({
    queryKey: ["login-user-carts"],
    queryFn: () => getCartItems(),
  });
  const { isPending: mutation_pending, mutate } = useMutation({
    mutationFn: cartActions,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["login-user-carts"] });
    },
  });
  if (isPending) return "Loading...";
  if (error) return "Error";

  if (carts.length === 0)
    return (
      <div className="flex justify-center items-center space-x-2 rounded-md py-20 border border-cyan-600 border-dashed">
        <span>Your cart is empty</span> <Ban />
      </div>
    );

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {carts.map((item) => (
        <div
          key={item.productId}
          className=" p-4 border  border-cyan-500 rounded-xl shadow-sm relative"
        >
          <div className="space-y-3">
            <h3 className="font-medium truncate">{item.name}</h3>
            <div className="flex items-center gap-3">
              <div className="rounded-sm overflow-hidden">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    height={50}
                    width={50}
                    alt="order"
                  />
                )}
              </div>
              <p className="text-base font-semibold ">
                {item.price * item.quantity} &#x09F3;
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center my-2">
              <Button
                disabled={mutation_pending}
                variant={"outline"}
                onClick={() =>
                  mutate({ cartId: item.id, type: "DECREASE_QUANTITY" })
                }
              >
                <Minus />
              </Button>
              <Button variant={"outline"}>{item.quantity}</Button>
              <Button
                disabled={mutation_pending}
                variant={"outline"}
                onClick={() =>
                  mutate({ cartId: item.id, type: "INCREASE_QUANTITY" })
                }
              >
                <Plus />
              </Button>
            </div>
            <Button
              disabled={mutation_pending}
              variant={"outline"}
              onClick={() =>
                mutate({ cartId: item.id, type: "REMOVE_FROM_CART" })
              }
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
