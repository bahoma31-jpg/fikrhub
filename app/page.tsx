import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lightbulb, Users, Zap, BarChart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'FikrHub - منصة العصف الذهني الإسلامية',
    description: 'أطلق العنان لإبداعك مع 9 تقنيات عصف ذهني احترافية مدعومة بالذكاء الاصطناعي',
    keywords: ['عصف ذهني', 'أفكار', 'إبداع', 'إسلامي', 'ذكاء اصطناعي'],
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-tajawal">
            {/* Hero Section */}
            <section className="container py-20 text-center mx-auto">
                <h1 className="text-5xl font-bold mb-6">
                    FikrHub 💡
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    منصة إسلامية احترافية للعصف الذهني مع 9 تقنيات مثبتة علميًا
                </p>
                <div className="flex gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/home">ابدأ الآن مجانًا</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/techniques">اكتشف التقنيات</Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="container py-16 mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Lightbulb className="w-8 h-8" />}
                        title="9 تقنيات"
                        description="من الكلاسيكية إلى الإلكترونية"
                    />
                    <FeatureCard
                        icon={<Users className="w-8 h-8" />}
                        title="تعاون فوري"
                        description="عمل جماعي في الوقت الفعلي"
                    />
                    <FeatureCard
                        icon={<Zap className="w-8 h-8" />}
                        title="ذكاء اصطناعي"
                        description="Gemini Flash 2.0 لتحسين الأفكار"
                    />
                    <FeatureCard
                        icon={<BarChart className="w-8 h-8" />}
                        title="تحليلات"
                        description="تتبع التقدم والإنتاجية"
                    />
                </div>
            </section>

            {/* Quranic Inspiration */}
            <section className="container py-16 text-center mx-auto">
                <div className="bg-muted/50 p-8 rounded-lg max-w-3xl mx-auto">
                    <p className="text-2xl font-arabic mb-4">
                        "وَفِي أَنفُسِكُمْ ۚ أَفَلَا تُبْصِرُونَ"
                    </p>
                    <p className="text-muted-foreground font-tajawal">الذاريات: 21</p>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-6 border bg-card rounded-lg text-center hover:shadow-md transition-all">
            <div className="mb-4 flex justify-center text-primary">{icon}</div>
            <h3 className="font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
}
