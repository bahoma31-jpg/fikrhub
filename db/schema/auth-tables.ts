// ملف: db/schema/auth-tables.ts — جداول المصادقة المتوافقة مع Auth.js/Drizzle
import { pgTable, uuid, varchar, text, timestamp, integer, index, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * @table auth_accounts
 * @description جدول ربط مزودي OAuth بحسابات المستخدمين (Google, ...)
 * الأعمدة بصيغة snake_case لتتوافق مع DrizzleAdapter الافتراضي
 */
export const auth_accounts = pgTable("auth_accounts", {
    userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
}, (account) => ({
    compositePk: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    userIdx: index("auth_accounts_user_idx").on(account.userId),
}));

/**
 * @table auth_sessions
 * @description جلسات المصادقة (JWT/session tokens) مرتبطة بالمستخدمين
 */
export const auth_sessions = pgTable("auth_sessions", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
}, (t) => ({
    userIdx: index("auth_sessions_user_idx").on(t.userId),
}));

/**
 * @table auth_verification_tokens
 * @description رموز التحقق المُستخدمة في تسجيل الدخول عبر البريد
 */
export const auth_verification_tokens = pgTable("auth_verification_tokens", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.identifier, t.token] }),
}));

export type AuthAccount = typeof auth_accounts.$inferSelect;
export type AuthSession = typeof auth_sessions.$inferSelect;
export type AuthVerificationToken = typeof auth_verification_tokens.$inferSelect;
