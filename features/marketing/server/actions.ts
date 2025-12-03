"use server";

import { db } from "@/drizzle/db";
import { billingInfo } from "@/drizzle/schemas/billings";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BillingSchemaType } from "../schemas";
import { carts, orderItems, orders, products } from "@/drizzle/schema";
import { CartType } from "../types";

export async function getBillingsInfo() {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  let billings;
  const [res] = await db
    .select()
    .from(billingInfo)
    .where(eq(billingInfo.userId, account.user.id));
  if (res) {
    billings = res;
  }

  const allCarts = await db
    .select({ price: carts.price, qty: carts.quantity })
    .from(carts)
    .where(eq(carts.userId, account.user.id));
  const totalAmount = allCarts.reduce(
    (prev, curr) => prev + curr.price * curr.qty,
    0,
  );

  return { billings, totalAmount };
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
  carts: Omit<CartType[], "orderId">;
};
export async function placeOrder({ carts }: PlaceOrderType) {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  const totalAmount = carts.reduce(
    (prev, current) => prev + current.price * current.quantity,
    0,
  );
  console.log("server", carts);

  // const [newOrder] = await db
  //   .insert(orders)
  //   .values({
  //     totalAmount,
  //     userId: account.user.id,
  //   })
  //   .returning();

  // carts.forEach(async (c) => {
  //   await db.insert(orderItems).values({
  //     ...carts,
  //     orderId: newOrder.id,
  //     price: c.price,
  //     name: c.name,
  //     quantity: c.quantity,
  //     productId: c.productId,
  //   });
  // });
}

export async function relatedProducts() {
  return await db.select().from(products).limit(9);
}

export async function addToCart(
  inputs: Omit<typeof carts.$inferInsert, "userId">,
) {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  const whereEqality = and(
    eq(carts.productId, inputs.productId),
    eq(carts.userId, account.user.id),
  );

  const isCartExisted = await db.query.carts.findFirst({
    where: whereEqality,
  });
  if (isCartExisted) {
    if (inputs.quantity === isCartExisted.quantity) {
      return { info: "This item already added to cart" };
    }
    await db
      .update(carts)
      .set({ quantity: inputs.quantity })
      .where(whereEqality);
    return { message: "Quantity updated" };
  }
  await db.insert(carts).values({ ...inputs, userId: account.user.id });
  return { message: "Product added to cart" };
}

export async function getCartItems({ userId }: { userId: string | undefined }) {
  if (!userId) return;
  const allCarts = await db.query.carts.findMany({
    where: eq(carts.userId, userId),
  });
  return allCarts;
}

export async function cartActions({
  cartId,
  type,
}: {
  type: "REMOVE_FROM_CART" | "INCREASE_QUANTITY" | "DECREASE_QUANTITY";
  cartId: string;
}) {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  const searchWhere = and(
    eq(carts.userId, account.user.id),
    eq(carts.id, cartId),
  );
  const cart = await db.query.carts.findFirst({
    where: searchWhere,
  });
  if (!cart) {
    return { info: "No cart!" };
  }

  if (type === "REMOVE_FROM_CART") {
    await db.delete(carts).where(searchWhere);
  }
  if (type === "INCREASE_QUANTITY") {
    await db
      .update(carts)
      .set({ quantity: cart.quantity + 1 })
      .where(searchWhere);
  }
  if (type === "DECREASE_QUANTITY") {
    await db
      .update(carts)
      .set({ quantity: cart.quantity > 1 ? cart.quantity - 1 : cart.quantity })
      .where(searchWhere);
  }
}
