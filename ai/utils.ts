// ملف: ai/utils.ts
// الوصف: أدوات مساعدة للتعامل مع النصوص وحساب التوكنز

/**
 * حساب تقريبي لعدد التوكنز في النص
 * @param text النص المراد حساب طوله
 * @returns عدد التوكنز التقريبي
 */
export function getTokenCount(text: string): number {
    if (!text) return 0;
    // تقدير تقريبي: 1 توكن = 4 حروف تقريباً
    return Math.ceil(text.length / 4);
}

/**
 * تنظيف المدخلات من الرموز لتجنب أية مشاكل في المعالجة
 * @param input النص المدخل
 * @returns نص نظيف
 */
export function sanitizeInput(input: string): string {
    if (!input) return "";
    return input.trim();
}

/**
 * تقليص النص ليتناسب مع الحد الأقصى للتوكنز
 * @param text النص الأصلي
 * @param maxTokens الحد الأقصى المسموح به (الافتراضي 2000)
 * @returns النص المقتطع
 */
export function truncateToTokenLimit(text: string, maxTokens: number = 2000): string {
    const estimatedTokens = getTokenCount(text);
    if (estimatedTokens <= maxTokens) {
        return text;
    }
    const maxChars = maxTokens * 4;
    return text.substring(0, maxChars) + "...";
}

/**
 * التحقق من صحة الاستجابة
 * @param response الاستجابة المستلمة
 * @returns صحيحة أم لا
 */
export function validateResponse(response: string): boolean {
    return typeof response === "string" && response.trim().length > 0;
}
