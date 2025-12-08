"use server";

import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";

export async function getProducts() {
  return await db.query.products.findMany({
    with: { colors: true, sizes: true },
  });
}

export async function productCategories() {
  return await db.select().from(categories);
}
