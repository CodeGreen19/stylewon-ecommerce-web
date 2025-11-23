"use server";

import { db } from "@/drizzle/db";
import { orderItems, orders } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getOrders() {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  const ordersInfo = await db.query.orders.findMany({
    with: { items: true },
    where: eq(orders.userId, account.user.id),
  });
  return ordersInfo;
}
