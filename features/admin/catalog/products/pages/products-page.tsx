import React, { Suspense } from "react";
import { getProducts } from "../queries";
import ProductHeading from "../components/product-heading";
import { ErrorBoundary } from "react-error-boundary";
import ProductListingTable from "../components/product-listing-table";

export default function ProductsPage() {
  const promise = getProducts();
  return (
    <div>
      <ProductHeading />
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>loading...</div>}>
          <ProductListingTable promise={promise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
