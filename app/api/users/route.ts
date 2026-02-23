// ملف: app/api/users/route.ts — GET profile و PUT تحديث الملف الشخصي
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getUserById, updateUser } from "@/services/user.service";
import type { User, ApiResponse } from "@/types";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().url().optional(),
});

export async function GET(req: Request) {
  try {
    // التحقق من الجلسة
    const session = await auth();
    const userId = session?.user?.id as string | undefined;
    if (!userId) {
      return NextResponse.json({ success: false, error: "غير مصرح" } as ApiResponse<null>, { status: 401 });
    }

    const user = await getUserById(userId);
    return NextResponse.json({ success: true, data: user } as ApiResponse<User>);
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: "خطأ في جلب الملف الشخصي" } as ApiResponse<null>, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id as string | undefined;
    if (!userId) {
      return NextResponse.json({ success: false, error: "غير مصرح" } as ApiResponse<null>, { status: 401 });
    }

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "محتوى غير صالح" } as ApiResponse<null>, { status: 422 });
    }

    const updated = await updateUser(userId, parsed.data);
    return NextResponse.json({ success: true, data: updated } as ApiResponse<User>);
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: "فشل تحديث الملف الشخصي" } as ApiResponse<null>, { status: 500 });
  }
}
