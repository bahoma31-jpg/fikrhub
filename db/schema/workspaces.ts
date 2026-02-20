// ملف: db/schema/workspaces.ts — إدارة مساحات العمل والأعضاء
import { pgTable, text, timestamp, uuid, varchar, index, unique } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * @table workspaces
 * @description تعريف مساحات العمل التي ينتمي إليها المستخدمون.
 */
export const workspaces = pgTable("workspaces", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    ownerId: uuid("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
    ownerIdx: index("owner_idx").on(table.ownerId),
}));

/**
 * @table workspace_members
 * @description الربط بين المستخدمين ومساحات العمل (Many-to-Many).
 */
export const workspaceMembers = pgTable("workspace_members", {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 20 }).default("member").notNull(), // owner, member, viewer
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => ({
    workspaceUserUnique: unique("workspace_user_unique").on(table.workspaceId, table.userId),
    workspaceIdx: index("workspace_idx").on(table.workspaceId),
    userMemberIdx: index("user_member_idx").on(table.userId),
}));
