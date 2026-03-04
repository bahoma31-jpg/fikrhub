import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { ideaService } from "@/services/idea.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { commentSchema } from "@/lib/validations";
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

        const idea = await ideaService.getById(id);
        if (!idea) {
            return errorResponse("الفكرة غير موجودة", 404);
        }

        const comments = await ideaService.getComments(id);

        return successResponse(comments);
    } catch (error) {
        logger.error(`GET /api/ideas/${id}/comments error`, error);
        return errorResponse("حدث خطأ أثناء جلب التعليقات", 500);
    }
}

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

        const idea = await ideaService.getById(id);
        if (!idea) {
            return errorResponse("الفكرة غير موجودة", 404);
        }

        const body = await req.json();
        const parsed = commentSchema.parse(body);

        const newComment = await ideaService.addComment(
            id,
            session.user.id,
            parsed.content,
            parsed.parentId
        );

        return successResponse(newComment, 201);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        logger.error(`POST /api/ideas/${id}/comments error`, error);
        return errorResponse("حدث خطأ أثناء إضافة التعليق", 500);
    }
}
