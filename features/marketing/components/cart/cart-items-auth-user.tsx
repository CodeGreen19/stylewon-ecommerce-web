"use client";

import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ban, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { cartActions, getCartItems } from "../../server/actions";
import { authClient } from "@/lib/auth-client";

export default function CartItemsAuthUsers() {
  const { data: session } = authClient.useSession();
  const qc = getQueryClient();
  const {
    isPending,
    data: carts,
    error,
  } = useQuery({
    queryKey: ["login-user-carts"],
    queryFn: () => getCartItems({ userId: session?.user.id }),
    enabled: !!session,
  });
  const { isPending: mutation_pending, mutate } = useMutation({
    mutationFn: cartActions,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["login-user-carts"] });
    },
  });
  if (isPending) return "Loading...";
  if (error) return "Error";

  if (!carts || carts.length === 0)
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
