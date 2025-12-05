"use client";

import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  price: string;
  images: string[];
  id: string;
};

export function ProductCard({ name, price, images, id }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-secondary flex flex-col gap-3 rounded-md border drop-shadow-sm transition hover:shadow-sm">
        <Image
          src={images[0] ?? ""}
          alt={name}
          height={200}
          width={2000}
          className="h-40 w-full rounded-md object-cover"
        />

        <div className="flex flex-col space-y-1 p-2">
          <span className="text-base font-medium">{name}</span>
          <span className="text-lg font-semibold">{price} taka</span>
        </div>
      </div>
    </Link>
  );
}
