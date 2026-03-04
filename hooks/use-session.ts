import { useState, useEffect } from 'react';
import { useSessionStore, Session } from '@/stores/session-store';

export function useSession() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currentSession = useSessionStore((state) => state.currentSession);
    const startSessionStore = useSessionStore((state) => state.startSession);
    const endSessionStore = useSessionStore((state) => state.endSession);

    // Example API calls (mocked for foundation phase)
    const fetchSession = async (sessionId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // API call to /api/sessions/:id
            // const res = await fetch(`/api/sessions/${sessionId}`);
            // const { data } = await res.json();

            const mockData: Session = {
                id: sessionId,
                title: "جلسة عصف ذهني",
                status: 'active',
                participantsCount: 1,
                timeRemaining: 1800, // 30 minutes
            };
            startSessionStore(mockData);
        } catch (err: any) {
            setError(err?.message || "فشل تحميل الجلسة");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data: currentSession,
        isLoading,
        error,
        actions: {
            fetchSession,
            startSession: startSessionStore,
            endSession: endSessionStore,
        }
    };
}
