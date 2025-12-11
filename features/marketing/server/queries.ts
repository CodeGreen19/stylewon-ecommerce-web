"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getProducts() {
  return await db.select().from(products);
}
export async function productDetails(id: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: { sizes: true, colors: true },
  });

  if (!product) {
    redirect("/");
  }
  return product;
}
