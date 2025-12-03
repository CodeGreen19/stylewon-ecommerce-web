import React from "react";
import Hero from "../components/home/hero";
import HomeProductListing from "../components/home/home-product-listing";
import { getProducts } from "../server/queries";
import HomeCategories from "../components/home/home-categories";

export default function HomePage() {
  const productsPromise = getProducts();
  return (
    <div>
      <Hero />
      <HomeCategories />
      <HomeProductListing promise={productsPromise} />
    </div>
  );
}
