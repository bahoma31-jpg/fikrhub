"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Sparkles, Bot } from 'lucide-react';

interface AiAgentAvatarProps {
    name: string;
    role: string;
    avatarUrl?: string;
    isActive?: boolean;
    className?: string;
}

export function AiAgentAvatar({
    name,
    role,
    avatarUrl,
    isActive = false,
    className
}: AiAgentAvatarProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={cn("relative inline-block cursor-help", className)}>
                        <Avatar className={cn("h-10 w-10 border-2 transition-all", isActive ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background" : "border-border")}>
                            <AvatarImage src={avatarUrl} alt={name} />
                            <AvatarFallback className="bg-primary/5 text-primary">
                                <Bot className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>

                        {isActive && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                        )}

                        <div className="absolute -bottom-1 -left-1 bg-background rounded-full p-0.5 border border-border shadow-sm">
                            <Sparkles className="h-3 w-3 text-amber-500" />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent align="center" className="flex flex-col gap-1 p-2">
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
