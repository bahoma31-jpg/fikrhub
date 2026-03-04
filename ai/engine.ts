// ملف: ai/engine.ts
// الوصف: المحرك الرئيسي لإدارة التوليد والتصنيف والتقييم، متضمناً آلية الـ Streaming

import { geminiClient } from "./client";
import { personas } from "./personas";
import { promptBuilders } from "./prompts";
import { clusterIdeas } from "./classifier";
import { evaluateIdea } from "./evaluator";
import { Idea } from "@/types/idea.types";
import { TechniqueType } from "@/types/session.types";
import { PersonaName } from "./types";
import { logger } from "@/lib/logger";

export interface GenerateParams {
    technique: TechniqueType | string;
    sessionId: string;
    topic: string;
    personaCount?: number;
    stream?: boolean;
}

export class AIEngine {

    /**
     * اختيار عشوائي لعدد N شخصيات من إجمالي الشخصيات المتاحة
     * @param count العدد المطلوب
     * @returns مصفوفة بأسماء الشخصيات
     */
    private selectPersonas(count: number): PersonaName[] {
        const allPersonas = Object.keys(personas) as PersonaName[];
        // Shuffle algorithim (Fisher-Yates)
        for (let i = allPersonas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allPersonas[i], allPersonas[j]] = [allPersonas[j], allPersonas[i]];
        }
        return allPersonas.slice(0, Math.min(count, allPersonas.length));
    }

    /**
     * بناء الطلبات لمعالجة التقنية مع عدد محدد من الشخصيات وإرجاع النتائج المجمعة
     */
    private async generateIdeasConcurrent(params: GenerateParams): Promise<Record<string, unknown>[]> {
        const count = params.personaCount || 3;
        const selectedPersonas = this.selectPersonas(count);
        const techniqueKey = params.technique.toLowerCase() as keyof typeof promptBuilders;
        const promptBuilder = promptBuilders[techniqueKey] || promptBuilders.classic;

        const promises = selectedPersonas.map(async (personaName) => {
            const persona = personas[personaName];
            const prompt = promptBuilder(persona, params.topic);

            try {
                // استخدام الإعدادات الخاصة بالشخصية (مثل temperature)
                const respMatch = await geminiClient.generate(prompt, {
                    temperature: persona.temperature
                });

                const cleaned = respMatch.replace(/```json/g, "").replace(/```/g, "").trim();
                const parsed = JSON.parse(cleaned);

                // إرفاق اسم الشخصية مع كل فكرة لغرض التتبع
                return (parsed.ideas || []).map((idea: Record<string, unknown>) => ({
                    ...idea,
                    persona: personaName
                }));
            } catch (e: unknown) {
                logger.error(`Error generating with persona ${personaName}:`, e);
                return [];
            }
        });

        // تنفيذ متزامن وتجاهل الأخطاء الجزئية
        const results = await Promise.allSettled(promises);
        const allIdeas = results
            .filter((res): res is PromiseFulfilledResult<Record<string, unknown>[]> => res.status === "fulfilled")
            .map(res => res.value)
            .flat();

        return allIdeas;
    }

    /**
     * توليد الأفكار وإرسال الدفق (Stream) للمستخدم إن طُلب
     * باستخدام ReadableStream لآلية SSE بمعدل كل 50 ملي ثانية للتدفق المستمر.
     */
    public async generate(params: GenerateParams) {
        // نولد الأفكار فعلياً هنا
        const ideas = await this.generateIdeasConcurrent(params);

        if (!params.stream) {
            return {
                success: true,
                data: ideas,
                meta: {
                    personasUsed: Array.from(new Set(ideas.map(i => i.persona)))
                }
            };
        }

        // تحضير دفق النص المستمر Stream
        return this.streamResponse(ideas);
    }

    /**
     * عملية الدفق الوهمية لتجربة سلسة من ناحية واجهة المستخدم
     * يقوم بإرسال فكرة تلو الفكرة بفاصل زمني لتقليد كتابة الذكاء الاصطناعي
     * @param ideas قائمة الأفكار المولدة
     * @returns ReadableStream جاهز للإرسال في الاستجابة
     */
    private streamResponse(ideas: Record<string, unknown>[]): ReadableStream {
        const encoder = new TextEncoder();

        return new ReadableStream({
            start: async (controller) => {
                for (const idea of ideas) {
                    const chunk = `data: ${JSON.stringify({ type: "idea", content: idea })}\n\n`;
                    controller.enqueue(encoder.encode(chunk));

                    // انتظار قليل بين كل فكرة وأخرى
                    await new Promise(res => setTimeout(res, 50));
                }

                // إغلاق الدفق برمز الإغلاق النهائي
                controller.enqueue(encoder.encode('data: {"type": "done"}\n\n'));
                controller.close();
            }
        });
    }

    /**
     * تمرير الأفكار للتصنيف (تغليف الدالة)
     */
    public async classifyIdeas(ideas: Idea[]) {
        return await clusterIdeas(ideas);
    }

    /**
     * تمرير فكرة للتقييم الشامل
     */
    public async evaluateIdea(idea: Idea) {
        return await evaluateIdea(idea.content);
    }

    /**
     * اقتراح تحسينات لجلسة بكاملها أو ملخص أفكار
     * @param topicSummary ملخص المخرجات أو الأفكار
     */
    public async suggestImprovements(topicSummary: string) {
        const persona = personas["العملي"];
        const prompt = promptBuilders.suggest(persona, topicSummary);

        try {
            const respText = await geminiClient.generate(prompt);
            const cleaned = respText.replace(/```json/g, "").replace(/```/g, "").trim();
            const parsed = JSON.parse(cleaned);
            return parsed.ideas || [];
        } catch (e: unknown) {
            logger.error("Suggestion error:", e);
            return [];
        }
    }
}
