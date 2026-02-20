// ملف: middleware/api-error-handler.ts — المعالجة المركزية للأخطاء
import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * @function apiErrorHandler
 * @description معالجة الأخطاء وتحويلها إلى رد ApiResponse موحد.
 */
export function apiErrorHandler(error: any) {
    console.error("API Error:", error);

    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                success: false,
                error: "فشل التحقق من البيانات المرسلة.",
                details: error.errors,
            },
            { status: 400 }
        );
    }

    return NextResponse.json(
        {
            success: false,
            error: "حدث خطأ غير متوقع في الخادم.",
        },
        { status: error.status || 500 }
    );
}
