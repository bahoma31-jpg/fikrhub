import type { Metadata } from 'next';
// @ts-expect-error
import { auth } from '@/lib/auth';
// @ts-expect-error
import { getUserAnalytics } from '@/actions/analytics';

import { SessionChart } from '@/components/analytics/session-chart';
import { StatsCard } from '@/components/analytics/stats-card';
import { ProgressTracker } from '@/components/analytics/progress-tracker';
import { Trophy, Target, Award, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'الإحصائيات | FikrHub',
    description: 'تتبع تقدمك وإنتاجيتك',
};

// Mock data
const MOCK_ANALYTICS = {
    stats: [
        { title: 'أفضل جلسة', value: 'تطوير التطبيق', icon: Trophy },
        { title: 'التقنية المفضلة', value: 'Classic', icon: Brain },
        { title: 'معدل الإنتاجية', value: '85%', icon: Target },
        { title: 'جوائز مكتسبة', value: 3, icon: Award }
    ],
    topIdeas: [
        { text: 'استخدام الذكاء الاصطناعي في الفرز', score: 85 },
        { text: 'عمل لوحة تحكم سريعة', score: 70 },
        { text: 'تطبيق تقنية بومودورو', score: 65 }
    ],
    chartData: [
        { name: 'Jan', ideas: 5 },
        { name: 'Feb', ideas: 12 },
        { name: 'Mar', ideas: 8 },
    ]
};

const MOCK_STEPS = [
    { label: 'البداية', status: 'completed' as const },
    { label: 'النمو', status: 'current' as const },
    { label: 'الإتقان', status: 'upcoming' as const },
];

export default async function AnalyticsPage() {
    const user = { user: { id: '1' } };
    const analytics = MOCK_ANALYTICS;

    return (
        <div className="space-y-8 p-4 text-foreground">
            <h1 className="text-4xl font-bold font-cairo">الإحصائيات</h1>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analytics.stats.map((stat, i) => (
                    <StatsCard key={i} title={stat.title} value={stat.value as string} icon={stat.icon as any} />
                ))}
            </div>

            {/* Charts & Tracker */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border p-6 rounded-xl bg-card/50">
                <SessionChart data={analytics.chartData} />
                <div className="space-y-4">
                    <h3 className="font-bold text-center font-cairo">تتبع مستوى الإنجاز</h3>
                    <ProgressTracker steps={MOCK_STEPS} />
                </div>
            </div>

            {/* Top Ideas */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold mt-8 font-cairo">أفضل الأفكار المقيّمة</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {analytics.topIdeas.map((idea, i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-cairo">فكرة رائعة</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium text-muted-foreground font-tajawal">{idea.text}</p>
                                <div className="mt-4 flex justify-between items-center text-sm font-bold text-primary font-tajawal">
                                    <span>التقييم:</span>
                                    <span className="bg-primary/10 px-2 py-1 rounded-md">{idea.score}/100</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
