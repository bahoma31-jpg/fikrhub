// ملف: lib/logger.ts
// الوصف: مسجل أخطاء مخصص (Custom Logger)

export const logger = {
    info(message: string, ...args: unknown[]) {
        if (process.env.NODE_ENV !== "production") {
            console.log(`[INFO]: ${message}`, ...args);
        }
    },
    warn(message: string, ...args: unknown[]) {
        if (process.env.NODE_ENV !== "production") {
            console.warn(`[WARN]: ${message}`, ...args);
        }
    },
    error(message: string, ...args: unknown[]) {
        // في بيئة الإنتاج يمكن توجيه الأخطاء إلى خدمة خارجية مثل Sentry
        if (process.env.NODE_ENV !== "production") {
            console.error(`[ERROR]: ${message}`, ...args);
        } else {
            // تسجيل أبسط في الإنتاج أو إرسال لخدمة خارجية
            console.error(message);
        }
    },
    critical(message: string, ...args: unknown[]) {
        console.error(`[CRITICAL]: ${message}`, ...args);
    }
};
