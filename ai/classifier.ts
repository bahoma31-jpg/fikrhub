// ملف: ai/classifier.ts
// الوصف: تصنيف الأفكار وتجميعها بناءً على التشابه الدلالي (Semantic Similarity)

import { batchEmbed, cosineSimilarity } from "./embeddings";
import { geminiClient } from "./client";
import { promptBuilders } from "./prompts";
import { personas } from "./personas";
import { Idea } from "@/types/idea.types";

export interface IdeaCluster {
    name: string;
    description: string;
    tags: string[];
    ideas: Idea[];
}

/**
 * تجميع الأفكار المتشابهة ثم إرسالها للذكاء الاصطناعي لوضع عنوان مناسب لكل مجموعة
 * @param ideas قائمة الأفكار المحولة من الجلسة
 * @returns قائمة بالمجموعات المصنفة
 */
export async function clusterIdeas(ideas: any[]): Promise<IdeaCluster[]> {
    if (!ideas || ideas.length === 0) return [];

    // استخراج النصوص للت벡터ة
    const texts = ideas.map(idea => idea.content || idea.title || "");
    const vectors = await batchEmbed(texts);

    const threshold = 0.85;
    const clusters: Idea[][] = [];
    const usedIndices = new Set<number>();

    // عملية تجميع تعتمد على التشابه (Clustering)
    for (let i = 0; i < ideas.length; i++) {
        if (usedIndices.has(i)) continue;

        const currentCluster = [ideas[i]];
        usedIndices.add(i);

        for (let j = i + 1; j < ideas.length; j++) {
            if (usedIndices.has(j)) continue;

            const sim = cosineSimilarity(vectors[i], vectors[j]);
            if (sim >= threshold) {
                currentCluster.push(ideas[j]);
                usedIndices.add(j);
            }
        }
        clusters.push(currentCluster);
    }

    // إعداد المجموعات ومنحها مسميات عن طريق الـ LLM إذا تطلب الأمر
    const persona = personas["المحلل"]; // اختيار المحلل للتصنيف لأسلوبه المنطقي

    const finalClusters: IdeaCluster[] = [];

    for (const cluster of clusters) {
        // إذا كان هناك فكرة واحدة فقط قد لا تحتاج لتسمية ذكية
        const topic = cluster.map((c, i) => `${i + 1}. ${c.content}`).join("\n");
        const prompt = promptBuilders.classify(persona, topic);

        try {
            const respText = await geminiClient.generate(prompt);
            const parsed = JSON.parse(respText.replace(/```json|```/g, "").trim());
            const clusterMeta = parsed.clusters[0] || { name: "أفكار متنوعة", description: "", tags: [] };

            finalClusters.push({
                name: clusterMeta.name,
                description: clusterMeta.description,
                tags: clusterMeta.tags || [],
                ideas: cluster
            });
        } catch (error) {
            // في حالة الفشل في التوليد، ضع مسميات افتراضية
            finalClusters.push({
                name: "مجموعة أفكار مترابطة",
                description: "تم تجميعها بناءً على التشابه الدلالي",
                tags: [],
                ideas: cluster
            });
        }
    }

    return finalClusters;
}

export async function findSimilar(queryIdea: string, allIdeas: { id: string, content: string }[]): Promise<{ id: string, content: string, similarity: number }[]> {
    const qVec = await geminiClient.embed(queryIdea);
    const texts = allIdeas.map(i => i.content);
    const vectors = await batchEmbed(texts);

    return allIdeas.map((idea, idx) => ({
        ...idea,
        similarity: cosineSimilarity(qVec, vectors[idx])
    })).sort((a, b) => b.similarity - a.similarity);
}
