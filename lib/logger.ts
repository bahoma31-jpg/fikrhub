// ملف: lib/logger.ts — مسجل الأخطاء المخصص
// لتفادي استخدام console.log في الإنتاج حسب القواعد.

type LogLevel = "info" | "warn" | "error" | "debug";

/**
 * @class Logger
 * @description مدير تسجيل الأحداث والأخطاء. في بيئة التطوير يعرض في الكونسول، وفي الإنتاج يمكن ربطه بخدمة خارجية.
 */
class Logger {
    private formatMessage(level: LogLevel, message: string, meta?: any) {
        return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message} ${meta ? JSON.stringify(meta) : ""}`;
    }

    info(message: string, meta?: any) {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.info(this.formatMessage("info", message, meta));
        }
    }

    warn(message: string, meta?: any) {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn(this.formatMessage("warn", message, meta));
        }
    }

    error(message: string, error?: any) {
        // الأخطاء تسجل دائماً (ممكن مستقبلاً ربطها بـ Sentry أو بملف log)
        // eslint-disable-next-line no-console
        console.error(this.formatMessage("error", message), error || "");
    }

    debug(message: string, meta?: any) {
        if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.debug(this.formatMessage("debug", message, meta));
        }
    }
}

export const logger = new Logger();
