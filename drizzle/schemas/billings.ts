import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../helpers";
import { user } from "./auth";
import { relations } from "drizzle-orm";

export const billingInfo = pgTable("billing_info", {
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: text("address"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  createdAt,
  updatedAt,
});

export const billingsInfoRelations = relations(billingInfo, ({ one }) => ({
  user: one(user, { fields: [billingInfo.userId], references: [user.id] }),
}));
