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

/**
 * @schema createWorkspaceSchema
 * @description التحقق من بيانات إنشاء مساحة عمل.
 */
export const createWorkspaceSchema = z.object({
    name: z.string().min(2, "اسم مساحة العمل يجب أن يكون حرفين على الأقل").max(100, "الاسم طويل جداً"),
    description: z.string().optional(),
});

/**
 * @schema updateWorkspaceSchema
 * @description التحقق من بيانات تحديث مساحة عمل.
 */
export const updateWorkspaceSchema = createWorkspaceSchema.partial();

/**
 * @schema addMemberSchema
 * @description التحقق من بيانات إضافة عضو.
 */
export const addMemberSchema = z.object({
    email: z.string().email("يجب إدخال بريد إلكتروني صحيح"),
    role: z.enum(["owner", "member", "viewer"]).default("member"),
});

/**
 * @schema updateSessionSchema
 * @description التحقق من بيانات تحديث جلسة.
 */
export const updateSessionSchema = SessionSchema.partial();

/**
 * @schema createIdeaSchema
 * @description التحقق من بيانات إنشاء الفكرة.
 */
export const createIdeaSchema = IdeaSchema;

/**
 * @schema updateIdeaSchema
 * @description التحقق من بيانات تحديث الفكرة.
 */
export const updateIdeaSchema = z.object({
    content: z.string().min(1, "محتوى الفكرة لا يمكن أن يكون فارغاً").optional(),
    category: z.string().optional(),
});

/**
 * @schema rateSchema
 * @description التحقق من تقييم الفكرة.
 */
export const rateSchema = z.object({
    score: z.number().int().min(1).max(5),
    criteria: z.string().min(1).default("general"),
});

/**
 * @schema commentSchema
 * @description التحقق من التعليق على فكرة.
 */
export const commentSchema = z.object({
    content: z.string().min(1, "التعليق لا يمكن أن يكون فارغاً"),
    parentId: z.string().uuid("معرف التعليق الأب غير صالح").optional(),
});
