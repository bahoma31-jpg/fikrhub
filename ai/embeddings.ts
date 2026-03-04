// ملف: ai/embeddings.ts
// الوصف: المعالجة وتوليد المتجهات للأفكار والنصوص

import { geminiClient } from "./client";

/**
 * توليد تمثيل رياضي (متجه) لنص مفرد
 * @param text النص المدخل
 * @returns مصفوفة المتجهات
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    return await geminiClient.embed(text);
}

/**
 * توليد מתجهات لعدة نصوص متزامنة
 * @param texts قائمة بالنصوص
 * @returns قائمة بالمتجهات المتزامنة
 */
export async function batchEmbed(texts: string[]): Promise<number[][]> {
    const promises = texts.map(text => geminiClient.embed(text));
    return await Promise.all(promises);
}

/**
 * حساب التشابه بين متجهين باستخدام توافق جيب التمام (Cosine Similarity)
 * @param vecA المتجه الأول
 * @param vecB المتجه الثاني
 * @returns درجة التشابه (0 إلى 1)
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
