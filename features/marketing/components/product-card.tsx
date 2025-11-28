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
      <div className="border rounded-md border-cyan-700  flex flex-col gap-3 hover:shadow-sm transition bg-cyan-800">
        <Image
          src={images[0] ?? ""}
          alt={name}
          height={200}
          width={2000}
          className="w-full h-40 object-cover rounded-md"
        />

        <div className="flex flex-col space-y-1 p-2">
          <span className="font-medium text-base">{name}</span>
          <span className="text-lg text-cyan-300">{price} taka</span>
        </div>
      </div>
    </Link>
  );
}
