// ملف: lib/auth.ts — NextAuth handler مع DrizzleAdapter للمصادقة
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { DefaultSession } from "next-auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, auth_accounts, auth_sessions, auth_verification_tokens } from "@/db/schema";
import { authConfig } from "./auth.config";

// توسيع نوع Session ليشمل حقول مخصصة
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: string;
            subscriptionTier: string;
        } & DefaultSession["user"];
    }
}

// توسيع نوع JWT ليشمل حقول مخصصة
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        subscriptionTier: string;
    }
}

const config = {
    ...authConfig,

    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: auth_accounts,
        sessionsTable: auth_sessions,
        verificationTokensTable: auth_verification_tokens,
    }),

    session: {
        strategy: "jwt" as const,
    },

    callbacks: {
        // Callback للـ JWT — يضيف البيانات المخصصة للـ Token
        async jwt({ token, user }): Promise<JWT> {
            if (user) {
                // المستخدم جديد أو قادم من authorize()
                token.id = user.id;
                // جلب البيانات الإضافية من قاعدة البيانات
                const [dbUser] = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, user.id as string))
                    .limit(1);

                if (dbUser) {
                    token.role = dbUser.role;
                    // TODO: إضافة حقل subscriptionTier عند إضافة جدول الاشتراكات
                    token.subscriptionTier = "free";
                }
            }

            return token;
        },

        // Callback للـ Session — ينقل البيانات من Token إلى Session
        async session({ session, token }): Promise<Session> {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.subscriptionTier = token.subscriptionTier as string;
            }

            return session;
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
