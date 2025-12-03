"use cache";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";

export async function getProducts() {
  cacheTag("marketing_products");
  return await db.select().from(products);
}
export async function productDetails(id: string) {
  cacheTag("marketing_product_details");
  // const [product] = await db.select().from(products).where(eq(products.id, id));
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: { sizes: true, colors: true },
  });

  if (!product) {
    redirect("/");
  }
  return product;
}
