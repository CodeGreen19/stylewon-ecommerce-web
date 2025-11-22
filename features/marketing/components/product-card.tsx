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
      <div className="border rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm transition">
        <Image
          src={images[0] ?? ""}
          alt={name}
          height={200}
          width={2000}
          className="w-full h-40 object-cover rounded-lg"
        />

        <div className="flex flex-col">
          <span className="font-medium text-lg">{name}</span>
          <span className="text-sm text-muted-foreground">${price}</span>
        </div>
      </div>
    </Link>
  );
}
