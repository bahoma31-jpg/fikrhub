// ملف: ai/prompts/starbursting.prompt.ts
// الوصف: تقنية الانفجار النجمي (Starbursting) من خلال توليد أسئلة بدلاً من أجوبة

import { PersonaConfig } from "../types";

export function buildStarburstingPrompt(
    persona: PersonaConfig,
    topic: string,
    context?: string
): string {
    return `أنت ${persona.name}، ${persona.personality}.
الموضوع: ${topic}
${context ? `السياق: ${context}` : ""}

التعليمات:
- اعتمد تقنية "التفجير النجمي" (Starbursting).
- اطرح 6 أسئلة محورية تغطي: من الواجب فعله؟ ماذا يحدث لو؟ متى؟ أين المستفيدون؟ لماذا هذا مهم؟ وكيف ننفذه؟
- لا تعطِ إجابات، بل اكتفِ بطرح هذه الأسئلة التي تفتح آفاقاً جديدة وتدعو للتأمل العميق، مصحوبة بحيثيات طرحها بأسلوبك: ${persona.writingStyle}

الإخراج: إرجاع كائن JSON حصرياً يحتوي على قائمة الأسئلة بصيغة أفكار:
{
  "ideas": [
    {
      "content": "السؤال المطروح (من، ماذا، إلخ...)",
      "reasoning": "سبب طرح السؤال وأهميته في السياق"
    }
  ]
}

مثال:
{
  "ideas": [
    {
      "content": "من هو المستفيد الذي تم تجاهله في الإصدار الحالي؟",
      "reasoning": "كثيراً ما نركز على المستخدم النشط، ولكن فهم احتياجات غير النشطين قد يكون مفتاح التوسع."
    }
  ]
}`;
}
