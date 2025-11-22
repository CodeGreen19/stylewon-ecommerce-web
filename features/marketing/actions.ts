"use server";

import { db } from "@/drizzle/db";
import { billingInfo } from "@/drizzle/schemas/billings";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BillingSchemaType } from "./schemas";

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
