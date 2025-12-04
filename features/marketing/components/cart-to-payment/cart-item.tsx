import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCartItems } from "../../hooks/use-cart-items";
import { CartType } from "../../types";

export function CartItem({
  item,
  type,
}: {
  item: CartType;
  type: "db" | "local";
}) {
  const { guestUserUpdateQuantity, guestUserRemoveFromCart } = useCartItems();

  // utilities
  const cartAddQty = () => {
    if (type === "local") {
      guestUserUpdateQuantity(item.productId, item.quantity + 1);
    }
  };
  const cartRemoveQty = () => {
    if (type === "local") {
      guestUserUpdateQuantity(
        item.productId,
        item.quantity > 1 ? item.quantity - 1 : 1,
      );
    }
  };
  const cartDelete = () => {
    if (type === "local") {
      guestUserRemoveFromCart(item.productId);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="relative rounded-xl border border-cyan-500 p-4 shadow-sm">
        <div className="space-y-3">
          <h3 className="truncate font-medium">{item.name}</h3>
          <div className="flex items-center gap-3">
            <div className="overflow-hidden rounded-sm">
              {item.imageUrl && (
                <Image src={item.imageUrl} height={50} width={50} alt="order" />
              )}
            </div>
            <p className="text-base font-semibold">
              {item.price * item.quantity} &#x09F3;
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="my-2 flex items-center">
            <Button variant={"outline"} onClick={cartRemoveQty}>
              <Minus />
            </Button>
            <Button variant={"outline"}>{item.quantity}</Button>
            <Button variant={"outline"} onClick={cartAddQty}>
              <Plus />
            </Button>
          </div>
          <Button
            variant={"outline"}
            onClick={cartDelete}
            className="rounded-full text-sm text-red-500"
          >
            remove
          </Button>
        </div>
      </div>
    </div>
  );
}
