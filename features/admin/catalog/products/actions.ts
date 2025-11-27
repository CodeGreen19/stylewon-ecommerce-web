"use server";

import { db } from "@/drizzle/db";
import { productColors, products, productSizes } from "@/drizzle/schema";
import { AddProductSchemaType } from "./schemas";

export async function addProduct(info: AddProductSchemaType) {
  const [res] = await db
    .insert(products)
    .values({ ...info, stocks: Number(info.stocks) })
    .returning();
  const editedSizes = info.sizes.map((s) => ({ ...s, productId: res.id }));
  await db.insert(productSizes).values(editedSizes);
  const editedColors = info.sizes.map((s) => ({ ...s, productId: res.id }));
  await db.insert(productColors).values(editedColors);
  return { message: "New product added" };
}
