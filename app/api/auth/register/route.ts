import { NextResponse } from "next/server";
import { z } from "zod";

import { getUserByEmail, createUser } from "@/services/user.service";
import type { ApiResponse } from "@/types";

const registerSchema = z.object({ name: z.string().min(1), email: z.string().email(), password: z.string().min(6) });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parse = registerSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ success: false, error: "محتوى غير صالح", details: parse.error.flatten() } as ApiResponse<null>, { status: 422 });
    }

    const { name, email, password } = parse.data;

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ success: false, error: "البريد الإلكتروني مستخدم بالفعل" } as ApiResponse<null>, { status: 409 });
    }

    const created = await createUser({ name, email, password });

    const responsePayload = { id: created.id, email: created.email, name: created.name };

    return NextResponse.json({ success: true, data: responsePayload } as ApiResponse<typeof responsePayload>);
  } catch (err) {
    return NextResponse.json({ success: false, error: "فشل إنشاء المستخدم" } as ApiResponse<null>, { status: 500 });
  }
}
