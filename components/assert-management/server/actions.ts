"use server";

import { db } from "@/drizzle/db";
import { asserts } from "@/drizzle/schema";
import { deleteFromCloude, uploadToCloude } from "./helpers";
import { eq } from "drizzle-orm";

export async function uploadAssert(formData: FormData) {
  const imageFile = formData.get("imageFile") as File;
  const res = await uploadToCloude(imageFile);
  await db.insert(asserts).values(res);
}
export async function deleteAssert(publicId: string) {
  await deleteFromCloude(publicId);
  await db.delete(asserts).where(eq(asserts.publicId, publicId));
}
