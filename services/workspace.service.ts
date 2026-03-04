import { db } from "@/db";
import { workspaces, workspaceMembers, users } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { logger } from "@/lib/logger";

interface CreateWorkspaceInput {
    name: string;
    description?: string;
}

interface UpdateWorkspaceInput {
    name?: string;
    description?: string;
}

export const workspaceService = {
    // 1. الحصول على قائمة workspaces بالـ pagination
    async getAll(userId: string, page: number, limit: number) {
        try {
            const offset = (page - 1) * limit;

            const userWorkspaces = await db
                .select({
                    workspace: workspaces,
                    role: workspaceMembers.role,
                    joinedAt: workspaceMembers.joinedAt,
                })
                .from(workspaceMembers)
                .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
                .where(eq(workspaceMembers.userId, userId))
                .orderBy(desc(workspaces.createdAt))
                .limit(limit)
                .offset(offset);

            const totalResult = await db
                .select({ count: sql<number>`cast(count(*) as integer)` })
                .from(workspaceMembers)
                .where(eq(workspaceMembers.userId, userId));

            const total = totalResult[0]?.count || 0;

            const data = userWorkspaces.map(w => ({
                ...w.workspace,
                role: w.role,
                joinedAt: w.joinedAt,
            }));

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
            logger.error(`خطأ في جلب مساحات العمل للمستخدم ${userId}`, error);
            throw new Error("حدث خطأ أثناء جلب مساحات العمل");
        }
    },

    // 2. الحصول على workspace محدد + أعضاؤه
    async getById(workspaceId: string, userId: string) {
        try {
            // التحقق من صلاحية المستخدم (عضو في مساحة العمل)
            const membership = await db
                .select()
                .from(workspaceMembers)
                .where(
                    and(
                        eq(workspaceMembers.workspaceId, workspaceId),
                        eq(workspaceMembers.userId, userId)
                    )
                )
                .limit(1);

            if (!membership || membership.length === 0) {
                return null;
            }

            const workspace = await db
                .select()
                .from(workspaces)
                .where(eq(workspaces.id, workspaceId))
                .limit(1);

            if (!workspace || workspace.length === 0) {
                return null;
            }

            const members = await db
                .select({
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    role: workspaceMembers.role,
                    joinedAt: workspaceMembers.joinedAt,
                })
                .from(workspaceMembers)
                .innerJoin(users, eq(workspaceMembers.userId, users.id))
                .where(eq(workspaceMembers.workspaceId, workspaceId));

            return {
                ...workspace[0],
                members,
            };
        } catch (error) {
            logger.error(`خطأ في جلب تفاصيل مساحة العمل ${workspaceId}`, error);
            throw new Error("حدث خطأ أثناء جلب تفاصيل مساحة العمل");
        }
    },

    // 3. إنشاء workspace جديد
    async create(data: CreateWorkspaceInput, ownerId: string) {
        try {
            // استخدام transaction لضمان إنشاء مساحة العمل وإضافة المالك معاً
            return await db.transaction(async (tx) => {
                const newWorkspace = await tx
                    .insert(workspaces)
                    .values({
                        name: data.name,
                        description: data.description,
                        ownerId: ownerId,
                    })
                    .returning();

                if (!newWorkspace || newWorkspace.length === 0) {
                    throw new Error("فشل في إنشاء مساحة العمل");
                }

                await tx
                    .insert(workspaceMembers)
                    .values({
                        workspaceId: newWorkspace[0].id,
                        userId: ownerId,
                        role: "owner",
                    });

                return newWorkspace[0];
            });
        } catch (error) {
            logger.error(`خطأ في إنشاء مساحة العمل للمستخدم ${ownerId}`, error);
            throw new Error("حدث خطأ أثناء إنشاء مساحة العمل");
        }
    },

    // 4. تعديل workspace (للمالك فقط)
    async update(workspaceId: string, data: UpdateWorkspaceInput) {
        try {
            const updated = await db
                .update(workspaces)
                .set({
                    ...(data.name && { name: data.name }),
                    ...(data.description !== undefined && { description: data.description }),
                    updatedAt: new Date(),
                })
                .where(eq(workspaces.id, workspaceId))
                .returning();

            if (!updated || updated.length === 0) {
                throw new Error("مساحة العمل غير موجودة");
            }

            return updated[0];
        } catch (error) {
            logger.error(`خطأ في تحديث مساحة العمل ${workspaceId}`, error);
            throw new Error("حدث خطأ أثناء تحديث مساحة العمل");
        }
    },

    // 5. حذف workspace
    async delete(workspaceId: string) {
        try {
            await db
                .delete(workspaces)
                .where(eq(workspaces.id, workspaceId));
        } catch (error) {
            logger.error(`خطأ في حذف مساحة العمل ${workspaceId}`, error);
            throw new Error("حدث خطأ أثناء حذف مساحة العمل");
        }
    },

    // 6. إضافة عضو
    async addMember(workspaceId: string, userId: string, role: string) {
        try {
            const existing = await db
                .select()
                .from(workspaceMembers)
                .where(
                    and(
                        eq(workspaceMembers.workspaceId, workspaceId),
                        eq(workspaceMembers.userId, userId)
                    )
                )
                .limit(1);

            if (existing && existing.length > 0) {
                await db
                    .update(workspaceMembers)
                    .set({ role, joinedAt: new Date() })
                    .where(
                        and(
                            eq(workspaceMembers.workspaceId, workspaceId),
                            eq(workspaceMembers.userId, userId)
                        )
                    );
            } else {
                await db
                    .insert(workspaceMembers)
                    .values({
                        workspaceId,
                        userId,
                        role,
                    });
            }
        } catch (error) {
            logger.error(`خطأ إضافة عضو ${userId} لمساحة ${workspaceId}`, error);
            throw new Error("حدث خطأ أثناء إضافة عضو لمساحة العمل");
        }
    },

    // 7. إزالة عضو
    async removeMember(workspaceId: string, userId: string) {
        try {
            await db
                .delete(workspaceMembers)
                .where(
                    and(
                        eq(workspaceMembers.workspaceId, workspaceId),
                        eq(workspaceMembers.userId, userId)
                    )
                );
        } catch (error) {
            logger.error(`خطأ إزالة عضو ${userId} من مساحة ${workspaceId}`, error);
            throw new Error("حدث خطأ أثناء إزالة عضو من مساحة العمل");
        }
    }
};
