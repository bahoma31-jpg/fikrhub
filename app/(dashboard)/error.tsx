'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2 font-cairo">حدث خطأ في لوحة التحكم!</h2>
            <p className="text-muted-foreground mb-6 max-w-md font-tajawal">
                {error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'}
            </p>
            <div className="flex gap-4">
                <Button onClick={reset}>إعادة المحاولة</Button>
                <Button variant="outline" asChild>
                    <Link href="/home">العودة للرئيسية</Link>
                </Button>
            </div>
        </div>
    );
}
