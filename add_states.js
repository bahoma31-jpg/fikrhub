const fs = require('fs');
const path = require('path');

const folders = [
    'home',
    'techniques',
    'session/[id]',
    'session/[id]/results',
    'analytics',
    'workspaces',
    'workspaces/[id]',
    'settings'
];

const dashboardPath = path.join(__dirname, 'app', '(dashboard)');

const loadingCode = \`import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground animate-pulse">جاري التحميل...</p>
    </div>
  );
}\`;

const errorCode = \`'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-6 text-center border-2 border-dashed rounded-xl bg-destructive/5 border-destructive/20">
      <div className="bg-destructive/10 p-4 rounded-full mb-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">عذرًا، حدث خطأ ما</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {error.message || 'فشل تحميل محتوى الصفحة. يرجى المحاولة مرة أخرى.'}
      </p>
      <Button onClick={reset} variant="default" size="lg">
        <RotateCcw className="ml-2 w-5 h-5" /> حاول مرة أخرى
      </Button>
    </div>
  );
}\`;

folders.forEach(folder => {
  const targetDir = path.join(dashboardPath, folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(targetDir, 'loading.tsx'), loadingCode);
  fs.writeFileSync(path.join(targetDir, 'error.tsx'), errorCode);
});

console.log('Loading and Error files created successfully.');
