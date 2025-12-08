import { db } from "@/drizzle/db";
import { categories, categoriesWithProducts } from "@/drizzle/schema";
import { count, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = await db
    .select({
      id: categories.id,
      name: categories.categoryName,
      productCount: count(categoriesWithProducts.productId),
    })
    .from(categories)
    .leftJoin(
      categoriesWithProducts,
      eq(categories.id, categoriesWithProducts.categoryId),
    )
    .groupBy(categories.id);
  return NextResponse.json({ data });
}
