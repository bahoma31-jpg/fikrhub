// ملف: db/seed.ts — بذر البيانات الأولية والشاملة للمشروع
import { db } from "./client";
import { quranVerses, duas, templates, users, workspaces, workspaceMembers, userStats } from "./schema";
import { QURAN_VERSES } from "../data/quran-verses";
import { DUAS } from "../data/duas";
import { TEMPLATES_DATA } from "../data/templates";

/**
 * @function seed
 * @description عملية بذر البيانات الأولية لتجهيز بيئة التطوير.
 */
async function seed() {
    console.log("🌱 Starting Seeding Process...");

    try {
        // 1. بذر المحتوى الإسلامي
        console.log("📖 Seeding Quran Verses (" + QURAN_VERSES.length + ")...");
        await db.insert(quranVerses).values(QURAN_VERSES);

        console.log("🙏 Seeding Duas (" + DUAS.length + ")...");
        await db.insert(duas).values(DUAS);

        // 2. بذر قوالب التقنيات
        console.log("📝 Seeding Templates (" + TEMPLATES_DATA.length + ")...");
        await db.insert(templates).values(
            TEMPLATES_DATA.map((tpl) => ({
                name: tpl.name,
                description: tpl.description,
                techniqueType: tpl.techniqueType,
                structure: tpl.structure,
                isPublic: true,
            }))
        );

        // 3. إنشاء مستخدم تجريبي (Admin)
        console.log("👤 Creating Test Admin...");
        const [admin] = await db.insert(users).values({
            name: "Admin FikrHub",
            email: "admin@fikrhub.dev",
            role: "admin",
            emailVerified: new Date(),
        }).returning();

        // 4. إنشاء مساحة عمل تجريبية
        console.log("🏢 Creating Test Workspace...");
        const [workspace] = await db.insert(workspaces).values({
            name: "مجموعة الابتكار الأولى",
            description: "مساحة عمل مخصصة لتجربة تقنيات العصف الذهني.",
            ownerId: admin.id,
        }).returning();

        // 5. إضافة العضوية وتهيئة الإحصائيات
        await db.insert(workspaceMembers).values({
            workspaceId: workspace.id,
            userId: admin.id,
            role: "owner",
        });

        await db.insert(userStats).values({
            userId: admin.id,
            totalSessions: 0,
            totalIdeas: 0,
            totalVotes: 0,
        });

        console.log("✅ Seeding Completed Successfully!");
    } catch (error) {
        console.error("❌ Seeding Failed:", error);
        process.exit(1);
    }
}

seed();
