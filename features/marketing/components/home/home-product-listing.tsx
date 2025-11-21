import React from "react";
import { ProductCard } from "../product-card";
import Heading from "../heading";

export const products = [
  {
    id: "1",
    name: "Minimal Backpack",
    price: 49,
    image: "/product.jpg",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 89,
    image: "/product.jpg",
  },
  {
    id: "3",
    name: "Modern Chair",
    price: 120,
    image: "/product.jpg",
  },
  {
    id: "4",
    name: "Sneakers",
    price: 79,
    image: "/product.jpg",
  },
];

export default function HomeProductListing() {
  return (
    <div className="my-10 max-w-5xl m-auto px-4 xl:px-0">
      <Heading>Products</Heading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
}
