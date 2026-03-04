// ملف: tests/auth/auth-config.test.ts — اختبارات تكوين المصادقة
import { describe, it, expect, vi } from "vitest";
import { z } from "zod";

// محاكاة قاعدة البيانات
vi.mock("@/db", () => ({
    db: {
        select: vi.fn().mockReturnThis(),
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([]),
    },
}));

// محاكاة Drizzle schema
vi.mock("@/db/schema", () => ({
    users: { id: "id", email: "email" },
    auth_accounts: {},
    auth_sessions: {},
    auth_verification_tokens: {},
}));

describe("Auth Config", () => {
    it("يجب أن يتم تصدير authConfig بنجاح", async () => {
        // اختبار أن الملف يُحمّل بدون أخطاء
        const { authConfig } = await import("@/lib/auth.config");
        expect(authConfig).toBeDefined();
    });

    it("يجب أن يحتوي على مزودي المصادقة المطلوبين", async () => {
        const { authConfig } = await import("@/lib/auth.config");
        // التحقق من وجود مزودين على الأقل (Google + Credentials)
        expect(authConfig.providers).toBeDefined();
        expect(authConfig.providers.length).toBeGreaterThanOrEqual(2);
    });

    it("يجب أن يحتوي على صفحات مخصصة", async () => {
        const { authConfig } = await import("@/lib/auth.config");
        // التحقق من تحديد صفحة تسجيل الدخول
        expect(authConfig.pages).toBeDefined();
        expect(authConfig.pages?.signIn).toBe("/login");
        expect(authConfig.pages?.error).toBe("/login");
    });
});

// نموذج Zod مطابق لما في auth.config.ts للتحقق من المنطق
const credentialsSchema = z.object({
    email: z.string().email("بريد إلكتروني غير صحيح"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

describe("Credentials Schema Validation", () => {
    it("يجب أن يرفض بريد إلكتروني غير صالح", () => {
        const result = credentialsSchema.safeParse({
            email: "invalid-email",
            password: "123456",
        });
        expect(result.success).toBe(false);
    });

    it("يجب أن يرفض كلمة مرور قصيرة", () => {
        const result = credentialsSchema.safeParse({
            email: "test@example.com",
            password: "12345",
        });
        expect(result.success).toBe(false);
    });

    it("يجب أن يقبل بيانات صحيحة", () => {
        const result = credentialsSchema.safeParse({
            email: "test@example.com",
            password: "123456",
        });
        expect(result.success).toBe(true);
    });

    it("يجب أن يرفض بريد إلكتروني فارغ", () => {
        const result = credentialsSchema.safeParse({
            email: "",
            password: "123456",
        });
        expect(result.success).toBe(false);
    });

    it("يجب أن يرفض كلمة مرور فارغة", () => {
        const result = credentialsSchema.safeParse({
            email: "test@example.com",
            password: "",
        });
        expect(result.success).toBe(false);
    });
});
