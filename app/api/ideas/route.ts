import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { ideaService } from "@/services/idea.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { createIdeaSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return errorResponse("غير مصرح", 401);
        }

        const body = await req.json();
        const parsed = createIdeaSchema.parse(body);

        const newIdea = await ideaService.create(parsed, session.user.id);

        return successResponse(newIdea, 201);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        if (error instanceof Error) {
            return errorResponse(error.message, 400);
        }
        logger.error("POST /api/ideas error", error);
        return errorResponse("حدث خطأ أثناء إنشاء الفكرة", 500);
    }
}
