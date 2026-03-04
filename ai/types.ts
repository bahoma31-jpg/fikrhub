// ملف: ai/types.ts
// الوصف: الأنواع الخاصة بشخصيات وإعدادات الذكاء الاصطناعي في هيكلية A4

export type PersonaName = "المبدع" | "المحلل" | "الناقد" | "الحالم" | "العملي" | "المتفائل";

export interface PersonaConfig {
    name: PersonaName;
    personality: string;
    writingStyle: string;
    expertise: string;
    temperature: number;
}

export interface GenerateConfig {
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
    systemInstruction?: string;
}

export interface AIResponse {
    success: boolean;
    data?: string;
    error?: string;
}

export interface AIErrorResponse {
    success: false;
    error: string;
}
