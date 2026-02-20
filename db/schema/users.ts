// ملف: db/schema/users.ts — جدول المستخدمين المتوافق مع NextAuth
import { pgTable, text, timestamp, uuid, varchar, index } from "drizzle-orm/pg-core";

/**
 * @table users
 * @description جدول المستخدمين الأساسي المتوافق مع متطلبات المصادقة والنظام.
 */
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image"),
    passwordHash: text("password_hash"),
    role: varchar("role", { length: 20 }).default("user").notNull(), // user, admin
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    emailIdx: index("email_idx").on(table.email),
    createdAtIdx: index("created_at_idx").on(table.createdAt),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
