import { QuranVerse, quranVerses } from "@/data/quran-verses";
import { Dua, duas } from "@/data/duas";

/**
 * الحصول على آية عشوائية (مع إمكانية تحديد السياق)
 */
export function getRandomVerse(context?: QuranVerse['context']): QuranVerse {
    const filtered = context
        ? quranVerses.filter(v => v.context === context)
        : quranVerses;

    if (filtered.length === 0) {
        // Fallback in case of wrong context
        return quranVerses[Math.floor(Math.random() * quranVerses.length)];
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}

/**
 * الحصول على دعاء عشوائي حسب السياق
 */
export function getDuaByContext(context: Dua['context']): Dua {
    const filtered = duas.filter(d => d.context === context);

    if (filtered.length === 0) {
        // Fallback logic
        return duas[Math.floor(Math.random() * duas.length)];
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}
