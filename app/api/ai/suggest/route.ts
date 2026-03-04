// ملف: app/api/ai/suggest/route.ts
// الوصف: نقطة النهاية لاقتراح تحسينات وخطوات تالية (Suggestions)

import { AIEngine } from "@/ai/engine";
import { z } from "zod";

const suggestSchema = z.object({
    topicSummary: z.string()
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = suggestSchema.parse(body);

        const engine = new AIEngine();
        const suggestions = await engine.suggestImprovements(validated.topicSummary);

        return Response.json({ success: true, data: suggestions });
    } catch (e: any) {
        return Response.json({ success: false, error: e.message || 'حدث خطأ أثناء اقتراح التحسينات' }, { status: 400 });
    }
}
