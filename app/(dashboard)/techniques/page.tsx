import type { Metadata } from 'next';
import { TechniquesGrid } from './techniques-grid';

export const metadata: Metadata = {
    title: 'تقنيات العصف الذهني | FikrHub',
    description: '9 تقنيات مثبتة علميًا للعصف الذهني الاحترافي',
};

export default function TechniquesPage() {
    return (
        <div className="space-y-8 p-4">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold mb-4 text-foreground">تقنيات العصف الذهني</h1>
                <p className="text-lg text-muted-foreground">
                    اختر التقنية المناسبة لتحدياتك الإبداعية
                </p>
            </div>

            {/* Techniques Grid (Client Component to handle navigation) */}
            <TechniquesGrid />

            {/* Info Section */}
            <div className="bg-muted p-6 rounded-lg text-foreground">
                <h3 className="font-bold text-lg mb-2">كيف تختار التقنية المناسبة؟</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>الكلاسيكية</strong>: للبداية والمشاكل العامة</li>
                    <li>• <strong>الكتابة الذهنية</strong>: للانطوائيين والعمل الفردي</li>
                    <li>• <strong>العكسية</strong>: للمشاكل المستعصية</li>
                    <li>• <strong>القبعات الست</strong>: لتحليل شامل من زوايا مختلفة</li>
                </ul>
            </div>
        </div>
    );
}
