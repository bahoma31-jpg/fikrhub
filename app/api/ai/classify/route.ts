// ملف: app/api/ai/classify/route.ts
// الوصف: نقطة النهاية لتصنيف الأفكار

import { AIEngine } from "@/ai/engine";
import { z } from "zod";

const classifySchema = z.object({
    ideas: z.array(z.any())
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = classifySchema.parse(body);

        const engine = new AIEngine();
        const clusters = await engine.classifyIdeas(validated.ideas);

        return Response.json({ success: true, data: clusters });
    } catch (e: any) {
        return Response.json({ success: false, error: e.message || 'حدث خطأ أثناء التصنيف' }, { status: 400 });
    }
}
