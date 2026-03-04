import { db } from "@/db";
import { sessions, ideas, ratings, userStats } from "@/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import { logger } from "@/lib/logger";

interface SessionStats {
    totalIdeas: number;
    averageRating: number | null;
    categoryDistribution: Record<string, number>;
    durationMins: number | null;
    topIdeas: any[];
}

export const statsService = {
    // 1. جلب إحصائيات جلسة معينة
    async getSessionStats(sessionId: string): Promise<SessionStats> {
        try {
            // معلومات الجلسة لحساب المدة
            const sessionResult = await db
                .select()
                .from(sessions)
                .where(eq(sessions.id, sessionId))
                .limit(1);

            const sessionInfo = sessionResult[0];
            let durationMins: number | null = null;
            if (sessionInfo && sessionInfo.startedAt && sessionInfo.completedAt) {
                durationMins = Math.floor(
                    (sessionInfo.completedAt.getTime() - sessionInfo.startedAt.getTime()) / 60000
                );
            }

            // إجمالي الأفكار المرتبطة بالجلسة
            const ideasResult = await db
                .select()
                .from(ideas)
                .where(eq(ideas.sessionId, sessionId));

            const totalIdeas = ideasResult.length;

            // التوزيع بناءً على التصنيف
            const categoryDistribution: Record<string, number> = {};
            for (const idea of ideasResult) {
                const cat = idea.category || "uncategorized";
                categoryDistribution[cat] = (categoryDistribution[cat] || 0) + 1;
            }

            // جلب التقييمات وحساب المتوسط وتحديد أفضل 3 أفكار
            const ideasIds = ideasResult.map(i => i.id);
            let averageRating: number | null = null;
            let topIdeas: any[] = [];

            if (ideasIds.length > 0) {
                const allRatings = await db
                    .select()
                    .from(ratings)
                    .where(sql`${ratings.ideaId} IN (${sql.join(ideasIds, sql`, `)})`);

                if (allRatings.length > 0) {
                    const totalScore = allRatings.reduce((sum, r) => sum + r.score, 0);
                    averageRating = Number((totalScore / allRatings.length).toFixed(1));

                    // تجميع التقييمات لكل فكرة
                    const ideaScores: Record<string, { total: number, count: number }> = {};
                    for (const r of allRatings) {
                        if (!ideaScores[r.ideaId]) ideaScores[r.ideaId] = { total: 0, count: 0 };
                        ideaScores[r.ideaId].total += r.score;
                        ideaScores[r.ideaId].count += 1;
                    }

                    // ترتيب الأفكار حسب متوسط التقيم النسبي
                    const sortedIdeasIds = Object.keys(ideaScores).sort((a, b) => {
                        const avgA = ideaScores[a].total / ideaScores[a].count;
                        const avgB = ideaScores[b].total / ideaScores[b].count;
                        return avgB - avgA;
                    });

                    const top3Ids = sortedIdeasIds.slice(0, 3);

                    topIdeas = ideasResult
                        .filter(i => top3Ids.includes(i.id))
                        .map(i => ({
                            ...i,
                            averageScore: ideaScores[i.id]
                                ? (ideaScores[i.id].total / ideaScores[i.id].count).toFixed(1)
                                : 0
                        }))
                        .sort((a, b) => Number(b.averageScore) - Number(a.averageScore));
                }
            }

            return {
                totalIdeas,
                averageRating,
                categoryDistribution,
                durationMins,
                topIdeas,
            };
        } catch (error) {
            logger.error(`خطأ في جلب إحصائيات الجلسة ${sessionId}`, error);
            throw new Error("حدث خطأ أثناء حساب إحصائيات الجلسة");
        }
    },

    // 2. تحديث إحصائيات المستخدم (الجدول غير المعياري Denormalized)
    async updateUserStats(userId: string): Promise<void> {
        try {
            // جلب كل جلسات المستخدم المنتهية
            const userSessions = await db
                .select()
                .from(sessions)
                .where(and(
                    eq(sessions.createdBy, userId),
                    eq(sessions.status, 'completed')
                ));

            const totalSessions = userSessions.length;

            // حساب التقنية المفضلة (الأكثر استخداماً)
            const techniqueCount: Record<string, number> = {};
            let favoriteTechnique = "classic";
            let maxCount = 0;

            let lastSessionAt: Date | null = null;

            for (const s of userSessions) {
                const tech = s.techniqueType;
                techniqueCount[tech] = (techniqueCount[tech] || 0) + 1;
                if (techniqueCount[tech] > maxCount) {
                    maxCount = techniqueCount[tech];
                    favoriteTechnique = tech;
                }

                if (s.completedAt) {
                    if (!lastSessionAt || s.completedAt > lastSessionAt) {
                        lastSessionAt = s.completedAt;
                    }
                }
            }

            // إجمالي الأفكار التي أنشأها المستخدم
            const userIdeas = await db
                .select({ count: sql<number>`cast(count(*) as integer)` })
                .from(ideas)
                .where(eq(ideas.createdBy, userId));

            const totalIdeas = userIdeas[0]?.count || 0;

            // التحقق من وجود سجل إحصائيات
            const existingStats = await db
                .select()
                .from(userStats)
                .where(eq(userStats.userId, userId))
                .limit(1);

            if (existingStats && existingStats.length > 0) {
                // تحديث السجل
                await db
                    .update(userStats)
                    .set({
                        totalSessions,
                        totalIdeas,
                        favoriteTechnique,
                        lastSessionAt: lastSessionAt || existingStats[0].lastSessionAt,
                        updatedAt: new Date(),
                    })
                    .where(eq(userStats.id, existingStats[0].id));
            } else {
                // إنشاء سجل جديد إن لم يكن موجوداً
                await db
                    .insert(userStats)
                    .values({
                        userId,
                        totalSessions,
                        totalIdeas,
                        totalVotes: 0,
                        favoriteTechnique,
                        lastSessionAt: lastSessionAt || new Date(),
                    });
            }
        } catch (error) {
            logger.error(`خطأ في تحديث إحصائيات المستخدم ${userId}`, error);
            throw new Error("حدث خطأ أثناء تحديث إحصائيات المستخدم");
        }
    },

    // نقطة اتصال مع module الجلسات
    async updateSessionStats(sessionId: string, userId: string): Promise<void> {
        try {
            // تحديث الإحصائيات المجمعة للمستخدم عند انتهاء الجلسة
            await this.updateUserStats(userId);
            logger.info(`تم تحديث إحصائيات المستخدم ${userId} بعد انتهاء الجلسة ${sessionId}`);
        } catch (error) {
            logger.error(`فشل في استدعاء updateUserStats للمستخدم ${userId}`, error);
        }
    }
};
