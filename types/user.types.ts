// ملف: types/user.types.ts — أنواع مستخدمي المنصة
import { users } from "@/db/schema/users";
import { userStats } from "@/db/schema/user-stats";

/**
 * @type User
 * @description نوع المستخدم الكامل المستنبط من القاعدة.
 */
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/**
 * @enum UserRole
 * @description الأدوار المتاحة للمستخدمين في النظام.
 */
export enum UserRole {
    USER = "user",
    ADMIN = "admin",
    MODERATOR = "moderator"
}

/**
 * @type PublicUser
 * @description نسخة للمستخدم قابلة للعرض العام (بدون بيانات حساسة كالبريد أو الهاش).
 */
export type PublicUser = Omit<User, "email" | "passwordHash" | "emailVerified">;

/**
 * @interface UserWithStats
 * @description بيانات المستخدم مقترنة بإحصائياته المجمعة.
 */
export interface UserWithStats extends User {
    stats?: typeof userStats.$inferSelect;
}
