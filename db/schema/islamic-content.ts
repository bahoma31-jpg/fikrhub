// ملف: db/schema/islamic-content.ts — الآيات القرآنية والأدعية
import { pgTable, text, timestamp, uuid, integer, varchar, index } from "drizzle-orm/pg-core";

/**
 * @table quran_verses
 * @description جدول تخزين الآيات القرآنية للاقتباس والتدعيم النفسي والفكري.
 */
export const quranVerses = pgTable("quran_verses", {
    id: uuid("id").primaryKey().defaultRandom(),
    surahNumber: integer("surah_number").notNull(),
    verseNumber: integer("verse_number").notNull(),
    arabicText: text("arabic_text").notNull(),
    translation: text("translation"),
    context: varchar("context", { length: 255 }), // مثال: motivation, patience, success
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    contextIdx: index("quran_context_idx").on(table.context),
}));

/**
 * @table duas
 * @description جدول تخزين الأدعية المأثورة المُلهمة.
 */
export const duas = pgTable("duas", {
    id: uuid("id").primaryKey().defaultRandom(),
    arabicText: text("arabic_text").notNull(),
    translation: text("translation"),
    context: varchar("context", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    contextIdx: index("dua_context_idx").on(table.context),
}));
