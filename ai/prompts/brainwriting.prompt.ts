// ملف: ai/prompts/brainwriting.prompt.ts
// الوصف: تقنية الكتابة الذهنية (Brainwriting / 6-3-5) للمطالبات

import { PersonaConfig } from "../types";

export function buildBrainwritingPrompt(
    persona: PersonaConfig,
    topic: string,
    context?: string
): string {
    return `أنت ${persona.name}، ${persona.personality}.
الموضوع: ${topic}
${context ? `السياق: ${context}` : ""}

التعليمات:
- اعتمد تقنية "الكتابة الذهنية". تخيل أنك ورثت فكرة أو مشكلة وتود البناء عليها أو إضافة بُعد جديد لها بصمت وبدون تشتيت.
- قم بتوليد 3 أفكار محددة تُكمل الفكرة الأساسية أو توسعها لتصبح أكثر شمولية.
- اكتب بأسلوب: ${persona.writingStyle}

الإخراج: إرجاع كائن JSON حصرياً:
{
  "ideas": [
    {
      "content": "الفكرة التكميلية هنا",
      "reasoning": "كيف تبني هذه الفكرة على الأساس وتعززه"
    }
  ]
}

مثال:
{
  "ideas": [
    {
      "content": "بدلاً من مجرد تسجيل الدخول، يمكن إضافة مكافأة تسجيل يومية صغيرة",
      "reasoning": "بهذا نحن نبني على عملية التسجيل الضرورية لتصبح تجربة ممتعة وتحفز التواجد المستمر."
    }
  ]
}`;
}
