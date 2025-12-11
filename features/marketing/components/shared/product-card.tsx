"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  price: string;
  images: string[];
  id: string;
  stock: string | null;
};

export function ProductCard({
  name,
  price,
  images,
  id,
  stock,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-secondary flex flex-col gap-3 rounded-md border drop-shadow-sm transition hover:shadow-sm">
        <Image
          src={images[0] ?? ""}
          alt={name}
          height={200}
          width={2000}
          className="h-52 w-full rounded-md object-cover"
        />

        <div className="relative flex flex-col space-y-1 p-2">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-base font-semibold">{price} taka</span>
          {Number(stock) === 0 && (
            <Badge
              variant={"outline"}
              className="text-destructive absolute right-2 bottom-3"
            >
              Out of stock
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
