import { notFound } from 'next/navigation';
// @ts-expect-error
import { getSessionById } from '@/actions/sessions';
// @ts-expect-error
import { getIdeasBySession } from '@/actions/ideas';

import { ResultsSummary } from '@/components/session/results-summary';
import { ExportButtons } from '@/components/shared/export-buttons';

// Mock data
const MOCK_SESSION = {
    id: '1',
    title: 'تطوير التطبيق',
    technique: 'Classic',
};
const MOCK_IDEAS = [
    { id: '1', content: 'استخدام الذكاء الاصطناعي في الفرز', score: 85, aiGenerated: false },
    { id: '2', content: 'عمل لوحة تحكم سريعة', score: 70, aiGenerated: true },
];

export default async function SessionResultsPage({
    params,
}: {
    params: { id: string };
}) {
    // const session = await getSessionById(params.id);
    // const ideas = await getIdeasBySession(params.id);
    const session = MOCK_SESSION;
    const ideas = MOCK_IDEAS;

    if (!session) notFound();

    const ideasMap = new Map();
    ideas.forEach(i => ideasMap.set(i.id, i));

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground font-cairo">{session.title}</h1>
                    <p className="text-muted-foreground mt-2 font-tajawal">نتائج جلسة {session.technique}</p>
                </div>
                <ExportButtons
                    data={ideas}
                    filename={\`session-\${session.id}-results\`}
                title={\`نتائج \${session.title}\`}
        />
            </div>

            {/* Results Component */}
            <div className="bg-card p-6 rounded-lg shadow-sm border">
                <ResultsSummary
                    ideas={ideasMap as any}
                    technique={session.technique}
                />
            </div>
        </div>
    );
}
