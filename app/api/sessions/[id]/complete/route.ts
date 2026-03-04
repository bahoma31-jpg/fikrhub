import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { sessionService } from "@/services/session.service";
import { successResponse, errorResponse } from "@/lib/api-response";
import { verifyOwnership } from "@/lib/ownership";
import { logger } from "@/lib/logger";

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

        const sessionData = await sessionService.getById(id);
        if (!sessionData) {
            return errorResponse("الجلسة غير موجودة", 404);
        }

        const isOwner = await verifyOwnership(sessionData.createdBy, session.user.id);
        if (!isOwner) {
            return errorResponse("غير مصرح لك بإنهاء هذه الجلسة", 403);
        }

        // إرسال الـ user.id لمعالجة stats
        const completedSession = await sessionService.complete(id, session.user.id);

        return successResponse(completedSession);
    } catch (error) {
        if (error instanceof Error) {
            return errorResponse(error.message, 400); // For specific service errors
        }
        logger.error(`POST /api/sessions/${id}/complete error`, error);
        return errorResponse("حدث خطأ أثناء إنهاء الجلسة", 500);
    }
}
