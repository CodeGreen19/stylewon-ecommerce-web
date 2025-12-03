import { carts } from "@/drizzle/schema";

export type CartType = Pick<
  typeof carts.$inferInsert,
  "price" | "productId" | "color" | "quantity" | "size" | "imageUrl" | "name"
>;
