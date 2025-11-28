import { generateFakeProducts } from "@/components/seed/product-seed";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { addProduct } from "@/features/admin/catalog/products/actions";

export default async function page() {
  // const data = generateFakeProducts(50);
  // data.forEach(async (product) => {
  //   await addProduct(product);
  // });
  // await db.delete(products);
  return <div>finished</div>;
}
