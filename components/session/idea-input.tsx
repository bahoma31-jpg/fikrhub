"use client";

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface IdeaInputProps {
    onSubmit: (content: string) => Promise<void>;
    isLoading?: boolean;
    placeholder?: string;
    isTimerRunning?: boolean;
}

export function IdeaInput({
    onSubmit,
    isLoading = false,
    placeholder = "اكتب فكرتك هنا...",
    isTimerRunning = true
}: IdeaInputProps) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !isTimerRunning || isLoading) return;

        await onSubmit(content);
        setContent('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    };

    return (
        <div className="w-full bg-card border border-border rounded-xl p-3 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isTimerRunning ? placeholder : "المؤقت متوقف، لا يمكن إضافة أفكار الآن"}
                    disabled={!isTimerRunning || isLoading}
                    className="min-h-[80px] resize-none border-none focus-visible:ring-0 px-2 py-1 text-base bg-transparent p-0"
                />

                <div className="flex justify-between items-center mt-2 border-t border-border/50 pt-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                <Sparkles className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>طلب مساعدة من الذكاء الاصطناعي</p>
                        </TooltipContent>
                    </Tooltip>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground hidden sm:inline-block">
                            اضغط Enter للإرسال
                        </span>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={!content.trim() || !isTimerRunning || isLoading}
                            className="px-4"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                                    إرسال
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
