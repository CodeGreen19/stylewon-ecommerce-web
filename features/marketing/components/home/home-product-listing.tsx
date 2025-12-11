"use client";

import { Suspense, use } from "react";
import { getProducts } from "../../server/queries";
import { Heading } from "../shared/heading";
import { ProductCard } from "../shared/product-card";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { useSuspenseQuery } from "@tanstack/react-query";

export function HomeProductListing() {
  return (
    <div className="m-auto mt-10 max-w-5xl px-2 xl:px-0">
      <Heading>Trending</Heading>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Loading />}>
          <Products />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function Products() {
  const { data: products } = useSuspenseQuery({
    queryKey: ["marketing-products"],
    queryFn: () => getProducts(),
  });

  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-4 lg:gap-4">
      {products.map((p) => (
        <ProductCard
          stock={p.stocks}
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
