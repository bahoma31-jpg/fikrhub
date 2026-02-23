// ملف: app/api/auth/[...nextauth]/route.ts — نقطة دخول NextAuth
import { handlers } from "@/lib/auth";

// صادر بسيط ليتوافق مع App Router
export const GET = handlers.GET;
export const POST = handlers.POST;
