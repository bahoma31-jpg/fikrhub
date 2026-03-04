// ملف: app/api/ai/evaluate/route.ts
// الوصف: نقطة النهاية لتقييم فكرة محددة

import { AIEngine } from "@/ai/engine";
import { z } from "zod";

const evaluateSchema = z.object({
    idea: z.object({
        content: z.string(),
    }).passthrough()
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = evaluateSchema.parse(body);

        const engine = new AIEngine();
        // @ts-ignore
        const evaluation = await engine.evaluateIdea(validated.idea);

        return Response.json({ success: true, data: evaluation });
    } catch (e: any) {
        return Response.json({ success: false, error: e.message || 'حدث خطأ أثناء التقييم' }, { status: 400 });
    }
}
