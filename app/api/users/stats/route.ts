// ملف: app/api/users/stats/route.ts — جلب إحصائيات المستخدم الحالي
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserStats } from "@/services/user.service";
import type { UserWithStats, ApiResponse } from "@/types";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id as string | undefined;
    if (!userId) return NextResponse.json({ success: false, error: "غير مصرح" } as ApiResponse<null>, { status: 401 });

    const stats = await getUserStats(userId);
    return NextResponse.json({ success: true, data: stats } as ApiResponse<UserWithStats>);
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: "فشل جلب إحصائيات المستخدم" } as ApiResponse<null>, { status: 500 });
  }
}
