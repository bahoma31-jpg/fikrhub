// ملف: middleware/rate-limiter.ts — تحديد معدل الطلبات
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// مخزن بسيط للتحكم في معدل الطلبات (في الإنتاج يفضل استخدام Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

/**
 * @function getClientIp
 * @description استخراج عنوان IP من الطلب بطريقة آمنة
 */
function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0]?.trim() ?? "127.0.0.1";
    }
    return request.headers.get("x-real-ip") ?? "127.0.0.1";
}

/**
 * @function rateLimiter
 * @description تحديد عدد الطلبات لكل مستخدم بناءً على نوع الاشتراك.
 */
export function rateLimiter(request: NextRequest, isPro: boolean): NextResponse | null {
    const ip = getClientIp(request);
    const now = Date.now();
    const limit = isPro ? 300 : 60; // 300 للمحترفين، 60 للمجانيين
    const windowMs = 60 * 1000; // دقيقة واحدة

    const userRate = rateLimitMap.get(ip) ?? { count: 0, lastReset: now };

    if (now - userRate.lastReset > windowMs) {
        userRate.count = 1;
        userRate.lastReset = now;
    } else {
        userRate.count++;
    }

    rateLimitMap.set(ip, userRate);

    if (userRate.count > limit) {
        return NextResponse.json(
            {
                success: false,
                error: "تجاوزت حد الطلبات المسموح به. يرجى الانتظار قليلاً.",
                code: "RATE_LIMIT_EXCEEDED"
            },
            { status: 429 }
        );
    }

    return null;
}
