// ملف: db/schema/templates.ts — قوالب التقنيات
import { pgTable, text, timestamp, uuid, varchar, jsonb, boolean, integer, index } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * @table templates
 * @description قوالب جاهزة لتقنيات العصف الذهني المختلفة.
 */
export const templates = pgTable("templates", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    techniqueType: varchar("technique_type", { length: 50 }).notNull(),
    structure: jsonb("structure").notNull(), // هيكلية القالب (الأقسام، الأسئلة)
    isPublic: boolean("is_public").default(false).notNull(),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    usageCount: integer("usage_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    techniqueIdx: index("template_technique_idx").on(table.techniqueType),
    isPublicIdx: index("is_public_idx").on(table.isPublic),
    createdByIdx: index("template_created_by_idx").on(table.createdBy),
    usageCountIdx: index("usage_count_idx").on(table.usageCount),
}));
