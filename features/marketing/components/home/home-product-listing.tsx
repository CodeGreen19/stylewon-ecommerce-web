"use client";

import { Suspense, use } from "react";
import { getProducts } from "../../server/queries";
import { Heading } from "../shared/heading";
import { ProductCard } from "../shared/product-card";

export function HomeProductListing({
  promise,
}: {
  promise: ReturnType<typeof getProducts>;
}) {
  return (
    <div className="m-auto mt-10 max-w-5xl px-2 xl:px-0">
      <Heading>Trending</Heading>
      <Suspense fallback={<div>Fetching...</div>}>
        <Products promise={promise} />
      </Suspense>
    </div>
  );
}

function Products({ promise }: { promise: ReturnType<typeof getProducts> }) {
  const products = use(promise);
  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-4 lg:gap-4">
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
