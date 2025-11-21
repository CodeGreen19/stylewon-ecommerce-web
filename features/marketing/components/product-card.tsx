"use client";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

export function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm transition">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-lg"
      />

      <div className="flex flex-col">
        <span className="font-medium text-lg">{name}</span>
        <span className="text-sm text-muted-foreground">${price}</span>
      </div>
    </div>
  );
}
