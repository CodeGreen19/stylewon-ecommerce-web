import { Hero } from "../components/home/hero";
import { HomeCategories } from "../components/home/home-categories";
import { HomeProductListing } from "../components/home/home-product-listing";
import { getProducts } from "../server/queries";

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
