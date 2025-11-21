import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../helpers";

export const asserts = pgTable("asserts", {
  id: uuid("id").defaultRandom().primaryKey(),
  secureUrl: text("secure_url").notNull(),
  publicId: text("public_id").notNull(),
  createdAt,
  updatedAt,
});
