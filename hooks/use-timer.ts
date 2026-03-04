import { useEffect, useState } from 'react';
import { useSessionStore } from '@/stores/session-store';

export function useTimer(initialTime: number = 0) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const timeRemaining = useSessionStore((state) => state.timeRemaining);
    const isTimerRunning = useSessionStore((state) => state.isTimerRunning);
    const updateTimeRemaining = useSessionStore((state) => state.updateTimeRemaining);
    const toggleTimerStore = useSessionStore((state) => state.toggleTimer);

    useEffect(() => {
        if (initialTime > 0 && timeRemaining === 0) {
            updateTimeRemaining(initialTime);
        }
    }, [initialTime, timeRemaining, updateTimeRemaining]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTimerRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                updateTimeRemaining(timeRemaining - 1);
            }, 1000);
        } else if (timeRemaining === 0 && isTimerRunning) {
            // Auto-stop when reaching 0
            toggleTimerStore();
        }

        return () => clearInterval(interval);
    }, [isTimerRunning, timeRemaining, updateTimeRemaining, toggleTimerStore]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        data: {
            timeRemaining,
            formattedTime: formatTime(timeRemaining),
            isTimerRunning,
            isFinished: timeRemaining === 0
        },
        isLoading,
        error,
        actions: {
            toggleTimer: () => {
                try {
                    toggleTimerStore();
                } catch (err: any) {
                    setError("خطأ في تغيير حالة المؤقت");
                }
            },
            setTime: updateTimeRemaining,
            reset: () => updateTimeRemaining(initialTime),
        }
    };
}
