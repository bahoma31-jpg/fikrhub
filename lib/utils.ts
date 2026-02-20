// ملف: lib/utils.ts — دوال مساعدة عامة للمشروع
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @function cn
 * @description دمج أصناف Tailwind بشكل آمن مع التعامل مع التكرارات وتضارب الفئات.
 * @param inputs - قائمة فئات CSS أو كائنات شرطية.
 * @returns سلسلة نصية مدمجة ونظيفة.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * @function formatDate
 * @description تنسيق التاريخ للغة العربية بتنسيق طويل (مثال: 20 فبراير 2026).
 * @param date - كائن التاريخ أو سلسلة نصية تمثل التاريخ.
 * @returns تاريخ منسق بالعربية أو النص الأصلي في حال الفشل.
 */
export function formatDate(date: Date | string | number): string {
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return String(date);

        return new Intl.DateTimeFormat("ar-SA", {
            dateStyle: "long",
        }).format(d);
    } catch (error) {
        // نكتفي بإرجاع القيمة الأصلية بدلاً من كسر الواجهة
        return String(date);
    }
}

/**
 * @function truncate
 * @description تقصير النص الطويل وإضافة "..." للنهاية.
 * @param str - النص المراد تقصيره.
 * @param length - الحد الأقصى لطول النص.
 * @returns النص المقصر.
 */
export function truncate(str: string, length: number): string {
    if (!str) return "";
    return str.length > length ? str.substring(0, length) + "..." : str;
}

/**
 * @function generateId
 * @description إنشاء معرف فريد عشوائي (يستخدم للمفاتيح المؤقتة في الـ UI).
 * @param length - طول المعرف المطلوب.
 * @returns معرف نصي عشوائي.
 */
export function generateId(length: number = 10): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        result += chars.charAt(randomValues[i] % chars.length);
    }
    return result;
}

/**
 * @function absoluteUrl
 * @description تحويل المسارات النسبية إلى روابط كاملة.
 * @param path - المسار النسبي (مثلاً: /dashboard).
 * @returns الرابط الكامل.
 */
export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${path}`;
}
