// schemas/product.ts
import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .min(5, "Product name must be at least 5 characters.")
    .max(255, "Product name must be at most 255 characters."),

  description: z.string().min(1, "Description is required."),

  price: z
    .string()
    .min(2, "Price must exceed 10 units.")
    .max(100000, "Price cannot exceed 100000 units."),

  costOfGoods: z.string().optional(),

  profit: z.string(),

  margin: z.string(),

  images: z.array(z.string()),
  sizes: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  colors: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      hexColor: z.string().optional(),
    })
  ),

  stocks: z
    .string()
    .min(1, "Stock quantity is required.")
    .max(10000, "Stock cannot exceed 10000 units."),

  shippingWeight: z.string(),
});

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
