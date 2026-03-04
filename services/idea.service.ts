import { db } from "@/db";
import { ideas, ratings, comments, sessions } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { logger } from "@/lib/logger";

interface CreateIdeaInput {
    sessionId: string;
    content: string;
    category?: string;
    aiGenerated?: boolean;
}

interface UpdateIdeaInput {
    content?: string;
    category?: string;
}

export const ideaService = {
    // 1. جلب الأفكار التابعة لجلسة معينة
    async getBySession(sessionId: string, page: number, limit: number) {
        try {
            const offset = (page - 1) * limit;

            const sessionIdeas = await db
                .select()
                .from(ideas)
                .where(eq(ideas.sessionId, sessionId))
                .orderBy(desc(ideas.createdAt))
                .limit(limit)
                .offset(offset);

            const totalResult = await db
                .select({ count: sql<number>`cast(count(*) as integer)` })
                .from(ideas)
                .where(eq(ideas.sessionId, sessionId));

            const total = totalResult[0]?.count || 0;

            return {
                data: sessionIdeas,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                }
            };
        } catch (error) {
            logger.error(`خطأ في جلب الأفكار للجلسة ${sessionId}`, error);
            throw new Error("حدث خطأ أثناء جلب الأفكار");
        }
    },

    // 2. تجميع الأفكار حسب الفئة (category)
    async groupByCategory(sessionId: string) {
        try {
            const allIdeas = await db
                .select()
                .from(ideas)
                .where(eq(ideas.sessionId, sessionId))
                .orderBy(desc(ideas.createdAt));

            // تجميع الأفكار باستخدام JavaScript لسهولة تنسيق المخرجات
            const grouped: Record<string, typeof allIdeas> = {};

            for (const idea of allIdeas) {
                const cat = idea.category || "uncategorized";
                if (!grouped[cat]) {
                    grouped[cat] = [];
                }
                grouped[cat].push(idea);
            }

            return grouped;
        } catch (error) {
            logger.error(`خطأ في تجميع الأفكار للجلسة ${sessionId}`, error);
            throw new Error("حدث خطأ أثناء تجميع الأفكار");
        }
    },

    // 3. إنشاء فكرة جديدة
    async create(data: CreateIdeaInput, authorId: string) {
        try {
            // Check if session exists and user has access? 
            // Often we rely on the route to check auth properly or check it here
            const session = await db
                .select()
                .from(sessions)
                .where(eq(sessions.id, data.sessionId))
                .limit(1);

            if (!session || session.length === 0) {
                throw new Error("الجلسة غير موجودة");
            }

            // TODO: can add a check if user is a member of the workspace of this session

            const newIdea = await db
                .insert(ideas)
                .values({
                    sessionId: data.sessionId,
                    content: data.content,
                    category: data.category,
                    createdBy: authorId,
                    aiGenerated: data.aiGenerated || false,
                })
                .returning();

            return newIdea[0];
        } catch (error) {
            logger.error(`خطأ في إنشاء فكرة للمستخدم ${authorId}`, error);
            if (error instanceof Error) throw error;
            throw new Error("حدث خطأ أثناء إنشاء الفكرة");
        }
    },

    // 4. تحديث فكرة
    async update(ideaId: string, data: UpdateIdeaInput) {
        try {
            const updated = await db
                .update(ideas)
                .set({
                    ...(data.content && { content: data.content }),
                    ...(data.category !== undefined && { category: data.category }),
                    updatedAt: new Date(),
                })
                .where(eq(ideas.id, ideaId))
                .returning();

            if (!updated || updated.length === 0) {
                throw new Error("الفكرة غير موجودة");
            }

            return updated[0];
        } catch (error) {
            logger.error(`خطأ في تحديث الفكرة ${ideaId}`, error);
            throw new Error("حدث خطأ أثناء تحديث الفكرة");
        }
    },

    // 5. حذف فكرة
    async delete(ideaId: string) {
        try {
            // Delete directly based on schema (cascade config will handle related ratings/comments)
            await db
                .delete(ideas)
                .where(eq(ideas.id, ideaId));
        } catch (error) {
            logger.error(`خطأ في حذف الفكرة ${ideaId}`, error);
            throw new Error("حدث خطأ أثناء حذف الفكرة");
        }
    },

    // 6. تقييم ఫكرة (Upsert)
    async rate(ideaId: string, userId: string, score: number, criteria: string) {
        try {
            const existing = await db
                .select()
                .from(ratings)
                .where(
                    and(
                        eq(ratings.ideaId, ideaId),
                        eq(ratings.userId, userId),
                        eq(ratings.criteria, criteria)
                    )
                )
                .limit(1);

            if (existing && existing.length > 0) {
                const updated = await db
                    .update(ratings)
                    .set({ score })
                    .where(eq(ratings.id, existing[0].id))
                    .returning();
                return updated[0];
            } else {
                const inserted = await db
                    .insert(ratings)
                    .values({
                        ideaId,
                        userId,
                        score,
                        criteria,
                    })
                    .returning();
                return inserted[0];
            }
        } catch (error) {
            logger.error(`خطأ في تقييم الفكرة ${ideaId}`, error);
            throw new Error("حدث خطأ أثناء تقييم الفكرة");
        }
    },

    // 7. جلب تعليقات فكرة
    async getComments(ideaId: string) {
        try {
            const ideaComments = await db
                .select()
                .from(comments)
                .where(eq(comments.ideaId, ideaId))
                .orderBy(desc(comments.createdAt));

            return ideaComments;
        } catch (error) {
            logger.error(`خطأ في جلب تعليقات الفكرة ${ideaId}`, error);
            throw new Error("حدث خطأ أثناء جلب التعليقات");
        }
    },

    // 8. إضافة تعليق
    async addComment(ideaId: string, userId: string, content: string, parentId?: string) {
        try {
            const newComment = await db
                .insert(comments)
                .values({
                    ideaId,
                    userId,
                    content,
                    parentId,
                })
                .returning();

            return newComment[0];
        } catch (error) {
            logger.error(`خطأ في إضافة تعليق للفكرة ${ideaId}`, error);
            throw new Error("حدث خطأ أثناء إضافة التعليق");
        }
    },

    // دالة لاسترجاع الفكرة للاستخدام في التحقق من الملكية
    async getById(ideaId: string) {
        try {
            const idea = await db
                .select()
                .from(ideas)
                .where(eq(ideas.id, ideaId))
                .limit(1);

            return idea[0] || null;
        } catch (error) {
            logger.error(`خطأ في جلب الفكرة ${ideaId}`, error);
            throw new Error("حدث خطأ أثناء جلب الفكرة");
        }
    }
};
