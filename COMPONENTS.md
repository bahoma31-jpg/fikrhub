# FikrHub Components Library

هذا الملف يحتوي على توثيق جميع المكونات البصرية في نظام FikrHub المبنية بالاعتماد على React 19، TailwindCSS، و Shadcn/ui.

## Session Components (مكونات الجلسة)

### IdeaCard
**الهدف:** عرض فكرة واحدة مع إمكانية التصويت والتعديل داخل جلسة العصف الذهني.
**الخصائص (Props):**
```typescript
interface IdeaCardProps {
  idea: Idea; // من ideas-store
  onVote: (ideaId: string) => void;
  onEdit?: (ideaId: string) => void;
  onDelete?: (ideaId: string) => void;
  isVoting?: boolean;
  showVotes?: boolean;
}
```

### IdeaInput
**الهدف:** حقل إدخال ذكي متصل مع الذكاء الاصطناعي ويراقب حالة المؤقت.
**الخصائص (Props):**
```typescript
interface IdeaInputProps {
  onSubmit: (content: string) => Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  isTimerRunning?: boolean;
}
```

### SessionTimer
**الهدف:** مؤقت زمني حي يتصل بـ session-store ويبلغ المستخدمين قرب انتهاء الوقت.

### ResultsSummary
**الهدف:** مكون إحصائي متلائم لعرض أعلى الأفكار في نهاية الجلسة.

## Islamic Components (المكونات الإسلامية)

### VerseBanner
**الهدف:** عرض آية قرآنية متغيرة تحفيزية بشكل آلي.

### DuaModal
**الهدف:** نافذة منبثقة (Modal) تحتوي على أدعية التيسير والبركة قبل التفاعل في المنصة.

### NiyyahReminder
**الهدف:** تذكير بتجديد النية للمستخدم يظهر بشكل طافي أسفل أو أعلى الشاشة ويختفي بعد الإغلاق.

## Analytics Components (مكونات التحليل)

### SessionChart
**الهدف:** رسم بياني باستخدام Recharts لاستعراض معدل الإنتاجية من الأفكار خلال مقياس زمني محدد.

### ProgressTracker
**الهدف:** إظهار التقدم الخطي لخطوات الجلسة (الحالية، السابقة، التالية).

## Shared Components (مكونات مشتركة)
- **LoadingSpinner**: مؤشر تحميل مركزي للمنصة.
- **ErrorBoundary**: مصيدة للأخطاء البرمجية لمنع انهيار الواجهة.
- **EmptyState**: حالة توضح عدم وجود بيانات بطريقة أنيقة.
- **ExportButtons**: أزرار لتصدير البيانات إلى PDF و CSV.
