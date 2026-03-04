"use client";

import { useTimer } from '@/hooks/use-timer';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface SessionTimerProps {
    initialTime?: number; // In seconds
}

export function SessionTimer({ initialTime = 1800 }: SessionTimerProps) {
    const { data: { timeRemaining, formattedTime, isTimerRunning, isFinished }, actions: { toggleTimer, reset, setTime } } = useTimer(initialTime);

    // Warning color when time is critical (less than 3 minutes)
    const isCritical = timeRemaining > 0 && timeRemaining <= 180;

    // Update time if initialTime changes
    useEffect(() => {
        if (initialTime > 0) {
            setTime(initialTime);
        }
    }, [initialTime, setTime]);

    return (
        <div className="flex flex-col items-center p-6 bg-card border border-border rounded-xl shadow-sm">
            <div className={cn(
                "text-5xl font-mono font-bold mb-6 tracking-wider transition-colors duration-500",
                isCritical ? "text-destructive animate-pulse" : "text-primary",
                isFinished && "text-muted-foreground"
            )}>
                {formattedTime}
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant={isTimerRunning ? "outline" : "default"}
                    size="lg"
                    onClick={toggleTimer}
                    className="w-32 gap-2"
                    disabled={isFinished}
                >
                    {isTimerRunning ? (
                        <>
                            <Pause className="w-5 h-5" /> إيقاف
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5" /> تشغيل
                        </>
                    )}
                </Button>

                <Button
                    variant="secondary"
                    size="lg"
                    onClick={reset}
                    className="w-32 gap-2"
                >
                    <RotateCcw className="w-5 h-5" /> إعادة ضبط
                </Button>
            </div>

            {isFinished && (
                <p className="mt-4 text-sm text-destructive font-medium bg-destructive/10 px-4 py-2 rounded-full">
                    انتهى الوقت المحدد للجلسة!
                </p>
            )}
        </div>
    );
}
