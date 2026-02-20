// ملف: db/schema/subscriptions.ts — إدارة الاشتراكات و Stripe
import { pgTable, timestamp, uuid, varchar, index, unique } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * @table subscriptions
 * @description تتبع اشتراكات المستخدمين والربط مع بوابة الدفع Stripe.
 */
export const subscriptions = pgTable("subscriptions", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    plan: varchar("plan", { length: 50 }).default("free").notNull(), // free, pro
    status: varchar("status", { length: 20 }).default("active").notNull(), // active, canceled, expired
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    currentPeriodEnd: timestamp("current_period_end"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    userUniqueIdx: unique("user_unique_idx").on(table.userId),
    stripeCustomerIdx: index("stripe_customer_idx").on(table.stripeCustomerId),
    statusIdx: index("status_idx").on(table.status),
}));
