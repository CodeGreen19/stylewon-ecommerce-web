// drizzle/schema/products.ts
import { integer, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { relations } from "drizzle-orm";
import { carts } from "./carts";
import { orderItems } from "./orders";
import { categoriesWithProducts } from "./categories";

export const products = pgTable("products", {
  id,

  name: text("name").notNull(), // 5–255 chars (handled by Zod)
  description: text("description").notNull(),

  price: numeric("price").notNull(), // stored as numeric
  costOfGoods: numeric("cost_of_goods"), // optional
  profit: numeric("profit").notNull(),
  margin: numeric("margin").notNull(),

  images: text("images").array().notNull(), // text[]

  stocks: integer("stocks").notNull(), // max 10000
  shippingWeight: numeric("shipping_weight").notNull(),
  createdAt,
  updatedAt,
});

export const productRelations = relations(products, ({ many }) => ({
  sizes: many(productSizes),
  colors: many(productColors),
  carts: many(carts),
  orderItems: many(orderItems),
  categoriesWithProducts: many(categoriesWithProducts),
}));

export const productSizes = pgTable("product_sizes", {
  id,
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  value: text("value").notNull(),
});
export const productSizesRelations = relations(productSizes, ({ one }) => ({
  product: one(products, {
    fields: [productSizes.productId],
    references: [products.id],
  }),
}));

export const productColors = pgTable("product_colors", {
  id,
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  value: text("value").notNull(),
  hexColor: text("hex_color"), // optional in Zod
});

export const productColorsRelations = relations(productColors, ({ one }) => ({
  product: one(products, {
    fields: [productColors.productId],
    references: [products.id],
  }),
}));
