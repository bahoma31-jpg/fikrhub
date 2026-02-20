// ملف: lib/db.ts — نسخة Drizzle المشتركة
import { db } from "@/db/client";

/**
 * @constant dbInstance
 * @description نسخة مشتركة من Drizzle لسهولة الاستيراد والاستخدام في الـ API والـ Server Actions.
 */
export const dbInstance = db;
