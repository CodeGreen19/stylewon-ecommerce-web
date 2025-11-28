"use server";

import { db } from "@/drizzle/db";
import { billingInfo } from "@/drizzle/schemas/billings";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BillingSchemaType } from "./schemas";
import { CartItem } from "./hooks/use-cart-items";
import { orderItems, orders, products } from "@/drizzle/schema";

export async function getBillingsInfo() {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  const [billings] = await db
    .select()
    .from(billingInfo)
    .where(eq(billingInfo.userId, account.user.id));
  if (!billings) {
    return null;
  }

  return billings;
}
export async function updateBillingsInfo(inputs: BillingSchemaType) {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  const [billings] = await db
    .select()
    .from(billingInfo)
    .where(eq(billingInfo.userId, account.user.id));
  if (!billings) {
    return db
      .insert(billingInfo)
      .values({ ...inputs, userId: account.user.id });
  }

  await db
    .update(billingInfo)
    .set({ ...inputs })
    .where(eq(billingInfo.userId, account.user.id));

  return billings;
}

type PlaceOrderType = {
  cart: CartItem[];
};
export async function placeOrder({ cart }: PlaceOrderType) {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  const totalAmount = cart.reduce(
    (prev, current) => prev + current.price * current.quantity,
    0
  );
  const [newOrder] = await db
    .insert(orders)
    .values({
      totalAmount: JSON.stringify(totalAmount),
      userId: account.user.id,
    })
    .returning();

  cart.forEach(async (c) => {
    await db.insert(orderItems).values({
      name: c.name,
      orderId: newOrder.id,
      price: JSON.stringify(c.price),
      productId: c.productId,
      quantity: c.quantity,
      image: c.image,
    });
  });
}

export async function relatedProducts() {
  return await db.select().from(products).limit(9);
}
