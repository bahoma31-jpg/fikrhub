// ملف: db/schema/relations.ts — تعريف العلاقات بين الجداول
import { relations } from "drizzle-orm";
import { users } from "./users";
import { workspaces, workspaceMembers } from "./workspaces";
import { ideas } from "./ideas";
import { ratings } from "./ratings";
import { comments } from "./comments";
import { sessions } from "./sessions";
import { subscriptions } from "./subscriptions";
import { userStats } from "./user-stats";
import { accounts, authSessions } from "./auth";
import { templates } from "./templates";

/**
 * @file relations.ts
 * @description تعريف العلاقات المركزية لضمان تكامل البيانات وتسهيل الاستعلامات المعقدة.
 */

export const usersRelations = relations(users, ({ one, many }) => ({
    workspaces: many(workspaces),
    workspaceMembers: many(workspaceMembers),
    ideas: many(ideas),
    sessions: many(sessions),
    subscription: one(subscriptions, { fields: [users.id], references: [subscriptions.userId] }),
    stats: one(userStats, { fields: [users.id], references: [userStats.userId] }),
    accounts: many(accounts),
    authSessions: many(authSessions),
    createdTemplates: many(templates),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
    owner: one(users, { fields: [workspaces.ownerId], references: [users.id] }),
    members: many(workspaceMembers),
    sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
    workspace: one(workspaces, { fields: [sessions.workspaceId], references: [workspaces.id] }),
    creator: one(users, { fields: [sessions.createdBy], references: [users.id] }),
    ideas: many(ideas),
}));

export const ideasRelations = relations(ideas, ({ one, many }) => ({
    session: one(sessions, { fields: [ideas.sessionId], references: [sessions.id] }),
    creator: one(users, { fields: [ideas.createdBy], references: [users.id] }),
    ratings: many(ratings),
    comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
    user: one(users, { fields: [comments.userId], references: [users.id] }),
    idea: one(ideas, { fields: [comments.ideaId], references: [ideas.id] }),
    parent: one(comments, { fields: [comments.parentId], references: [comments.id], relationName: "nested_comments" }),
    replies: many(comments, { relationName: "nested_comments" }),
}));
