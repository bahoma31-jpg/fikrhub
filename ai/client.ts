// ملف: ai/client.ts
// الوصف: واجهة برمجة تطبيقات Gemini مع دعم إعادة المحاولة والتحكم بالوقت

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateConfig } from "./types";
import { getTokenCount } from "./utils";

const errors = {
    API_KEY_MISSING: "مفتاح API غير موجود",
    QUOTA_EXCEEDED: "تم تجاوز الحد اليومي",
    NETWORK_ERROR: "خطأ في الاتصال بالإنترنت",
    TIMEOUT: "انتهى وقت الاتصال",
    UNKNOWN: "حدث خطأ غير متوقع"
};

const apiKey = process.env.GOOGLE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * دالة لتحديد وقت أقصى للطلب
 */
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    let timeoutId: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(errors.TIMEOUT)), timeoutMs);
    });
    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

/**
 * إعادة المحاولة مع زيادة تأخير زمني أسي
 */
async function retryOperation<T>(operation: () => Promise<T>, retries: number = 3): Promise<T> {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await operation();
        } catch (error: any) {
            attempt++;
            if (attempt >= retries) {
                if (error.message === errors.TIMEOUT) throw error;
                if (error.message?.includes("fetch failed")) throw new Error(errors.NETWORK_ERROR);
                if (error.status === 429) throw new Error(errors.QUOTA_EXCEEDED);
                throw new Error(errors.UNKNOWN);
            }
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error(errors.UNKNOWN);
}

export const geminiClient = {
    /**
     * طلب إنشاء نص من الذكاء الاصطناعي
     * @param prompt النص المطلوب 
     * @param config خيارات وإعدادات الشخصية
     * @returns النص المولد
     */
    async generate(prompt: string, config?: GenerateConfig): Promise<string> {
        if (!process.env.GOOGLE_AI_API_KEY) throw new Error(errors.API_KEY_MISSING);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: config?.systemInstruction,
            generationConfig: {
                temperature: config?.temperature ?? 0.7,
                topP: config?.topP,
                topK: config?.topK,
                maxOutputTokens: config?.maxOutputTokens,
            }
        });

        const execute = async () => {
            const result = await model.generateContent(prompt);
            return result.response.text();
        };

        return await retryOperation(() => withTimeout(execute(), 30000));
    },

    /**
     * توليد متجهات (Embeddings) لنص معين
     * @param text النص المدخل
     * @returns مصفوفة المتجهات
     */
    async embed(text: string): Promise<number[]> {
        if (!process.env.GOOGLE_AI_API_KEY) throw new Error(errors.API_KEY_MISSING);
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const execute = async () => {
            const result = await model.embedContent(text);
            return result.embedding.values;
        };
        return await retryOperation(() => withTimeout(execute(), 30000));
    },

    /**
     * إرجاع العدد المقدر للتوكنز
     */
    getTokenCount(text: string): number {
        return getTokenCount(text);
    }
};
