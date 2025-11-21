"use server";

import { db } from "@/drizzle/db";
import { asserts } from "@/drizzle/schema";

export async function getAsserts() {
  return await db.select().from(asserts);
}
