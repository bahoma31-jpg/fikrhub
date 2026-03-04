import { db } from "@/db";
import { sessions, workspaceMembers } from "@/db/schema";
import { eq, and, desc, sql, ne } from "drizzle-orm";
import { logger } from "@/lib/logger";
import { statsService } from "./stats.service";

interface SessionFilters {
    technique?: string;
    status?: string;
    workspaceId?: string;
}

interface CreateSessionInput {
    title: string;
    workspaceId: string;
    techniqueType: string;
    settings?: Record<string, unknown>;
}

interface UpdateSessionInput {
    title?: string;
    settings?: Record<string, unknown>;
}

export const sessionService = {
    async getAll(userId: string, filters: SessionFilters, page: number, limit: number) {
        try {
            const offset = (page - 1) * limit;

            // جلب الجلسات التي يملك المستخدم صلاحية الوصول إليها عبر عضويته في مساحة العمل
            const conditions = [
                eq(workspaceMembers.userId, userId),
                ne(sessions.status, 'archived') // إخفاء الجلسات المحذوفة ناعماً افتراضياً
            ];

            if (filters.technique) conditions.push(eq(sessions.techniqueType, filters.technique));
            if (filters.status) {
                // استبدال شرط الإخفاء إذا كان الفلتر يطلب المحذوفة تحديداً
                conditions[1] = eq(sessions.status, filters.status);
            }
            if (filters.workspaceId) conditions.push(eq(sessions.workspaceId, filters.workspaceId));

            const queryConditions = and(...conditions);

            const userSessions = await db
                .select({ session: sessions })
                .from(sessions)
                .innerJoin(workspaceMembers, eq(sessions.workspaceId, workspaceMembers.workspaceId))
                .where(queryConditions)
                .orderBy(desc(sessions.createdAt))
                .limit(limit)
                .offset(offset);

            const totalResult = await db
                .select({ count: sql<number>`cast(count(*) as integer)` })
                .from(sessions)
                .innerJoin(workspaceMembers, eq(sessions.workspaceId, workspaceMembers.workspaceId))
                .where(queryConditions);

            const total = totalResult[0]?.count || 0;
            const data = userSessions.map(s => s.session);

            return {
                data,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                }
            };
        } catch (error) {
            logger.error(`خطأ في جلب جلسات المستخدم ${userId}`, error);
            throw new Error("حدث خطأ أثناء جلب الجلسات");
        }
    },

    async getById(sessionId: string) {
        try {
            const session = await db
                .select()
                .from(sessions)
                .where(eq(sessions.id, sessionId))
                .limit(1);

            return session[0] || null;
        } catch (error) {
            logger.error(`خطأ في جلب الجلسة ${sessionId}`, error);
            throw new Error("حدث خطأ أثناء جلب الجلسة");
        }
    },

    async getByTechnique(technique: string, userId: string) {
        try {
            const result = await db
                .select({ session: sessions })
                .from(sessions)
                .innerJoin(workspaceMembers, eq(sessions.workspaceId, workspaceMembers.workspaceId))
                .where(
                    and(
                        eq(workspaceMembers.userId, userId),
                        eq(sessions.techniqueType, technique),
                        ne(sessions.status, 'archived')
                    )
                )
                .orderBy(desc(sessions.updatedAt));

            return result.map(s => s.session);
        } catch (error) {
            logger.error(`خطأ في جلب جلسات بتقنية ${technique}`, error);
            throw new Error("حدث خطأ أثناء جلب جلسات التقنية");
        }
    },

    async create(data: CreateSessionInput, ownerId: string) {
        try {
            // Check if user is in workspace first
            const membership = await db
                .select()
                .from(workspaceMembers)
                .where(
                    and(
                        eq(workspaceMembers.workspaceId, data.workspaceId),
                        eq(workspaceMembers.userId, ownerId)
                    )
                )
                .limit(1);

            if (!membership || membership.length === 0) {
                throw new Error("غير مصرح لك بإنشاء جلسة في مساحة العمل هذه");
            }

            const newSession = await db
                .insert(sessions)
                .values({
                    title: data.title,
                    workspaceId: data.workspaceId,
                    techniqueType: data.techniqueType,
                    settings: data.settings || {},
                    createdBy: ownerId,
                    status: 'draft',
                })
                .returning();

            return newSession[0];
        } catch (error) {
            logger.error(`خطأ في إنشاء جلسة لصالح ${ownerId}`, error);
            if (error instanceof Error) throw error;
            throw new Error("حدث خطأ أثناء إنشاء الجلسة");
        }
    },

    async update(sessionId: string, data: UpdateSessionInput) {
        try {
            const updated = await db
                .update(sessions)
                .set({
                    ...(data.title && { title: data.title }),
                    ...(data.settings !== undefined && { settings: data.settings }),
                    updatedAt: new Date(),
                })
                .where(eq(sessions.id, sessionId))
                .returning();

            if (!updated || updated.length === 0) {
                throw new Error("الجلسة غير موجودة");
            }

            return updated[0];
        } catch (error) {
            logger.error(`خطأ في تحديث الجلسة ${sessionId}`, error);
            throw new Error("حدث خطأ أثناء تحديث الجلسة");
        }
    },

    async start(sessionId: string) {
        try {
            const session = await db
                .select()
                .from(sessions)
                .where(eq(sessions.id, sessionId))
                .limit(1);

            if (!session || session.length === 0) {
                throw new Error("الجلسة غير موجودة");
            }

            if (session[0].status !== 'draft') {
                throw new Error("لا يمكن بدء الجلسة إلا إذا كانت في حالة draft");
            }

            const activeSession = await db
                .update(sessions)
                .set({
                    status: 'active',
                    startedAt: new Date(),
                    updatedAt: new Date(),
                })
                .where(eq(sessions.id, sessionId))
                .returning();

            return activeSession[0];
        } catch (error) {
            logger.error(`خطأ في بدء الجلسة ${sessionId}`, error);
            if (error instanceof Error) throw error;
            throw new Error("حدث خطأ أثناء بدء الجلسة");
        }
    },

    async complete(sessionId: string, userId: string) {
        try {
            const session = await db
                .select()
                .from(sessions)
                .where(eq(sessions.id, sessionId))
                .limit(1);

            if (!session || session.length === 0) {
                throw new Error("الجلسة غير موجودة");
            }

            if (session[0].status !== 'active') {
                throw new Error("لا يمكن إنهاء الجلسة إلا إذا كانت active");
            }

            const now = new Date();
            const startedAt = session[0].startedAt || now;
            const durationMs = now.getTime() - startedAt.getTime();
            const durationMins = Math.floor(durationMs / 60000);

            const completedSession = await db
                .update(sessions)
                .set({
                    status: 'completed',
                    completedAt: now,
                    duration: `${durationMins}m`,
                    updatedAt: now,
                })
                .where(eq(sessions.id, sessionId))
                .returning();

            // يُشغّل stats calculation
            await statsService.updateSessionStats(sessionId, userId);

            return completedSession[0];
        } catch (error) {
            logger.error(`خطأ في إنهاء الجلسة ${sessionId}`, error);
            if (error instanceof Error) throw error;
            throw new Error("حدث خطأ أثناء إنهاء الجلسة");
        }
    },

    async delete(sessionId: string) {
        try {
            // Soft delete: status = 'archived'
            await db
                .update(sessions)
                .set({
                    status: 'archived',
                    updatedAt: new Date(),
                })
                .where(eq(sessions.id, sessionId));
        } catch (error) {
            logger.error(`خطأ في أرشفة الجلسة ${sessionId}`, error);
            throw new Error("حدث خطأ أثناء حذف الجلسة");
        }
    }
};
