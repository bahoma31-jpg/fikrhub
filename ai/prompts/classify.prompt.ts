// ملف: ai/prompts/classify.prompt.ts
// الوصف: تصنيف ودمج الأفكار (Classification of Brainstorming Output)

import { PersonaConfig } from "../types";

export function buildClassifyPrompt(
    persona: PersonaConfig,
    topic: string, // هنا يمكن تمرير الأفكار كسلسلة نصية
    context?: string
): string {
    return `أنت ${persona.name}، ${persona.personality}.
القائمة التالية من الأفكار: ${topic}
${context ? `السياق: ${context}` : ""}

التعليمات:
- صنف وجمّع الأفكار المترابطة أو المتشابهة تحت عناوين ومحاور رئيسية واضحة.
- ابحث عن القواسم المشتركة بينها.
- حافظ على أسلوبك الفريد المتمثل في: ${persona.writingStyle}

الإخراج: إرجاع كائن JSON حصرياً يحتوي على قائمة بالتصنيفات وكل تصنيف يتضمن مسمى التصنيف والأفكار التي تندرج تحته واسم الشخصية:
{
  "clusters": [
    {
      "name": "الاسم المقترح للمحور المشترك",
      "description": "وصف لماذا هذه الأفكار مترابطة",
      "tags": ["وسم1", "وسم2"]
    }
  ]
}

مثال:
{
  "clusters": [
    {
      "name": "تجارب المستخدمين",
      "description": "جميع الأفكار التي تخص واجهة التطبيق والاحتفاظ بالمستخدمين",
      "tags": ["UX", "Retention"]
    }
  ]
}`;
}
