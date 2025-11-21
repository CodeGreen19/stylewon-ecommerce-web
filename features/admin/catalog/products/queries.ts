"use cache";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { cacheTag } from "next/cache";

export async function getProducts() {
  cacheTag("products");
  return await db.select().from(products);
}
