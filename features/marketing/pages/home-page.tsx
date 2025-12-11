"use cache";

import { getQueryClient } from "@/tanstack-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Hero } from "../components/home/hero";
import { HomeCategories } from "../components/home/home-categories";
import { HomeProductListing } from "../components/home/home-product-listing";
import { getProducts } from "../server/queries";

export default async function HomePage() {
  const qc = getQueryClient();
  void qc.prefetchQuery({
    queryKey: ["marketing-products"],
    queryFn: () => getProducts(),
  });
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Hero />
      <HomeCategories />
      <HomeProductListing />
    </HydrationBoundary>
  );
}
