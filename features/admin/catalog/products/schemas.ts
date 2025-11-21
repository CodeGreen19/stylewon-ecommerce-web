// schemas/product.ts
import { products } from "@/drizzle/schema";
import { z } from "zod";

const STATUS_ENUM = ["draft", "published", "archived"];

export const addProductSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 char.").max(255),
  // slug: z.string().min(1).max(255),
  description: z.string().nullable(),
  price: z.string().min(1, "Price must be a number"),
  // stock: z.number().min(0),
  // sku: z.string().max(100).nullable(),
  // images: z.array(z.url()),
  // categories: z.array(z.string()),
  // status: z.enum(STATUS_ENUM),
});

export type AddProductType = z.infer<typeof addProductSchema>;
export type AddProductShape = typeof addProductSchema.shape;
