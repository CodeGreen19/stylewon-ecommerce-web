"use client";

import React, { Suspense, use } from "react";
import { ProductCard } from "../product-card";
import Heading from "../heading";
import { getProducts } from "../../queries";

export default function HomeProductListing({
  promise,
}: {
  promise: ReturnType<typeof getProducts>;
}) {
  return (
    <div className="my-10 max-w-5xl m-auto px-4 xl:px-0">
      <Heading>Products</Heading>
      <Suspense fallback={<div>Fetching...</div>}>
        <Products promise={promise} />
      </Suspense>
    </div>
  );
}

function Products({ promise }: { promise: ReturnType<typeof getProducts> }) {
  const products = use(promise);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          name={p.name}
          price={p.price}
          images={p.images}
          id={p.id}
        />
      ))}
    </div>
  );
}
