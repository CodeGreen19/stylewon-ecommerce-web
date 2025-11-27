"use server";

import { db } from "@/drizzle/db";

export async function getProducts() {
  return await db.query.products.findMany({
    with: { colors: true, sizes: true },
  });
}
