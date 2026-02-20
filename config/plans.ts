// ملف: config/plans.ts — خطط الاشتراك والحدود المسموحة
/**
 * @file plans.ts
 * @description التفاصيل الدقيقة لخطط الاشتراك (Freemium Model) وقيود الاستخدام.
 */

export interface PlanFeature {
    name: string;
    included: boolean;
    limit?: number | string;
}

export interface PricingPlan {
    id: "free" | "pro";
    name: string;
    price: number;
    currency: string;
    features: string[];
    limits: {
        maxSessions: number;
        maxIdeasPerSession: number;
        maxWorkspaces: number;
        maxMembersPerWorkspace: number;
        aiGenerationsPerDay: number;
        canExport: boolean;
        allTechniques: boolean;
        semanticSearch: boolean;
    };
}

export const PLANS: Record<string, PricingPlan> = {
    FREE: {
        id: "free",
        name: "الخطة المجانية",
        price: 0,
        currency: "USD",
        features: [
            "مساحة عمل واحدة",
            "3 جلسات عصف ذهني",
            "أدوات AI أساسية",
            "دعم التقنيات الكلاسيكية فقط",
        ],
        limits: {
            maxSessions: 3,
            maxIdeasPerSession: 30,
            maxWorkspaces: 1,
            maxMembersPerWorkspace: 2,
            aiGenerationsPerDay: 5,
            canExport: false,
            allTechniques: false,
            semanticSearch: false,
        }
    },
    PRO: {
        id: "pro",
        name: "الخطة الاحترافية",
        price: 19,
        currency: "USD",
        features: [
            "مساحات عمل غير محدودة",
            "جلسات غير محدودة",
            "بحث دلالي متقدم (Semantic)",
            "تصدير النتائج (PDF/Notes)",
            "شخصيات AI متخصصة",
            "جميع التقنيات الـ 9",
        ],
        limits: {
            maxSessions: 1000,
            maxIdeasPerSession: 200,
            maxWorkspaces: 50,
            maxMembersPerWorkspace: 20,
            aiGenerationsPerDay: 100,
            canExport: true,
            allTechniques: true,
            semanticSearch: true,
        }
    }
};

/**
 * @constant PLAN_LIMITS
 * @description كائن مساعد للتحقق من القيود في Middleware.
 */
export const PLAN_LIMITS = {
    free: PLANS.FREE.limits,
    pro: PLANS.PRO.limits,
};
