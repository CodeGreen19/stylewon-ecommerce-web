"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { useCartItems } from "../../hooks/use-cart-items";
import { productDetails } from "../../queries";

export default function DetailsPage({
  product,
}: {
  product: Awaited<ReturnType<typeof productDetails>>;
}) {
  const item = product; // since productDetails returns an array
  const { addToCart } = useCartItems();

  if (!item) return <div>No product found.</div>;

  return (
    <section className="mx-auto max-w-5xl px-4 xl:px-0 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square w-full rounded-xl border overflow-hidden bg-muted">
            <Image
              src={item.images?.[0] ?? "/placeholder.png"}
              alt={item.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {item.images?.map((img) => (
              <button
                key={img}
                className="aspect-square rounded-lg overflow-hidden border hover:opacity-80 transition"
              >
                <Image
                  src={img}
                  alt="thumb"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold">{item.name}</h1>
            <p className="text-sm text-muted-foreground">
              ID: {item.id.slice(0, 8)}…
            </p>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {item.description || "No description available."}
          </p>

          <div className="text-3xl font-bold">
            ${Number(item.price).toFixed(2)}
          </div>

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
    </section>
  );
}
