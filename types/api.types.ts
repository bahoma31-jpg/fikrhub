// ملف: types/api.types.ts — هيكلية رد الـ API والتحقق
/**
 * @interface ApiResponse
 * @description التنسيق الموحد لكافة ردود الـ API في المشروع لضمان اتساق التعامل مع الواجهة الأمامية.
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    code?: string; // رمز الخطأ لسهولة المعالجة (مثلاً: NOT_FOUND)
    details?: Record<string, unknown>; // تفاصيل إضافية خاصة بالأخطاء مثل أخطاء التحقق من Zod
}

/**
 * @interface PaginatedResponse
 * @description هيكلية الرد للبيانات التي تدعم الصفحات.
 */
export interface PaginatedResponse<T> {
    success: boolean;
    data: {
        items: T[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
    error?: string;
}

/**
 * @type ApiError
 * @description تعريف نوع الخطأ الموحد.
 */
export type ApiError = {
    message: string;
    status: number;
    code?: string;
};
