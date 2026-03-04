// ملف: ai/prompts/evaluate.prompt.ts
// الوصف: تقييم الأفكار المفردة لمعرفة الجدوى والأصالة (Evaluation)

import { PersonaConfig } from "../types";

export function buildEvaluatePrompt(
    persona: PersonaConfig,
    topic: string, // هنا يتم تمرير الفكرة المحددة للتقييم
    context?: string
): string {
    return `أنت ${persona.name}، ${persona.personality}.
الفكرة المراد تقييمها: ${topic}
${context ? `السياق: ${context}` : ""}

التعليمات:
- قم بتقييم الفكرة بموضوعية بناءً على الأصالة (الابتكار) والجدوى (إمكانية التطبيق العملي).
- استخرج نقاط القوة الكامنة وحدد نقاط الضعف بعين الخبير، مع بعض النصائح التحسينية.
- الأسلوب الذي يجب أن تتبعه: ${persona.writingStyle}

الإخراج: إرجاع كائن JSON حصرياً:
{
  "evaluation": {
    "score": 85,
    "feasibility": 80,
    "originality": 90,
    "strengths": ["نقطة قوة رائعة الأولى", "الثانية"],
    "weaknesses": ["تحديات التنفيذ المحتملة"],
    "suggestions": ["كيف يمكنك معالجة نقاط الضعف المذكورة"]
  }
}

مثال:
{
  "evaluation": {
    "score": 75,
    "feasibility": 60,
    "originality": 90,
    "strengths": ["الفكرة سباقة ومستقبلية للغاية وتلفت الانتباه بقوتها"],
    "weaknesses": ["قد تصطدم بحدود التكنولوجيا المتوفرة لدينا حالياً"],
    "suggestions": ["لنجرب إطلاق شريحة صغيرة ومصغرة في البداية لاختبار السوق"]
  }
}`;
}
