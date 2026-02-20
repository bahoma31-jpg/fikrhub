// ملف: db/schema/comments.ts — التعليقات والردود المتداخلة
import { pgTable, text, timestamp, uuid, index, AnyPgColumn } from "drizzle-orm/pg-core";
import { users } from "./users";
import { ideas } from "./ideas";

/**
 * @table comments
 * @description التعليقات على الأفكار مع دعم هيكلية التعليقات المتداخلة (Self-Referential).
 */
export const comments = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id").notNull().references(() => ideas.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    parentId: uuid("parent_id").references((): AnyPgColumn => comments.id, { onDelete: "cascade" }), // علاقة دائرية للردود
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    ideaIdx: index("comment_idea_idx").on(table.ideaId),
    userIdx: index("comment_user_idx").on(table.userId),
    parentIdx: index("comment_parent_idx").on(table.parentId),
}));
