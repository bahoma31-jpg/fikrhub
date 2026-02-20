// ملف: types/api.types.ts — هيكلية رد الـ API الموحدة
/**
 * @interface ApiResponse
 * @description التنسيق الموحد لكافة ردود الـ API في المشروع.
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    details?: any;
}

export type PaginatedResponse<T> = ApiResponse<{
    items: T[];
    total: number;
    page: number;
    limit: number;
}>;
