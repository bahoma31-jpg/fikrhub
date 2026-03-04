import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { ideaService } from "@/services/idea.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { rateSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";
import { z } from "zod";

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

        const idea = await ideaService.getById(id);
        if (!idea) {
            return errorResponse("الفكرة غير موجودة", 404);
        }

        const body = await req.json();
        const parsed = rateSchema.parse(body);

        const rating = await ideaService.rate(
            id,
            session.user.id,
            parsed.score,
            parsed.criteria
        );

        return successResponse(rating);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        logger.error(`POST /api/ideas/${id}/rate error`, error);
        return errorResponse("حدث خطأ أثناء تقييم الفكرة", 500);
    }
}
