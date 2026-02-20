// ملف: db/seed.ts — بذر البيانات الأولية
import { db } from "./client";
import { quranVerses, duas, templates } from "./schema";
import { QURAN_VERSES } from "../data/quran-verses";
import { DUAS } from "../data/duas";
import { TECHNIQUES } from "../data/techniques";

async function seed() {
    console.log("🌱 Starting Seeding...");
    try {
        await db.insert(quranVerses).values(QURAN_VERSES);
        await db.insert(duas).values(DUAS);

        const templateValues = TECHNIQUES.map(t => ({
            name: t.name_ar,
            description: t.description_ar,
            techniqueType: t.id,
            structure: { steps: [] },
            isPublic: true,
        }));
        await db.insert(templates).values(templateValues);

        console.log("✅ Seeding Completed!");
    } catch (error) {
        console.error("❌ Seeding Failed:", error);
    }
}

seed();
