"use server";

import { db } from "@/drizzle/db";
import { AddProductType } from "./schemas";
import { products } from "@/drizzle/schema";
import { updateTag } from "next/cache";

export async function addProduct(inputs: AddProductType) {
  await db.insert(products).values(inputs);
  updateTag("products");
}
