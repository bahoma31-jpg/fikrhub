import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground animate-pulse font-tajawal text-lg">جاري التحميل...</p>
    </div>
  );
}