"use client";

import { Button } from '@/components/ui/button';
import { Idea } from '@/stores/ideas-store';
import { useState } from 'react';
import { ChevronUp, ChevronDown, Activity } from 'lucide-react';

interface VotingPanelProps {
    ideas: Idea[];
    onVote: (ideaId: string, direction: 'up' | 'down') => Promise<void>;
    isLoading?: boolean;
    maxVotesPerUser?: number;
}

export function VotingPanel({
    ideas,
    onVote,
    isLoading = false,
    maxVotesPerUser = 5
}: VotingPanelProps) {
    const [votesLeft, setVotesLeft] = useState(maxVotesPerUser);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const topIdeas = [...ideas].sort((a, b) => b.votes - a.votes).slice(0, 5); // top 5

    const handleVote = async (id: string, dir: 'up' | 'down') => {
        if (dir === 'up' && votesLeft <= 0) return;

        setLoadingId(id);
        try {
            await onVote(id, dir);
            if (dir === 'up') setVotesLeft(prev => prev - 1);
            if (dir === 'down') setVotesLeft(prev => prev + 1);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full">
            <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-3">
                <h3 className="font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    جلسة التصويت
                </h3>
                <span className="text-sm font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                    الأصوات المتبقية: {votesLeft}
                </span>
            </div>

            <div className="space-y-3">
                {topIdeas.map(idea => (
                    <div key={idea.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                        <p className="text-sm line-clamp-2 pr-2 flex-1">{idea.content}</p>

                        <div className="flex items-center gap-1 bg-background border border-border rounded-md px-1 mr-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-primary hover:text-primary hover:bg-primary/10"
                                disabled={votesLeft === 0 || loadingId === idea.id || isLoading}
                                onClick={() => handleVote(idea.id, 'up')}
                            >
                                <ChevronUp className="h-4 w-4" />
                            </Button>
                            <span className="w-6 text-center text-sm font-bold min-w-max">
                                {idea.votes}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                disabled={loadingId === idea.id || isLoading}
                                onClick={() => handleVote(idea.id, 'down')}
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                {topIdeas.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-4">لا توجد أفكار للتصويت عليها بعد.</p>
                )}
            </div>
        </div>
    );
}
