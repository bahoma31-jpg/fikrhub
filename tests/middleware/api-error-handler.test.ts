// ملف: tests/middleware/api-error-handler.test.ts — اختبارات معالجة الأخطاء المركزية
import { describe, it, expect } from "vitest";
import { apiErrorHandler } from "@/middleware/api-error-handler";
import { ZodError, z } from "zod";

describe("API Error Handler", () => {
    it("يجب أن يعالج ZodError بشكل صحيح مع status 400", async () => {
        // إنشاء خطأ Zod حقيقي
        const schema = z.object({ name: z.string() });
        let zodError: ZodError | null = null;
        try {
            schema.parse({ name: 123 });
        } catch (err) {
            zodError = err as ZodError;
        }

        expect(zodError).not.toBeNull();
        const response = apiErrorHandler(zodError!);
        expect(response.status).toBe(400);

        const body = await response.json();
        expect(body.success).toBe(false);
        expect(body.error).toBe("فشل التحقق من البيانات المرسلة.");
        expect(body.details).toBeDefined();
    });

    it("يجب أن يعالج الأخطاء العامة مع status 500", async () => {
        const error = new Error("خطأ غير متوقع");
        const response = apiErrorHandler(error);
        expect(response.status).toBe(500);

        const body = await response.json();
        expect(body.success).toBe(false);
        expect(body.error).toBe("حدث خطأ غير متوقع في الخادم.");
    });

    it("يجب أن يستخدم status مخصص إن وُجد", async () => {
        const error = Object.assign(new Error("غير مصرح"), { status: 403 });
        const response = apiErrorHandler(error);
        expect(response.status).toBe(403);
    });

    it("يجب أن يعالج قيمة unknown بدون انهيار", async () => {
        const response = apiErrorHandler("خطأ نصي بسيط");
        expect(response.status).toBe(500);

        const body = await response.json();
        expect(body.success).toBe(false);
    });

    it("يجب أن يعالج null بدون انهيار", async () => {
        const response = apiErrorHandler(null);
        expect(response.status).toBe(500);

        const body = await response.json();
        expect(body.success).toBe(false);
    });
});
