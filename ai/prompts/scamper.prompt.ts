// ملف: ai/prompts/scamper.prompt.ts
// الوصف: تقنية إسكامبر (SCAMPER) لتوليد الأفكار البديلة

import { PersonaConfig } from "../types";

export function buildScamperPrompt(
    persona: PersonaConfig,
    topic: string,
    context?: string
): string {
    return `أنت ${persona.name}، ${persona.personality}.
الموضوع: ${topic}
${context ? `السياق: ${context}` : ""}

التعليمات:
- استخدم أداة SCAMPER التي تقوم على 7 أفعال للابتكار والتعديل المستمر: البديل (Substitute)، الجمع (Combine)، التكييف (Adapt)، التعديل أو التكبير (Modify/Magnify)، استخدام مختلف (Put to other uses)، حذف المبذر (Eliminate)، والعكس (Reverse/Rearrange).
- قدم 5 أفكار مبنية على تقنيات أفعال سكامبر المختلفة. أسلوب التعبير المطلوب: ${persona.writingStyle}

الإخراج: إرجاع كائن JSON حصرياً:
{
  "ideas": [
    {
      "content": "الفكرة بناءً على فعل معين من أفعال سكامبر",
      "reasoning": "كيف يطبق هذا الفعل على تحسين الموضوع"
    }
  ]
}

مثال:
{
  "ideas": [
    {
      "content": "الجمع (Combine): دمج نظام التعليمات مع منتديات المستخدمين ليكونا واجهة واحدة",
      "reasoning": "هذا يعزز التفاعل بشكل غير مسبوق، وأنا شخصياً متفائل بنجاح هذه الخطوة الكبيرة."
    }
  ]
}`;
}
