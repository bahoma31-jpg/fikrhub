// ملف: config/techniques.config.ts — إعدادات تقنيات العصف الذهني
export const TECHNIQUES_CONFIG = {
    classic: {
        name_ar: "العصف الذهني التقليدي",
        name_en: "Classic Brainstorming",
        description: "توليد أكبر قدر ممكن من الأفكار دون قيود أو نقد أولي.",
        duration: 30,
        min_participants: 1,
    },
    brainwriting: {
        name_ar: "الكتابة الذهنية 6-3-5",
        name_en: "Brainwriting 6-3-5",
        description: "6 أشخاص يكتبون 3 أفكار في 5 دقائق، ثم يتبادلون الأوراق.",
        duration: 45,
        min_participants: 3,
    },
    // يمكن إضافة المزيد لاحقاً
};
