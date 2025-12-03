"use server";

import { user } from "@/auth-schema";
import { db } from "@/drizzle/db";
import { carts } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function saveCart({
  allCarts,
}: {
  allCarts: Omit<typeof carts.$inferInsert, "userId">[];
}) {
  const account = await auth.api.getSession({ headers: await headers() });
  if (!account) {
    redirect("/");
  }
  const editedAllCarts = allCarts.map((c) => ({
    ...c,
    userId: account.user.id,
  }));
  await db.insert(carts).values(editedAllCarts);
}

export async function isPhoneNumberExist(phoneNumber: string) {
  const [existPhoneNumber] = await db
    .select({ phnNo: user.phoneNumber })
    .from(user)
    .where(eq(user.phoneNumber, phoneNumber));
  if (existPhoneNumber && existPhoneNumber.phnNo === phoneNumber) {
    return true;
  } else {
    return false;
  }
}
