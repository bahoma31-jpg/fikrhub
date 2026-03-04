import { useState, useEffect } from 'react';
import { useIdeasStore, Idea } from '@/stores/ideas-store';

export function useIdeas(sessionId?: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ideas = useIdeasStore((state) => state.ideas);
    const setIdeas = useIdeasStore((state) => state.setIdeas);
    const addIdeaStore = useIdeasStore((state) => state.addIdea);
    const voteIdeaStore = useIdeasStore((state) => state.voteIdea);
    const deleteIdeaStore = useIdeasStore((state) => state.deleteIdea);

    const fetchIdeas = async () => {
        if (!sessionId) return;
        setIsLoading(true);
        setError(null);
        try {
            // API call to fetch ideas
            // const res = await fetch(`/api/ideas?sessionId=${sessionId}`);
            // const { data } = await res.json();
            setIdeas([]); // Replace with actual data once API is integrated
        } catch (err: any) {
            setError(err?.message || "فشل تحميل الأفكار");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (sessionId) {
            fetchIdeas();
        }
    }, [sessionId]);

    return {
        data: ideas,
        isLoading,
        error,
        actions: {
            fetchIdeas,
            addIdea: async (idea: Omit<Idea, 'id' | 'createdAt'>) => {
                try {
                    await addIdeaStore(idea);
                } catch (err: any) {
                    setError(err?.message || "فشل إضافة الفكرة");
                }
            },
            voteIdea: async (ideaId: string) => {
                try {
                    await voteIdeaStore(ideaId);
                } catch (err: any) {
                    setError(err?.message || "فشل التصويت على الفكرة");
                }
            },
            deleteIdea: async (ideaId: string) => {
                try {
                    await deleteIdeaStore(ideaId);
                } catch (err: any) {
                    setError(err?.message || "فشل حذف الفكرة");
                }
            }
        }
    };
}
