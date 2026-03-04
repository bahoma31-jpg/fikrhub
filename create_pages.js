const fs = require('fs');
const path = require('path');

const techniques = [
    { id: 'classic', icon: '🧠', title: 'العصف الذهني التقليدي', description: 'توليد أكبر قدر ممكن من الأفكار دون قيود', theme: 'primary' },
    { id: 'brainwriting', icon: '📝', title: 'الكتابة الذهنية', description: 'طريقة منظمة لتوليد الأفكار كتابياً', theme: 'primary' },
    { id: 'reverse', icon: '🔄', title: 'العصف الذهني العكسي', description: 'حل المشكلة بطريقة عكسية', theme: 'destructive' },
    { id: 'scamper', icon: '🔨', title: 'تقنية SCAMPER', description: 'تحويل وتطوير الأفكار بسبعة أسئلة', theme: 'primary' },
    { id: 'six_hats', icon: '🎩', title: 'القبعات الست للتفكير', description: 'نقاش موجه عبر تقمص الأدوار', theme: 'primary' },
    { id: 'swot', icon: '📊', title: 'تحليل SWOT', description: 'نقاط القوة، الضعف، الفرص والتهديدات', theme: 'primary' },
    { id: 'starbursting', icon: '⭐', title: 'الانفجار النجمي', description: 'التركيز على الأسئلة', theme: 'primary' },
    { id: 'mind_mapping', icon: '🕸️', title: 'الخرائط الذهنية', description: 'تمثيل بصري للمعلومات', theme: 'primary' },
    { id: 'round_robin', icon: '⭕', title: 'طريقة الجولة المستديرة', description: 'مشاركة الأفكار بترتيب دائري', theme: 'primary' }
];

const basePath = path.join(__dirname, 'app', '(dashboard)', 'techniques');

if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
}

for (const t of techniques) {
    const dirPath = path.join(basePath, t.id);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const code = `import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Play } from 'lucide-react';

export const metadata: Metadata = {
  title: '${t.title} | FikrHub',
  description: '${t.description}',
};

export default function TechniquePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 text-foreground">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-6">
        <div className="text-4xl bg-${t.theme}/10 p-4 rounded-lg">{/* We don't have lucide emoji so using raw */}'${t.icon}'</div>
        <div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">${t.title}</h1>
          <p className="text-lg text-muted-foreground">${t.description}</p>
        </div>
      </div>

      {/* Quranic Verse */}
      <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg text-center">
        <p className="font-arabic text-xl mb-2 text-foreground">
          "إِنَّ فِي ذَٰلِكَ لَآيَةً لِّقَوْمٍ يَتَفَكَّرُونَ"
        </p>
        <p className="text-sm text-muted-foreground">النحل: 11</p>
      </div>

      {/* Rules */}
      <h2 className="text-2xl font-bold mt-8">القواعد والخطوات</h2>
      <Card>
        <CardContent className="pt-6">
          <ul className="space-y-4 list-disc list-inside text-muted-foreground">
            <li>ركّز على الكم وليس الكيف في البداية.</li>
            <li>شجع الأفكار الجامحة والخارجة عن المألوف.</li>
            <li>قم بتأجيل الأحكام أو النقد حتى نهاية الجلسة.</li>
            <li>ابنِ على أفكار الآخرين وطورها.</li>
          </ul>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="pt-8 text-center">
        <Button size="lg" asChild>
          <Link href={\`/session/new?technique=\${encodeURIComponent('${t.id}')}\`}>
            <Play className="mr-2 w-5 h-5"/> بدء الجلسة
          </Link>
        </Button>
      </div>
    </div>
  );
}
`;

    fs.writeFileSync(path.join(dirPath, 'page.tsx'), code);
}
console.log('Pages created successfully.');
