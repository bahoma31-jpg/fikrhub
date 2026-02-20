import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * @function subscriptionGuard
 * @description حماية المسارات والمميزات التي تتطلب اشتراكاً مدفوعاً.
 */
export function subscriptionGuard(request: NextRequest, plan: string) {
    const proFeaturesPaths = ["/api/ai/deep-analysis", "/api/search/semantic"];

    if (proFeaturesPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        if (plan !== "pro") {
            return NextResponse.json(
                {
                    success: false,
                    error: "هذه الميزة مخصصة لمشتركي الباقة الاحترافية فقط.",
                    code: "PRO_PLAN_REQUIRED"
                },
                { status: 403 }
            );
        }
    }

    return null;
}
