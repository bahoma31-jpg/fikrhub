"use client";

import { ThumbsUp, Trash2, Edit2, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Idea } from '@/stores/ideas-store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface IdeaCardProps {
    idea: Idea;
    onVote: (ideaId: string) => void;
    onEdit?: (ideaId: string) => void;
    onDelete?: (ideaId: string) => void;
    isVoting?: boolean;
    showVotes?: boolean;
}

export function IdeaCard({
    idea,
    onVote,
    onEdit,
    onDelete,
    isVoting = false,
    showVotes = true
}: IdeaCardProps) {

    const formattedDate = formatDistanceToNow(new Date(idea.createdAt), {
        addSuffix: true,
        locale: ar
    });

    return (
        <Card className="hover:shadow-md transition-shadow group">
            <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                    <p className="text-base text-card-foreground leading-relaxed whitespace-pre-wrap">
                        {idea.content}
                    </p>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {onEdit && (
                                <DropdownMenuItem onClick={() => onEdit(idea.id)}>
                                    <Edit2 className="h-4 w-4 ml-2" /> تعديل
                                </DropdownMenuItem>
                            )}
                            {onDelete && (
                                <DropdownMenuItem onClick={() => onDelete(idea.id)} className="text-destructive focus:text-destructive">
                                    <Trash2 className="h-4 w-4 ml-2" /> حذف
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm border-t border-border/40 mt-2">
                <div className="flex items-center gap-2 pt-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${idea.userId || 'User'}`} />
                        <AvatarFallback className="text-[10px]">م</AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-xs">{formattedDate}</span>
                </div>

                {showVotes && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onVote(idea.id)}
                        disabled={isVoting}
                        className={`h-8 px-2 gap-1.5 ${idea.votes > 0 ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                        <ThumbsUp className={`h-4 w-4 ${idea.votes > 0 ? 'fill-primary text-primary' : ''}`} />
                        <span className="font-medium">{idea.votes}</span>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
