// ملف: config/techniques.config.ts — إعدادات التشغيل للتقنيات التسع
/**
 * @file techniques.config.ts
 * @description الإعدادات البرمجية والتشغيلية لكل تقنية، تستخدم للتحكم في منطق الجلسة والذكاء الاصطناعي.
 */

export interface TechniqueConfig {
    id: string;
    defaultDuration: number; // بالدقائق
    minParticipants: number;
    maxParticipants: number;
    aiSupported: boolean;
    proOnly: boolean;
    rounds?: number;
    tags: string[];
}

export const TECHNIQUES_CONFIG: Record<string, TechniqueConfig> = {
    classic: {
        id: "classic",
        defaultDuration: 30,
        minParticipants: 1,
        maxParticipants: 12,
        aiSupported: true,
        proOnly: false,
        tags: ["general", "quantity"]
    },
    brainwriting: {
        id: "brainwriting",
        defaultDuration: 45,
        minParticipants: 3,
        maxParticipants: 6,
        aiSupported: true,
        proOnly: true,
        rounds: 6,
        tags: ["structured", "silent"]
    },
    reverse: {
        id: "reverse",
        defaultDuration: 40,
        minParticipants: 1,
        maxParticipants: 10,
        aiSupported: true,
        proOnly: false,
        tags: ["problem-solving", "critical"]
    },
    starbursting: {
        id: "starbursting",
        defaultDuration: 45,
        minParticipants: 2,
        maxParticipants: 8,
        aiSupported: true,
        proOnly: true,
        tags: ["questioning", "validation"]
    },
    stepladder: {
        id: "stepladder",
        defaultDuration: 60,
        minParticipants: 3,
        maxParticipants: 10,
        aiSupported: false,
        proOnly: true,
        tags: ["group-dynamics", "unbiased"]
    },
    six_hats: {
        id: "six_hats",
        defaultDuration: 90,
        minParticipants: 1,
        maxParticipants: 12,
        aiSupported: true,
        proOnly: true,
        rounds: 6,
        tags: ["analysis", "perspectives"]
    },
    scamper: {
        id: "scamper",
        defaultDuration: 60,
        minParticipants: 1,
        maxParticipants: 8,
        aiSupported: true,
        proOnly: false,
        tags: ["innovation", "evolution"]
    },
    worst_idea: {
        id: "worst_idea",
        defaultDuration: 30,
        minParticipants: 2,
        maxParticipants: 15,
        aiSupported: true,
        proOnly: false,
        tags: ["creative-block", "humor"]
    },
    electronic: {
        id: "electronic",
        defaultDuration: 20,
        minParticipants: 4,
        maxParticipants: 50,
        aiSupported: true,
        proOnly: true,
        tags: ["fast", "anonymous"]
    }
};
