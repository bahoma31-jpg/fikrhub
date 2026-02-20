// ملف: lib/validations.ts — قواعد التحقق باستخدام Zod
import { z } from "zod";

/**
 * @schema SessionSchema
 * @description التحقق من بيانات جلسة العصف الذهني.
 */
export const SessionSchema = z.object({
    title: z.string().min(5, "عنوان الجلسة يجب أن يكون 5 أحرف على الأقل"),
    workspaceId: z.string().uuid("معرف مساحة العمل غير صالح"),
    techniqueType: z.enum([
        "classic",
        "brainwriting",
        "reverse",
        "starbursting",
        "stepladder",
        "six_hats",
        "scamper",
        "worst_idea",
        "electronic",
    ]),
    settings: z.record(z.string(), z.unknown()).optional(),
});

/**
 * @schema IdeaSchema
 * @description التحقق من بيانات الفكرة.
 */
export const IdeaSchema = z.object({
    content: z.string().min(1, "محتوى الفكرة لا يمكن أن يكون فارغاً"),
    sessionId: z.string().uuid("معرف الجلسة غير صالح"),
    category: z.string().optional(),
});

/**
 * @schema UserSchema
 * @description التحقق من بيانات المستخدم.
 */
export const UserSchema = z.object({
    name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل").optional(),
    email: z.string().email("يجب إدخال بريد إلكتروني صحيح"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").optional(),
});
