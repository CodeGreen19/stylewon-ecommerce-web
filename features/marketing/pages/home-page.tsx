import React from "react";
import Hero from "../components/home/hero";
import HomeProductListing from "../components/home/home-product-listing";
import { getProducts } from "../queries";

export default function HomePage() {
  const productsPromise = getProducts();
  return (
    <div>
      <Hero />
      <HomeProductListing promise={productsPromise} />
    </div>
  );
}
