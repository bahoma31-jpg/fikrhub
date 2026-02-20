// ملف: db/schema/sessions.ts — جداول جلسات العصف الذهني
import { pgTable, text, timestamp, uuid, varchar, index, jsonb } from "drizzle-orm/pg-core";
import { workspaces } from "./workspaces";
import { users } from "./users";

/**
 * @table sessions
 * @description إدارة جلسات العصف الذهني وتقنياتها.
 */
export const sessions = pgTable("sessions", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
    techniqueType: varchar("technique_type", { length: 50 }).notNull(), // classic, brainwriting, etc.
    status: varchar("status", { length: 20 }).default("draft").notNull(), // draft, active, completed
    settings: jsonb("settings").default({}),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    duration: text("duration"), // المدة المستغرقة
    createdBy: uuid("created_by").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    workspaceIdx: index("session_workspace_idx").on(table.workspaceId),
    createdByIdx: index("session_created_by_idx").on(table.createdBy),
    statusIdx: index("session_status_idx").on(table.status),
    techniqueIdx: index("session_technique_idx").on(table.techniqueType),
}));
