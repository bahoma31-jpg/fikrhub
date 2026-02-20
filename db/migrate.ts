import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./client";

/**
 * @function runMigrations
 * @description تنفيذ هجرات قاعدة البيانات.
 */
async function runMigrations() {
    console.log("🚀 Running migrations...");

    try {
        // يحتاج هذا المسار إلى التأكد من مجلد 'drizzle' الناتج عن drizzle-kit generate
        await migrate(db, { migrationsFolder: "drizzle" });
        console.log("✅ Migrations completed successfully!");
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
}

// لـ Neon/Serverless نفضل استخدام drizzle-kit push في البداية غالباً
// ولكن هذا الملف مطلوب هيكلياً.
// runMigrations();
