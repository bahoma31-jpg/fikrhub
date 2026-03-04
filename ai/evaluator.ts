// ملف: ai/evaluator.ts
// الوصف: تقييم درجة الجدوى والأصالة للأفكار (Evaluation Engine)

import { geminiClient } from "./client";
import { promptBuilders } from "./prompts";
import { personas } from "./personas";

export interface IdeaEvaluation {
    score: number;
    feasibility: number;
    originality: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
}

/**
 * تقييم فكرة للبحث عن نقاط قوتها وضعفها ومدى قابليتها للتنفيذ
 * @param ideaContent محتوى الفكرة
 * @returns كائن يحمل نسب التقييم ومقترحات للتحسين
 */
export async function evaluateIdea(ideaContent: string): Promise<IdeaEvaluation> {
    // "الناقد" هو الأنسب للتقييم بموضوعية وتحديد المخاطر
    const persona = personas["الناقد"];
    const prompt = promptBuilders.evaluate(persona, ideaContent);

    try {
        const respText = await geminiClient.generate(prompt);
        // التخلص من أي وسوم تنسيق markdown (```json ... ```)
        const cleaned = respText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        return {
            score: parsed.evaluation?.score ?? 50,
            feasibility: parsed.evaluation?.feasibility ?? 50,
            originality: parsed.evaluation?.originality ?? 50,
            strengths: parsed.evaluation?.strengths ?? [],
            weaknesses: parsed.evaluation?.weaknesses ?? [],
            suggestions: parsed.evaluation?.suggestions ?? [],
        };
    } catch (e) {
        console.error("Evaluation error:", e);
        // في حالة الفشل، نرجّع قيماً افتراضية لضمان عدم توقف الاستمرارية
        return {
            score: 0,
            feasibility: 0,
            originality: 0,
            strengths: [],
            weaknesses: [],
            suggestions: []
        };
    }
}
