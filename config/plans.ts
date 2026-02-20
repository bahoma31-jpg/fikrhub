// ملف: config/plans.ts — خطط الاشتراك
export const PLANS = {
    FREE: {
        id: "free",
        name: "الخطة المجانية",
        price: 0,
        features: ["مساحة عمل واحدة", "3 جلسات تفكير", "تحليل أساسي AI"],
    },
    PRO: {
        id: "pro",
        name: "الخطة الاحترافية",
        price: 49,
        features: ["مساحات غير محدودة", "جلسات غير محدودة", "تحليل عميق AI", "بحث دلالي"],
    }
};
