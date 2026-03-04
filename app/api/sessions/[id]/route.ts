import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { sessionService } from "@/services/session.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { updateSessionSchema } from "@/lib/validations";
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

        const sessionData = await sessionService.getById(id);

        if (!sessionData) {
            return errorResponse("الجلسة غير موجودة", 404);
        }

        // TODO: يمكن إضافة تحقق هنا ما إذا كان المستخدم جزءاً من مساحة العمل للجلسة

        return successResponse(sessionData);
    } catch (error) {
        logger.error(`GET /api/sessions/${id} error`, error);
        return errorResponse("حدث خطأ أثناء جلب الجلسة", 500);
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

        const sessionData = await sessionService.getById(id);
        if (!sessionData) {
            return errorResponse("الجلسة غير موجودة", 404);
        }

        const isOwner = await verifyOwnership(sessionData.createdBy, session.user.id);
        if (!isOwner) {
            return errorResponse("غير مصرح لك بتعديل هذه الجلسة", 403);
        }

        const body = await req.json();
        const parsed = updateSessionSchema.parse(body);

        const updated = await sessionService.update(id, parsed);

        return successResponse(updated);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        logger.error(`PUT /api/sessions/${id} error`, error);
        return errorResponse("حدث خطأ أثناء تعديل الجلسة", 500);
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

        const sessionData = await sessionService.getById(id);
        if (!sessionData) {
            return errorResponse("الجلسة غير موجودة", 404);
        }

        const isOwner = await verifyOwnership(sessionData.createdBy, session.user.id);
        if (!isOwner) {
            return errorResponse("غير مصرح لك بحذف هذه الجلسة", 403);
        }

        await sessionService.delete(id);

        return successResponse({ deleted: true });
    } catch (error) {
        logger.error(`DELETE /api/sessions/${id} error`, error);
        return errorResponse("حدث خطأ أثناء أرشفة الجلسة", 500);
    }
}
