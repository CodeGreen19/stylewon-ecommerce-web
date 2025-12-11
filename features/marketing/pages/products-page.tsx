import React from "react";
import ProductsNavHeader from "../components/products/products-nav-header";
import ProductsListings from "../components/products/products-listings";

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <ProductsNavHeader />
      <ProductsListings />
    </div>
  );
}
