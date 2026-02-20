// ملف: types/ai.types.ts — أنواع بيانات الذكاء الاصطناعي
export interface AIPersona {
    id: string;
    name: string;
    name_en: string;
    description: string;
    icon: string;
}

export interface AIAnalysisResult {
    ideas: string[];
    summary: string;
    suggestions: string[];
}
