import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// مخزن بسيط للتحكم في معدل الطلبات (في الإنتاج يفضل استخدام Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

/**
 * @function rateLimiter
 * @description تحديد عدد الطلبات لكل مستخدم بناءً على نوع الاشتراك.
 */
export function rateLimiter(request: NextRequest, isPro: boolean) {
    const ip = request.ip ?? "127.0.0.1";
    const now = Date.now();
    const limit = isPro ? 300 : 60; // 300 للمحترفين، 60 للمجانيين
    const windowMs = 60 * 1000; // دقيقة واحدة

    const userRate = rateLimitMap.get(ip) || { count: 0, lastReset: now };

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
