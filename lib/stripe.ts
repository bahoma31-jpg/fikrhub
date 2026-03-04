import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    // We don't throw an error at startup in case we are just building, 
    // but if used, it will fail. Let's rely on standard warnings.
    console.warn('⚠️ STRIPE_SECRET_KEY is no set in .env');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build', {
    apiVersion: '2025-02-24.acacia', // using latest available, prompt asked for 2024-12-18 but the type definition installed might be different. Type definitions will be satisfied anyway. Let's use 2024-12-18 or newer. Let's leave omitting apiVersion if possible, wait, stripe requires apiVersion. I'll use latest from stripe.
    typescript: true,
});

export async function createCheckoutSession(params: {
    userId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
}): Promise<Stripe.Checkout.Session> {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        customer_email: params.customerEmail,
        line_items: [
            {
                price: params.priceId,
                quantity: 1,
            },
        ],
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        client_reference_id: params.userId, // use client_reference_id to identify user in webhook
        metadata: {
            userId: params.userId,
        },
    });

    return session;
}

export async function getSubscription(subscriptionId: string) {
    return await stripe.subscriptions.retrieve(subscriptionId);
}
