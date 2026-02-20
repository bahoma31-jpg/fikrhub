// ملف: db/schema/ideas.ts — تخزين الأفكار مع دعم pgvector
import { pgTable, text, timestamp, uuid, varchar, boolean, index, customType } from "drizzle-orm/pg-core";
import { users } from "./users";
import { sessions } from "./sessions";

// تعريف نوع مخصص لـ pgvector (1536 أبعاد لـ OpenAI embeddings)
const vector = customType<{ data: number[] }>({
    dataType() {
        return "vector(1536)";
    },
});

/**
 * @table ideas
 * @description الجدول المركزي لتخزين الأفكار الناتجة عن الجلسات مع دعم البحث الدلالي.
 */
export const ideas = pgTable("ideas", {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id").notNull().references(() => sessions.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdBy: uuid("created_by").notNull().references(() => users.id, { onDelete: "cascade" }),
    category: varchar("category", { length: 100 }),
    aiGenerated: boolean("ai_generated").default(false).notNull(),
    embedding: vector("embedding"), // للبحث الدلالي المعتمد على المتجهات
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    sessionIdx: index("idea_session_idx").on(table.sessionId),
    createdByIdx: index("idea_created_by_idx").on(table.createdBy),
    aiGeneratedIdx: index("ai_generated_idx").on(table.aiGenerated),
    // ملاحظة: يُفضل إضافة فهرس IVFFlat أو HNSW عبر هجرة SQL مخصصة لتحسين البحث المتجهي
}));
