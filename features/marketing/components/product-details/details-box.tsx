"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { toast } from "sonner";
import { addToCart } from "../../server/actions";
import { useCartItems } from "../../hooks/use-cart-items";
import { productDetails } from "../../server/queries";
import { CartType } from "../../types";
import AdditionalInfo from "./additional-info";
import { getQueryClient } from "@/tanstack-query/get-query-client";

type Product = Awaited<ReturnType<typeof productDetails>>;
export default function DetailsBox({ product }: { product: Product }) {
  const {
    selectedImage,
    selectedColor,
    selectedSize,
    setSelectedColor,
    setSelectedImage,
    setSelectedSize,
    setQuantity,
  } = useCartItems();
  const item = product; // since productDetails returns an array
  useEffect(() => {
    setSelectedImage(product.images[0]);
    return () => {
      (setSelectedColor(""), setSelectedSize(""), setQuantity(1));
    };
  }, []);

  if (!item) return <div>No product found.</div>;

  return (
    <section className="mx-auto max-w-5xl px-2 py-2 lg:px-0 lg:py-10 xl:px-0">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left: Image gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="bg-muted aspect-square w-full overflow-hidden rounded-xl border border-cyan-600">
            <Image
              src={selectedImage || product.images[0]}
              alt={item.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex flex-row gap-1 overflow-x-auto">
            {item.images?.map((img) => (
              <div
                key={img}
                onClick={() => setSelectedImage(img)}
                className="aspect-square w-20 flex-none overflow-hidden rounded-lg border border-cyan-800 transition hover:opacity-80"
              >
                <Image
                  src={img}
                  alt="thumb"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold">{item.name}</h1>
          </div>
          <FieldGroup>
            <Field>
              <FieldLabel>Sizes</FieldLabel>
              <FieldContent className="flex-row flex-wrap">
                {item.sizes.map((size) => (
                  <Button
                    onClick={() => setSelectedSize(size.label)}
                    className="flex-none"
                    variant={
                      selectedSize === size.label ? "default" : "outline"
                    }
                    key={size.id}
                  >
                    {size.label}
                  </Button>
                ))}
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Colors</FieldLabel>
              <FieldContent className="flex-row flex-wrap">
                {item.colors.map((color) => (
                  <Button
                    onClick={() => setSelectedColor(color.label)}
                    variant={
                      selectedColor === color.label ? "default" : "outline"
                    }
                    className="flex-none"
                    key={color.id}
                  >
                    <span
                      style={{ background: `${color.hexColor ?? ""}` }}
                      className={cn("inline-block size-3 rounded-full")}
                    ></span>
                    {color.label}
                  </Button>
                ))}
              </FieldContent>
            </Field>
          </FieldGroup>

          <QuantityAndAddtoCartBtn product={product} />
        </div>
      </div>
      <AdditionalInfo des={product.description} />
    </section>
  );
}

function QuantityAndAddtoCartBtn({ product }: { product: Product }) {
  const { isPending, data } = authClient.useSession();
  const qc = getQueryClient();
  const {
    guestUserAddToCart,
    quantity,
    setQuantity,
    selectedColor,
    selectedImage,
    selectedSize,
  } = useCartItems();

  const m_AddToCart = useMutation({
    mutationFn: addToCart,
    onSuccess: async () => {
      toast.success("Added to cart.");
      await qc.invalidateQueries({ queryKey: ["login-user-carts"] });
    },
  });
  return (
    <Fragment>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
            <Minus />
          </Button>
          <Button>{quantity}</Button>
          <Button onClick={() => setQuantity(quantity + 1)}>
            <Plus />
          </Button>
        </div>
        <div className="text-2xl font-bold text-cyan-200">
          {Number(product.price)} &#x09F3;
        </div>
      </div>

      <Button
        disabled={m_AddToCart.isPending}
        onClick={() => {
          if (isPending) {
            return toast.info("Wait a while");
          }

          if (!selectedColor || !selectedSize) {
            return toast.info("Color & Size selection is required");
          }
          const info: CartType = {
            name: product.name,
            price: Number(product.price),
            productId: product.id,
            quantity,
            color: selectedColor,
            imageUrl: selectedImage,
            size: selectedSize,
          };
          if (data) {
            m_AddToCart.mutate(info);
          } else {
            guestUserAddToCart(info);
            toast.success("Added to cart.");
          }
        }}
        className="w-full rounded-full py-6"
      >
        Add to Cart
      </Button>
    </Fragment>
  );
}
