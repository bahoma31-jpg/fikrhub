import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { ideaService } from "@/services/idea.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { updateIdeaSchema } from "@/lib/validations";
import { verifyOwnership } from "@/lib/ownership";
import { logger } from "@/lib/logger";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

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

        const idea = await ideaService.getById(id);
        if (!idea) {
            return errorResponse("الفكرة غير موجودة", 404);
        }

        const isOwner = await verifyOwnership(idea.createdBy, session.user.id);
        if (!isOwner) {
            return errorResponse("غير مصرح لك بتعديل هذه الفكرة", 403);
        }

        const body = await req.json();
        const parsed = updateIdeaSchema.parse(body);

        const updated = await ideaService.update(id, parsed);

        return successResponse(updated);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        logger.error(`PUT /api/ideas/${id} error`, error);
        return errorResponse("حدث خطأ أثناء تعديل الفكرة", 500);
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

        const idea = await ideaService.getById(id);
        if (!idea) {
            return errorResponse("الفكرة غير موجودة", 404);
        }

        const isOwner = await verifyOwnership(idea.createdBy, session.user.id);
        if (!isOwner) {
            return errorResponse("غير مصرح لك بحذف هذه الفكرة", 403);
        }

        await ideaService.delete(id);

        return successResponse({ deleted: true });
    } catch (error) {
        logger.error(`DELETE /api/ideas/${id} error`, error);
        return errorResponse("حدث خطأ أثناء حذف الفكرة", 500);
    }
}
