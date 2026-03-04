// ملف: services/user.service.ts — خدمة إدارة المستخدمين (Drizzle + bcryptjs)
import { db } from "@/db";
import { users, userStats } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashSync } from "bcryptjs";
import type { User, NewUser, UserWithStats } from "@/types";
import { logger } from "@/lib/logger";

export async function getUserById(id: string): Promise<User | null> {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user ?? null;
  } catch (err: unknown) {
    logger.error(`فشل جلب المستخدم بواسطة المعرف: ${id}`, err);
    throw new Error("فشل جلب المستخدم بواسطة المعرف");
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user ?? null;
  } catch (err: unknown) {
    logger.error(`فشل جلب المستخدم بواسطة البريد الإلكتروني: ${email}`, err);
    throw new Error("فشل جلب المستخدم بواسطة البريد الإلكتروني");
  }
}

export async function createUser(data: NewUser & { password?: string }): Promise<User> {
  try {
    // فصل كلمة المرور عن بيانات المستخدم قبل الإدراج
    const { password, ...userData } = data;
    const toInsert = {
      ...userData,
      ...(password ? { passwordHash: hashSync(password, 12) } : {}),
    };

    const [created] = await db.insert(users).values(toInsert).returning();
    return created as User;
  } catch (err: unknown) {
    logger.error("فشل إنشاء المستخدم", err);
    throw new Error("فشل إنشاء المستخدم");
  }
}

export async function updateUser(id: string, data: Partial<NewUser> & { password?: string }): Promise<User> {
  try {
    // فصل كلمة المرور عن بيانات التحديث
    const { password, ...updateData } = data;
    const updates = {
      ...updateData,
      ...(password ? { passwordHash: hashSync(password, 12) } : {}),
    };

    const [updated] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();

    if (!updated) {
      logger.warn(`تحديث مستخدم غير موجود بالمعرف: ${id}`);
      throw new Error("المستخدم غير موجود");
    }
    return updated as User;
  } catch (err: unknown) {
    logger.error(`فشل تحديث بيانات المستخدم: ${id}`, err);
    throw new Error("فشل تحديث بيانات المستخدم");
  }
}

export async function getUserStats(userId: string): Promise<UserWithStats | null> {
  try {
    const [result] = await db
      .select({ users: users, user_stats: userStats })
      .from(users)
      .leftJoin(userStats, eq(userStats.userId, users.id))
      .where(eq(users.id, userId))
      .limit(1);

    if (!result) return null;
    return { ...result.users, stats: result.user_stats ?? undefined } as UserWithStats;
  } catch (err: unknown) {
    logger.error(`فشل جلب إحصائيات المستخدم: ${userId}`, err);
    throw new Error("فشل جلب إحصائيات المستخدم");
  }
}
