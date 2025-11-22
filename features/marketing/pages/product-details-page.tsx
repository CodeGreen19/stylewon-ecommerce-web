import React from "react";
import { productDetails } from "../queries";
import DetailsPage from "../components/product-details/details-box";

export default async function ProductDetailsPage({ slug }: { slug: string }) {
  const product = await productDetails(slug);
  return <DetailsPage product={product} />;
}
