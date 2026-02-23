// ملف: lib/auth.config.ts — تكوين مزودي المصادقة (Google OAuth + Credentials)
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { compareSync } from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { z } from "zod";

// نموذج Zod للتحقق من بيانات تسجيل الدخول بـ Credentials
const credentialsSchema = z.object({
    email: z.string().email("بريد إلكتروني غير صحيح"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export const authConfig: NextAuthConfig = {
    providers: [
        // مزود Google OAuth
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),

        // مزود Credentials (Email/Password)
        Credentials({
            credentials: {
                email: { label: "البريد الإلكتروني", type: "email" },
                password: { label: "كلمة المرور", type: "password" },
            },

            async authorize(credentials): Promise<{ id: string; email: string; name: string | null } | null> {
                try {
                    // التحقق من صحة المدخلات باستخدام Zod
                    const parsedCredentials = credentialsSchema.parse(credentials);

                    // البحث عن المستخدم في قاعدة البيانات
                    const [dbUser] = await db
                        .select()
                        .from(users)
                        .where(eq(users.email, parsedCredentials.email))
                        .limit(1);

                    if (!dbUser) {
                        throw new Error("المستخدم غير موجود");
                    }

                    // التحقق من وجود كلمة مرور مشفرة
                    if (!dbUser.passwordHash) {
                        throw new Error("هذا الحساب لا يدعم تسجيل الدخول بكلمة المرور");
                    }

                    // التحقق من صحة كلمة المرور باستخدام bcryptjs
                    const isPasswordValid = compareSync(parsedCredentials.password, dbUser.passwordHash);

                    if (!isPasswordValid) {
                        throw new Error("كلمة المرور غير صحيحة");
                    }

                    // إرجاع بيانات المستخدم للـ Session/Token
                    return {
                        id: dbUser.id,
                        email: dbUser.email,
                        name: dbUser.name,
                    };
                } catch (error: unknown) {
                    // رفع الخطأ ليتعامل معه NextAuth
                    return null;
                }
            },
        }),
    ],

    pages: {
        signIn: "/login",
        error: "/login",
    },
};
