// ملف: types/user.types.ts — أنواع المستخدمين والمصادقة
import { users } from "@/db/schema/users";
import { authSessions, accounts } from "@/db/schema/auth";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type AuthSession = typeof authSessions.$inferSelect;
export type NewAuthSession = typeof authSessions.$inferInsert;

export type UserRole = "user" | "admin";
