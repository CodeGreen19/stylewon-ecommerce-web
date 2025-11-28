"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { relatedProducts } from "../../actions";
import { ProductCard } from "../product-card";
import Heading from "../heading";

export default function RelatedProducts() {
  const { data } = useSuspenseQuery({
    queryKey: ["related-products"],
    queryFn: () => relatedProducts(),
  });
  return (
    <div className="max-w-5xl m-auto">
      <Heading>Related products</Heading>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-2 lg:px-0">
        {data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
