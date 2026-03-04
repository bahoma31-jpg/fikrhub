// ملف: app/api/ai/generate/route.ts
// الوصف: نقطة النهاية (Endpoint) لاستقبال طلب التوليد وإرجاعه كتدفق بيانات (SSE Stream)

import { AIEngine } from "@/ai/engine";
import { z } from "zod";

const generateSchema = z.object({
    technique: z.string(),
    sessionId: z.string(),
    topic: z.string(),
    personaCount: z.number().optional()
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = generateSchema.parse(body);

        const engine = new AIEngine();
        // إرجاع تدفق SSE
        const stream = await engine.generate({
            ...validated,
            stream: true
        });

        // التحقق من استلام دفق وليس كائن فقط لتجنب أي أخطاء 타입
        if (stream instanceof ReadableStream) {
            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                }
            });
        }

        return Response.json({ success: true, data: stream });

    } catch (e: any) {
        return Response.json({ success: false, error: e.message || 'حدث خطأ أثناء معالجة الطلب' }, { status: 400 });
    }
}
