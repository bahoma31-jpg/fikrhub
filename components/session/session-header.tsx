"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Session } from '@/stores/session-store';
import { ArrowRight, Share2, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SessionHeaderProps {
    session: Session | null;
    onShare?: () => void;
}

export function SessionHeader({ session, onShare }: SessionHeaderProps) {
    const router = useRouter();

    if (!session) return null;

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card border-b border-border shadow-sm">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold font-tajawal text-card-foreground">
                        {session.title}
                    </h1>
                    <Badge variant={session.status === 'active' ? "default" : "secondary"} className="text-xs">
                        {session.status === 'active' ? 'نشطة الآن' : 'مكتملة'}
                    </Badge>
                </div>

                <p className="text-muted-foreground text-sm flex items-center gap-2 pr-10">
                    <Users className="w-4 h-4" />
                    {session.participantsCount} مشارك
                </p>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0 pr-10 md:pr-0">
                <Button variant="outline" size="sm" onClick={onShare} className="gap-2">
                    <Share2 className="w-4 h-4" />
                    مشاركة الجلسة
                </Button>
            </div>
        </div>
    );
}
