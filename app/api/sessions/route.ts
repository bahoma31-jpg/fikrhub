import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { sessionService } from "@/services/session.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { parsePagination } from "@/lib/pagination";
import { SessionSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";
import { z } from "zod";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return errorResponse("غير مصرح", 401);
        }

        const url = new URL(req.url);
        const { page, limit } = parsePagination(url.searchParams);

        const filters = {
            technique: url.searchParams.get("technique") || undefined,
            status: url.searchParams.get("status") || undefined,
            workspaceId: url.searchParams.get("workspaceId") || undefined,
        };

        const data = await sessionService.getAll(session.user.id, filters, page, limit);

        return successResponse(data);
    } catch (error) {
        logger.error("GET /api/sessions error", error);
        return errorResponse("حدث خطأ أثناء جلب الجلسات", 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return errorResponse("غير مصرح", 401);
        }

        const body = await req.json();
        const parsed = SessionSchema.parse(body);

        const newSession = await sessionService.create(parsed, session.user.id);

        return successResponse(newSession, 201);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        if (error instanceof Error) {
            return errorResponse(error.message, 400); // For specific service errors
        }
        logger.error("POST /api/sessions error", error);
        return errorResponse("حدث خطأ أثناء إنشاء الجلسة", 500);
    }
}
