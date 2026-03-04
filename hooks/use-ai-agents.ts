import { useState } from 'react';

export interface AiAgentMessage {
    id: string;
    role: 'system' | 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export function useAiAgents(sessionId: string) {
    const [messages, setMessages] = useState<AiAgentMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (content: string, ideaId?: string) => {
        setIsLoading(true);
        setError(null);

        // Add user message optimistically
        const userMsg: AiAgentMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMsg]);

        try {
            // Simulate API call to AI agent
            // const res = await fetch('/api/ai/ask', { ... })

            // Mock response
            const assistantMsg: AiAgentMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: `هذا مجرد رد تجريبي من الذكاء الاصطناعي على رسالتك: "${content}".`,
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, assistantMsg]);
        } catch (err: any) {
            setError(err?.message || "فشل الاتصال بالذكاء الاصطناعي");
        } finally {
            setIsLoading(false);
        }
    };

    const clearHistory = () => {
        setMessages([]);
    };

    return {
        data: messages,
        isLoading,
        error,
        actions: {
            sendMessage,
            clearHistory,
        }
    };
}
