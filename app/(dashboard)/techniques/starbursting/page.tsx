import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'الانفجار النجمي | FikrHub',
  description: 'التركيز على الأسئلة',
};

export default function TechniquePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 text-foreground font-tajawal">
      <div className="flex items-center gap-4 border-b pb-6">
        <div className="text-4xl bg-primary/10 p-4 rounded-lg">⭐</div>
        <div>
          <h1 className="text-4xl font-bold mb-2 text-foreground font-cairo">الانفجار النجمي</h1>
          <p className="text-lg text-muted-foreground font-tajawal">التركيز على الأسئلة</p>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg text-center">
        <p className="font-arabic text-xl mb-2 text-foreground font-tajawal">
          "إِنَّ فِي ذَٰلِكَ لَآيَةً لِّقَوْمٍ يَتَفَكَّرُونَ"
        </p>
        <p className="text-sm text-muted-foreground font-tajawal">النحل: 11</p>
      </div>

      <h2 className="text-2xl font-bold mt-8 font-cairo">القواعد والخطوات</h2>
      <Card>
        <CardContent className="pt-6">
          <ul className="space-y-4 list-disc list-inside text-muted-foreground font-tajawal">
            <li>ركّز على التحفيز الذهني المستمر.</li>
            <li>شجع الأفكار الجامحة والخارجة عن المألوف.</li>
            <li>قم بتأجيل الأحكام أو النقد حتى نهاية الجلسة.</li>
            <li>ابنِ على أفكار الآخرين وطورها.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="pt-8 text-center">
        <Button size="lg" asChild>
          <Link href={"/session/new?technique=" + encodeURIComponent('starbursting')}>
            <Play className="ml-2 w-5 h-4" /> بدء الجلسة
          </Link>
        </Button>
      </div>
    </div>
  );
}
