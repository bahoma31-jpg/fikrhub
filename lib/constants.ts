// ملف: lib/constants.ts — الثوابت والقيود
/**
 * @file constants.ts
 * @description الثوابت الأساسية والقيود الخاصة بالتطبيق.
 */

export const APP_CONFIG = {
    name: "FikrHub",
    description: "منصة العصف الذهني المتقدم المدعومة بالذكاء الاصطناعي",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const LIMITS = {
    FREE_SESSION_LIMIT: 3,
    MAX_IDEAS_PER_SESSION: 50,
    MAX_WORKSPACES_FREE: 1,
};

export const TECHNIQUES_LIST = [
    { id: "classic", name_ar: "العصف الذهني الكلاسيكي", name_en: "Classic Brainstorming" },
    { id: "brainwriting", name_ar: "الكتابة الذهنية (Brainwriting)", name_en: "Brainwriting" },
    { id: "reverse", name_ar: "العصف الذهني العكسي", name_en: "Reverse Brainstorming" },
    { id: "scamper", name_ar: "تقنية SCAMPER", name_en: "SCAMPER" },
    { id: "six_hats", name_ar: "القبعات الست للتفكير", name_en: "Six Thinking Hats" },
    { id: "swot", name_ar: "تحليل SWOT", name_en: "SWOT Analysis" },
];
