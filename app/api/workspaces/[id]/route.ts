import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { workspaceService } from "@/services/workspace.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { updateWorkspaceSchema } from "@/lib/validations";
import { verifyOwnership } from "@/lib/ownership";
import { logger } from "@/lib/logger";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(
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
            return errorResponse("مساحة العمل غير موجودة أو لا تملك صلاحية الوصول", 404);
        }

        return successResponse(workspace);
    } catch (error) {
        logger.error(`GET /api/workspaces/${id} error`, error);
        return errorResponse("حدث خطأ أثناء جلب مساحة العمل", 500);
    }
}

export async function PUT(
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
            return errorResponse("غير مصرح لك بتعديل هذه المساحة", 403);
        }

        const body = await req.json();
        const parsed = updateWorkspaceSchema.parse(body);

        const updated = await workspaceService.update(id, parsed);

        return successResponse(updated);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        logger.error(`PUT /api/workspaces/${id} error`, error);
        return errorResponse("حدث خطأ أثناء تعديل مساحة العمل", 500);
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
            return errorResponse("غير مصرح لك بحذف هذه المساحة", 403);
        }

        await workspaceService.delete(id);

        return successResponse({ deleted: true });
    } catch (error) {
        logger.error(`DELETE /api/workspaces/${id} error`, error);
        return errorResponse("حدث خطأ أثناء حذف مساحة العمل", 500);
    }
}
