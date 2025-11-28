"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { useCartItems } from "../../hooks/use-cart-items";
import { productDetails } from "../../queries";
import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import AdditionalInfo from "./additional-info";

export default function DetailsBox({
  product,
}: {
  product: Awaited<ReturnType<typeof productDetails>>;
}) {
  const [selectedImage, setSelectedImage] = useState(product.images[0] ?? "");
  const item = product; // since productDetails returns an array
  const { addToCart } = useCartItems();

  if (!item) return <div>No product found.</div>;

  return (
    <section className="mx-auto max-w-5xl px-2 lg:px-0 xl:px-0 py-2 lg:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square w-full rounded-xl border-cyan-600 border overflow-hidden bg-muted">
            <Image
              src={selectedImage}
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
                className="aspect-square w-20 flex-none rounded-lg overflow-hidden border border-cyan-800 hover:opacity-80 transition"
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
                    className="flex-none"
                    variant={"outline"}
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
                    variant={"outline"}
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

          <div className="text-3xl font-bold">{Number(item.price)} Taka</div>

          <Button
            onClick={() => {
              addToCart({
                ...product,
                productId: product.id,
                quantity: 1,
                price: Number(product.price),
                image: product.images[0],
              });
              toast.success("Added to cart.");
            }}
            className="w-full rounded-full py-6"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <AdditionalInfo des={product.description} />
    </section>
  );
}
