// ملف: middleware/api-error-handler.ts — المعالجة المركزية للأخطاء
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { logger } from "@/lib/logger";

/**
 * @interface AppError
 * @description نوع خطأ مخصص يشمل كود الحالة
 */
interface AppError extends Error {
    status?: number;
}

/**
 * @function apiErrorHandler
 * @description معالجة الأخطاء وتحويلها إلى رد ApiResponse موحد.
 */
export function apiErrorHandler(error: unknown): NextResponse {
    // تسجيل الخطأ (في الإنتاج يُستخدم logger متخصص)
    if (error instanceof Error) {
        logger.error("API Error:", error.message);
    }

    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                success: false,
                error: "فشل التحقق من البيانات المرسلة.",
                details: error.issues,
            },
            { status: 400 }
        );
    }

    const appError = error as AppError;
    const statusCode = appError?.status ?? 500;

    return NextResponse.json(
        {
            success: false,
            error: "حدث خطأ غير متوقع في الخادم.",
        },
        { status: statusCode }
    );
}
