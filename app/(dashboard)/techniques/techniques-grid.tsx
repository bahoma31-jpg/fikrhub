'use client';

import { useRouter } from 'next/navigation';
import { TechniqueCard } from '@/components/session/technique-card';
import { TECHNIQUES } from '@/data/techniques';
import { Lightbulb, Edit3, RotateCcw, PenTool, Hash, BarChart, Star, Network, Circle } from 'lucide-react';

const iconsMap: Record<string, any> = {
    classic: Lightbulb,
    brainwriting: Edit3,
    reverse: RotateCcw,
    scamper: PenTool,
    six_hats: Hash,
    swot: BarChart,
    starbursting: Star,
    mind_mapping: Network,
    round_robin: Circle,
};

export function TechniquesGrid() {
    const router = useRouter();

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNIQUES.map((technique) => {
                const Icon = iconsMap[technique.id] || Lightbulb;
                return (
                    <TechniqueCard
                        key={technique.id}
                        id={technique.id}
                        title={technique.name_ar}
                        description={technique.description_ar}
                        icon={Icon}
                        tags={[`${technique.duration} دقيقة`, `من ${technique.min_participants} إلى ${technique.max_participants} مشاركين`]}
                        onSelect={(id) => router.push(`/techniques/${id}`)}
                    />
                );
            })}
        </div>
    );
}
