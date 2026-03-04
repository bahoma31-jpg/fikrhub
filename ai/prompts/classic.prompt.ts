// ملف: ai/prompts/classic.prompt.ts
// الوصف: مقبس العصف الذهني التقليدي (Classic Brainstorming)

import { PersonaConfig } from "../types";

export function buildClassicPrompt(
    persona: PersonaConfig,
    topic: string,
    context?: string
): string {
    return `أنت ${persona.name}، ${persona.personality}.
الموضوع: ${topic}
${context ? `السياق: ${context}` : ""}

التعليمات: 
- اجلب أكبر عدد من الأفكار بدون تقييم. ركز على الكمية وتوليد أفكار جديدة بأسلوبك الفريد.
- يجب أن يكون أسلوب كتابتك: ${persona.writingStyle}
- قدم 5 أفكار على الأقل.

الإخراج: إرجاع كائن JSON حصرياً يحتوي على قائمة من الأفكار، ولا تكتب أي نص قبله أو بعده:
{
  "ideas": [
    {
      "content": "عنوان أو وصف مختصر للفكرة",
      "reasoning": "سبب أو تفصيل للفكرة بأسلوبك الخاص"
    }
  ]
}

مثال:
{
  "ideas": [
    {
      "content": "نظام مكافآت للمستخدمين المتفاعلين",
      "reasoning": "أرى أن ذلك سيحفز الجميع ويخلق طاقة إيجابية رائعة للمشاركة!"
    }
  ]
}`;
}
