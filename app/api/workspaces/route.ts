import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { workspaceService } from "@/services/workspace.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { parsePagination } from "@/lib/pagination";
import { createWorkspaceSchema } from "@/lib/validations";
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

        const data = await workspaceService.getAll(session.user.id, page, limit);

        return successResponse(data);
    } catch (error) {
        logger.error("GET /api/workspaces error", error);
        return errorResponse("حدث خطأ أثناء جلب مساحات العمل", 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return errorResponse("غير مصرح", 401);
        }

        const body = await req.json();
        const parsed = createWorkspaceSchema.parse(body);

        const newWorkspace = await workspaceService.create(parsed, session.user.id);

        return successResponse(newWorkspace, 201);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return errorResponse(error.errors[0].message, 400);
        }
        logger.error("POST /api/workspaces error", error);
        return errorResponse("حدث خطأ أثناء إنشاء مساحة العمل", 500);
    }
}
