"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { relatedProducts } from "../../server/actions";
import { ProductCard } from "../shared/product-card";
import { Heading } from "../shared/heading";

export default function RelatedProducts() {
  const { data } = useSuspenseQuery({
    queryKey: ["related-products"],
    queryFn: () => relatedProducts(),
  });
  return (
    <div className="m-auto max-w-5xl">
      <Heading>Related products</Heading>
      <div className="grid grid-cols-2 gap-1 px-2 md:grid-cols-3 lg:grid-cols-4 lg:px-0">
        {data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
