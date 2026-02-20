// ملف: types/ai.types.ts — أنواع بيانات التفاعل مع الذكاء الاصطناعي
/**
 * @interface AIPersona
 * @description تعريف الشخصية الافتراضية للذكاء الاصطناعي.
 */
export interface AIPersona {
    id: string;
    name: string;
    name_en: string;
    description: string;
    icon: string;
}

/**
 * @interface AiGenerateRequest
 * @description هيكلية الطلب لتوليد أفكار جديدة.
 */
export interface AiGenerateRequest {
    sessionId: string;
    prompt: string;
    personaId?: string;
    count?: number;
}

/**
 * @interface AiGenerateResponse
 * @description هيكلية الرد عند توليد أفكار.
 */
export interface AiGenerateResponse {
    ideas: {
        content: string;
        reasoning?: string;
    }[];
    usage: {
        promptTokens: number;
        completionTokens: number;
    };
}

/**
 * @interface AiClassifyResult
 * @description نتيجة تصنيف الأفكار آلياً.
 */
export interface AiClassifyResult {
    category: string;
    confidence: number;
    tags: string[];
}

/**
 * @interface AiEvaluateResult
 * @description نتيجة تقييم الفكرة من قبل الذكاء الاصطناعي.
 */
export interface AiEvaluateResult {
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
}
