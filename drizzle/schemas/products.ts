// drizzle/schema/products.ts
import { relations, sql } from "drizzle-orm";
import {
  integer,
  json,
  numeric,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../helpers";
import { asserts } from "./asserts";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  // slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  quantity: numeric("quantity").notNull().default("0"),
  price: numeric("price", { precision: 12, scale: 2 })
    .notNull()
    .default("0.00"),
  // stock: integer("stock").notNull().default(0),
  // sku: varchar("sku", { length: 100 }),

  // // store images and small meta as jsonb for flexibility (array of urls, or objects later)
  // images: json("images").default(sql`'[]'::jsonb`),
  // status: varchar("status", { length: 20 }).notNull(), // e.g. draft | published | archived
  images: text("images").array().notNull().default([]),
  createdAt,
  updatedAt,
});
