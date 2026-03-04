import { db } from "@/db";
import { subscriptions, users, sessions, ideas } from "@/db/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import { LIMITS } from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import { startOfMonth } from "date-fns";

/**
 * Helper to get user's active subscription status
 */
export async function getUserSubscription(userId: string) {
    const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId))
        .limit(1);

    return subscription;
}

/**
 * التحقق من وصول المستخدم للحد الأقصى
 */
export async function checkLimit(
    userId: string,
    limitType: 'sessions' | 'ideas' | 'exports',
    sessionId?: string // Required for 'ideas' limit type
): Promise<boolean> {
    const subscription = await getUserSubscription(userId);
    const isPro = subscription?.plan === "pro" && subscription?.status === "active";

    // Pro users have no limits basically
    if (isPro) return true;

    if (limitType === 'sessions') {
        const firstDay = startOfMonth(new Date());
        const countResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(sessions)
            .where(
                and(
                    eq(sessions.createdBy, userId),
                    gte(sessions.createdAt, firstDay)
                )
            );
        const count = Number(countResult[0]?.count || 0);
        return count < (LIMITS.FREE_SESSION_LIMIT || 3);
    }

    if (limitType === 'ideas') {
        if (!sessionId) return false;
        const countResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(ideas)
            .where(eq(ideas.sessionId, sessionId));
        const count = Number(countResult[0]?.count || 0);
        // As per A7 prompt free tier: 30 ideas/session. Fallback to LIMITS.MAX_IDEAS_PER_SESSION
        const ideaLimit = 30; // override based on A7 prompt "30 فكرة / جلسة" 
        return count < ideaLimit;
    }

    if (limitType === 'exports') {
        // Current DB schema doesn't track exports count. 
        // Always return true for now, but logged in ISSUES.md.
        return true;
    }

    return false;
}

/**
 * التحقق من صلاحية feature معينة
 */
export async function isProFeature(userId: string): Promise<boolean> {
    const subscription = await getUserSubscription(userId);
    return subscription?.plan === "pro" && subscription?.status === "active";
}

/**
 * Upgrade to Pro (Sync webhook)
 */
export async function upgradeSubscription(
    userId: string,
    stripeCustomerId: string,
    stripeSubscriptionId: string,
    currentPeriodEnd: Date
) {
    const existing = await getUserSubscription(userId);

    if (existing) {
        await db.update(subscriptions)
            .set({
                plan: "pro",
                status: "active",
                stripeCustomerId,
                stripeSubscriptionId,
                currentPeriodEnd,
                updatedAt: new Date(),
            })
            .where(eq(subscriptions.userId, userId));
    } else {
        await db.insert(subscriptions).values({
            userId,
            plan: "pro",
            status: "active",
            stripeCustomerId,
            stripeSubscriptionId,
            currentPeriodEnd,
        });
    }
}

/**
 * Handle subscription update/cancel (Sync webhook)
 */
export async function syncSubscriptionStatus(
    stripeSubscriptionId: string,
    status: string,
    plan: string,
    currentPeriodEnd?: Date
) {
    const updates: any = {
        status,
        plan,
        updatedAt: new Date(),
    };

    if (currentPeriodEnd) {
        updates.currentPeriodEnd = currentPeriodEnd;
    }

    await db.update(subscriptions)
        .set(updates)
        .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));
}
