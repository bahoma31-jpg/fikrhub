// ملف: ai/prompts/index.ts
// الوصف: تصدير جميع تقنيات المطالبات (Prompts)

import { buildClassicPrompt } from "./classic.prompt";
import { buildBrainwritingPrompt } from "./brainwriting.prompt";
import { buildReversePrompt } from "./reverse.prompt";
import { buildStarburstingPrompt } from "./starbursting.prompt";
import { buildSixhatsPrompt } from "./sixhats.prompt";
import { buildScamperPrompt } from "./scamper.prompt";
import { buildClassifyPrompt } from "./classify.prompt";
import { buildEvaluatePrompt } from "./evaluate.prompt";
import { buildSuggestPrompt } from "./suggest.prompt";

export const promptBuilders = {
    classic: buildClassicPrompt,
    brainwriting: buildBrainwritingPrompt,
    reverse: buildReversePrompt,
    starbursting: buildStarburstingPrompt,
    sixhats: buildSixhatsPrompt,
    scamper: buildScamperPrompt,
    classify: buildClassifyPrompt,
    evaluate: buildEvaluatePrompt,
    suggest: buildSuggestPrompt
};

export interface PromptTemplate {
    systemPrompt: string;       // من أنت؟ (بأسلوب الشخصية)
    contextTemplate: string;    // ما السياق؟ (المشكلة/الموضوع)
    instructionTemplate: string; // ما المطلوب؟ (بخطوات واضحة)
    outputFormat: string;       // كيف تُخرج النتيجة؟ (JSON)
    examples?: string[];        // أمثلة (few-shot)
}
