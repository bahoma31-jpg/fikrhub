// ملف: db/schema/ratings.ts — تقييمات الأفكار
import { pgTable, timestamp, uuid, integer, varchar, unique, index } from "drizzle-orm/pg-core";
import { users } from "./users";
import { ideas } from "./ideas";

/**
 * @table ratings
 * @description تقييمات الأفكار بناءً على معايير محددة (الأصالة، الجدوى).
 */
export const ratings = pgTable("ratings", {
    id: uuid("id").primaryKey().defaultRandom(),
    ideaId: uuid("idea_id").notNull().references(() => ideas.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    score: integer("score").notNull(), // من 1 إلى 5
    criteria: varchar("criteria", { length: 50 }).notNull(), // originality, feasibility
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
    ideaIdx: index("rating_idea_idx").on(table.ideaId),
    userIdx: index("rating_user_idx").on(table.userId),
    // منع التصويت المكرر من نفس المستخدم لنفس الفكرة وبنفس المعيار (Composite Unique Index)
    uniqueIdeaUserCriteria: unique("unique_idea_user_criteria").on(table.ideaId, table.userId, table.criteria),
}));
