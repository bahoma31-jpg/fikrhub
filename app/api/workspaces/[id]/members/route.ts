import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { workspaceService } from "@/services/workspace.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { addMemberSchema } from "@/lib/validations";
import { verifyOwnership } from "@/lib/ownership";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(
    req: NextRequest,
    props: RouteParams
) {
    const { id } = await Promise.resolve(props.params);

    try {
        const session = await auth();
        if (!session?.user?.id) {
            return errorResponse("غير مصرح", 401);
        }

        const workspace = await workspaceService.getById(id, session.user.id);
        if (!workspace) {
            return errorResponse("مساحة العمل غير موجودة", 404);
        }

        const isOwner = await verifyOwnership(workspace.ownerId, session.user.id);
        if (!isOwner) {
            return errorResponse("غير مصرح لك بإضافة أعضاء", 403);
        }

        const body = await req.json();
        const parsed = addMemberSchema.parse(body);

        // Find user by email
        const userToAdd = await db.query.users.findFirst({
            where: eq(users.email, parsed.email),
        });

        if (!userToAdd) {
            return errorResponse("المستخدم بالبريد الإلكتروني المحدد غير موجود", 404);
        }

        await workspaceService.addMember(id, userToAdd.id, parsed.role);

        return successResponse({ success: true, message: "تمت إضافة العضو بنجاح" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        logger.error(`POST /api/workspaces/${id}/members error`, error);
        return errorResponse("حدث خطأ أثناء إضافة العضو", 500);
    }
}

export async function DELETE(
    req: NextRequest,
    props: RouteParams
) {
    const { id } = await Promise.resolve(props.params);

    try {
        const session = await auth();
        if (!session?.user?.id) {
            return errorResponse("غير مصرح", 401);
        }

        const workspace = await workspaceService.getById(id, session.user.id);
        if (!workspace) {
            return errorResponse("مساحة العمل غير موجودة", 404);
        }

        const isOwner = await verifyOwnership(workspace.ownerId, session.user.id);
        if (!isOwner) {
            return errorResponse("غير مصرح لك بحذف أعضاء", 403);
        }

        const body = await req.json();

        if (!body || !body.userId) {
            return errorResponse("معرف المستخدم userId مطلوب", 400);
        }

        // Prevent owner from removing themselves via this route
        if (body.userId === workspace.ownerId) {
            return errorResponse("لا يمكن إزالة مالك مساحة العمل", 400);
        }

        await workspaceService.removeMember(id, body.userId);

        return successResponse({ deleted: true, message: "تمت إزالة العضو بنجاح" });
    } catch (error) {
        logger.error(`DELETE /api/workspaces/${id}/members error`, error);
        return errorResponse("حدث خطأ أثناء إزالة العضو", 500);
    }
}
