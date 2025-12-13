"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";

export async function relatedProducts() {
  return await db.select().from(products).limit(9);
}
