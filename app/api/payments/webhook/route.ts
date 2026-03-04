import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { upgradeSubscription, syncSubscriptionStatus } from "@/services/subscription.service";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const bodyText = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
        return new Response("❌ Stripe signature missing", { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.warn("⚠️ STRIPE_WEBHOOK_SECRET is not set");
        return new Response("Webhook error: Secret not configured", { status: 500 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(bodyText, signature, webhookSecret);
    } catch (err: any) {
        console.error(`❌ Webhook Error: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.client_reference_id || session.metadata?.userId;
                const subscriptionId = session.subscription as string;
                const customerId = session.customer as string;

                if (userId && subscriptionId) {
                    // جلب تفاصيل الاشتراك للحصول على تاريخ الانتهاء
                    const subscriptionInfo = await stripe.subscriptions.retrieve(subscriptionId);
                    await upgradeSubscription(
                        userId,
                        customerId,
                        subscriptionId,
                        new Date(subscriptionInfo.current_period_end * 1000)
                    );
                }
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                await syncSubscriptionStatus(
                    subscription.id,
                    subscription.status,
                    // Usually 'pro', but check metadata or product ID if multiple plans
                    "pro",
                    new Date(subscription.current_period_end * 1000)
                );
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                await syncSubscriptionStatus(
                    subscription.id,
                    "canceled",
                    "free"
                );
                break;
            }
        }
    } catch (error: any) {
        console.error("❌ Database update failed in webhook:", error);
        return new Response("Database Error", { status: 500 });
    }

    return new Response("✅ Webhook handled", { status: 200 });
}
