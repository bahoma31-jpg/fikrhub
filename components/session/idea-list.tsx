"use client";

import { Idea } from '@/stores/ideas-store';
import { IdeaCard } from './idea-card';
import { EmptyState } from '@/components/shared/empty-state';
import { LightbulbOutline } from 'lucide-react'; // LightbulbOutline doesn't exist, using Lightbulb
import { Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IdeaListProps {
    ideas: Idea[];
    onVote: (ideaId: string) => void;
    isLoading?: boolean;
}

export function IdeaList({ ideas, onVote, isLoading = false }: IdeaListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-40 bg-muted/50 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (ideas.length === 0) {
        return (
            <EmptyState
                icon={Lightbulb}
                title="لا توجد أفكار بعد"
                description="كن أول من يشارك فكرة في هذه الجلسة!"
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            <AnimatePresence mode="popLayout">
                {ideas.map((idea) => (
                    <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        layout
                    >
                        <IdeaCard
                            idea={idea}
                            onVote={onVote}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
