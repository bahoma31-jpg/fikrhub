// ملف: tests/middleware/rate-limiter.test.ts — اختبارات تحديد معدل الطلبات
import { describe, it, expect, beforeEach } from "vitest";
import { rateLimiter } from "@/middleware/rate-limiter";
import { NextRequest } from "next/server";

/**
 * إنشاء NextRequest وهمي مع headers محددة
 */
function createMockRequest(ip: string = "192.168.1.1"): NextRequest {
    return new NextRequest("http://localhost:3000/api/test", {
        headers: {
            "x-forwarded-for": ip,
        },
    });
}

describe("Rate Limiter", () => {
    beforeEach(() => {
        // لا نحتاج لتنظيف الـ Map لأن كل اختبار يستخدم IP مختلف
    });

    it("يجب أن يسمح بالطلب الأول", () => {
        const request = createMockRequest("10.0.0.1");
        const result = rateLimiter(request, false);
        expect(result).toBeNull();
    });

    it("يجب أن يسمح بعدة طلبات ضمن الحد المسموح", () => {
        const ip = "10.0.0.2";
        for (let i = 0; i < 50; i++) {
            const request = createMockRequest(ip);
            const result = rateLimiter(request, false);
            expect(result).toBeNull();
        }
    });

    it("يجب أن يرفض الطلبات بعد تجاوز الحد للمجانيين (60)", () => {
        const ip = "10.0.0.3";
        // إرسال 60 طلب (الحد)
        for (let i = 0; i < 60; i++) {
            rateLimiter(createMockRequest(ip), false);
        }
        // الطلب 61 يجب أن يُرفض
        const result = rateLimiter(createMockRequest(ip), false);
        expect(result).not.toBeNull();
    });

    it("يجب أن يرفض الطلبات للمجانيين بـ status 429", () => {
        const ip = "10.0.0.4";
        for (let i = 0; i < 61; i++) {
            rateLimiter(createMockRequest(ip), false);
        }
        const result = rateLimiter(createMockRequest(ip), false);
        expect(result).not.toBeNull();
        expect(result?.status).toBe(429);
    });

    it("يجب أن يكون حد المحترفين أعلى (300)", () => {
        const ip = "10.0.0.5";
        // إرسال 200 طلب (أقل من حد Pro)
        for (let i = 0; i < 200; i++) {
            const result = rateLimiter(createMockRequest(ip), true);
            expect(result).toBeNull();
        }
    });

    it("يجب أن يعمل مع عدم وجود x-forwarded-for", () => {
        const request = new NextRequest("http://localhost:3000/api/test");
        const result = rateLimiter(request, false);
        expect(result).toBeNull();
    });
});
