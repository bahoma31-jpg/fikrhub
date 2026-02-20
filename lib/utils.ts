// ملف: lib/utils.ts — دوال مساعدة عامة
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @function cn
 * @description دمج أصناف Tailwind بشكل آمن مع التعامل مع التكرارات.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * @function formatDate
 * @description تنسيق التاريخ للغة العربية.
 */
export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat("ar-SA", {
        dateStyle: "long",
    }).format(new Date(date));
}

/**
 * @function generateId
 * @description إنشاء معرف فريد قصير.
 */
export function generateId(length: number = 10): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
