import { z } from "zod";

export const billingSchema = z.object({
  fullName: z.string().min(1, "Required"),
  phone: z
    .string()
    .min(11, "Invalid phone number")
    .max(11, "Invalid phone number"),

  address: z.string().nullable(),
});

export type BillingSchemaType = z.infer<typeof billingSchema>;
export type BillingSchemaShape = typeof billingSchema.shape;
