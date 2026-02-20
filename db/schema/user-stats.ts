// ملف: db/schema/user-stats.ts — إحصائيات مجمعة للأداء
import { pgTable, timestamp, uuid, integer, varchar, unique } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * @table user_stats
 * @description جدول غير معياري (Denormalized) لتخزين الإحصائيات المجمعة للمستخدم لتحسين سرعة لوحة التحكم.
 */
export const userStats = pgTable("user_stats", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    totalSessions: integer("total_sessions").default(0).notNull(),
    totalIdeas: integer("total_ideas").default(0).notNull(),
    totalVotes: integer("total_votes").default(0).notNull(),
    favoriteTechnique: varchar("favorite_technique", { length: 50 }),
    lastSessionAt: timestamp("last_session_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    userUnique: unique("stats_user_unique").on(table.userId),
}));
