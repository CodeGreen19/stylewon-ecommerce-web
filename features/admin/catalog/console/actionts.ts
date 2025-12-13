"use server";

import { db } from "@/drizzle/db";
import { defaultDeliveryCharge } from "@/drizzle/schema";

export async function getDeliverCharge() {
  const [res] = await db.select().from(defaultDeliveryCharge);
  return res;
}
export async function updateDeliverCharge({
  insideDhaka,
  outsideDhaka,
}: {
  insideDhaka: string;
  outsideDhaka: string;
}) {
  const [res] = await db.select().from(defaultDeliveryCharge);
  if (res) {
    await db.update(defaultDeliveryCharge).set({
      insideDhaka: Number(insideDhaka),
      outsideDhaka: Number(outsideDhaka),
    });
  } else {
    await db.insert(defaultDeliveryCharge).values({
      insideDhaka: Number(insideDhaka),
      outsideDhaka: Number(outsideDhaka),
    });
  }
}
