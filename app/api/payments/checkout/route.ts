import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// If you are fully migrated to next-auth v5 (Auth.js), you might need:
// import { auth } from "@/lib/auth"; 
import { createCheckoutSession } from "@/lib/stripe";
import { z } from "zod";

const checkoutSchema = z.object({
    priceId: z.string().min(1, "priceId مطلوب"),
});

export async function POST(req: NextRequest) {
    try {
        // Attempt either v4 or v5 method based on prompt
        // Assuming next-auth isn't fully set up, we just use the prompt's provided method
        const session = await getServerSession();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "غير مصرح" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const result = checkoutSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: "بيانات غير صالحة", details: result.error.format() },
                { status: 400 }
            );
        }

        const { priceId } = result.data;

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const checkoutSession = await createCheckoutSession({
            userId: session.user.id,
            priceId,
            successUrl: `${baseUrl}/dashboard?payment=success`,
            cancelUrl: `${baseUrl}/dashboard?payment=cancelled`,
            customerEmail: session.user.email || undefined,
        });

        return NextResponse.json({
            success: true,
            data: { url: checkoutSession.url },
        });

    } catch (error: any) {
        console.error("❌ Checkout Error:", error);
        return NextResponse.json(
            { success: false, error: "حدث خطأ أثناء معالجة الدفع", message: error.message },
            { status: 500 }
        );
    }
}
