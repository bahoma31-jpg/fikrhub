import type { Metadata } from 'next';
// @ts-expect-error - Assuming A2 will provide this - using mock for now to prevent build errors
// import { auth } from '@/lib/auth';
// import { getUserStats } from '@/actions/analytics'; 
import { StatsCard } from '@/components/analytics/stats-card';
import { Lightbulb, Clock, CheckCircle, Zap, Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'لوحة التحكم | FikrHub',
    description: 'نظرة عامة على جلساتك وأفكارك',
};

// Mock data until A4 is ready
const MOCK_USER = { id: '1', name: 'مستخدم تجريبي' };
const MOCK_STATS = [
    { title: 'إجمالي الجلسات', value: 12, icon: Clock, trend: { value: 10, isPositive: true } },
    { title: 'الأفكار المولدة', value: 154, icon: Lightbulb, trend: { value: 25, isPositive: true } },
    { title: 'أفكار مكتملة', value: 45, icon: CheckCircle },
    { title: 'مستوى الإبداع', value: '85%', icon: Zap },
];
const MOCK_SESSIONS = [
    { id: '1', title: 'تطوير التطبيق', technique: 'Classic', date: '2026-03-01' },
    { id: '2', title: 'حملة تسويقية', technique: 'Brainwriting', date: '2026-03-02' },
];

export default async function HomePage() {
    // const session = await auth();
    // const stats = await getUserStats(session!.user.id);
    const session = { user: MOCK_USER };

    return (
        <div className="space-y-8 p-4">
            {/* ترحيب مع آية */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border">
                <h1 className="text-3xl font-bold mb-2 text-foreground">
                    مرحبًا، {session!.user.name} 👋
                </h1>
                <p className="text-muted-foreground mb-4">
                    استمر في رحلتك الإبداعية مع FikrHub
                </p>
                <div className="p-4 bg-background border rounded-md">
                    <p className="font-arabic text-lg text-center text-foreground">
                        "رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي"
                    </p>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                        طه: 25-26
                    </p>
                </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_STATS.map((stat, i) => (
                    <StatsCard key={i} title={stat.title} value={stat.value} icon={stat.icon as any} trend={stat.trend} />
                ))}
            </div>

            {/* إجراءات سريعة */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">إجراءات سريعة</h2>
                <div className="flex gap-4">
                    <Button asChild>
                        <Link href="/techniques"><Plus className="mr-2 w-4 h-4" /> بدء جلسة جديدة</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/workspaces"><Plus className="mr-2 w-4 h-4" /> إنشاء فريق</Link>
                    </Button>
                </div>
            </div>

            {/* الجلسات الأخيرة */}
            <div className="space-y-4 shadow-sm border p-4 rounded-lg bg-card">
                <h2 className="text-2xl font-bold text-card-foreground">الجلسات الأخيرة</h2>
                <div className="divide-y divide-border">
                    {MOCK_SESSIONS.map((s) => (
                        <div key={s.id} className="py-4 flex items-center justify-between">
                            <div>
                                <p className="font-bold text-card-foreground">{s.title}</p>
                                <p className="text-sm text-muted-foreground">{s.technique} • {s.date}</p>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/session/${s.id}`}><Play className="mr-2 w-4 h-4" /> استئناف</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
