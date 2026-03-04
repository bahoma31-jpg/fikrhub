# Framer Motion Presets

هذا الملف يحتوي على التوثيق الخاص بإعدادات الحركات التفاعلية التي تم تجهيزها في `lib/animations.ts`

## 1. fadeIn
يستخدم للظهور التدريجي للمكونات (الأساسي).
```typescript
export const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 }
}
```
**استخدام:**
```tsx
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

<motion.div {...fadeIn}>
  <IdeaCard idea={idea} />
</motion.div>
```

## 2. slideInRef
يستخدم لدخول المكونات من الجوانب (مثل الرسائل والإشعارات الجانبية).
```typescript
export const slideInRef = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: 'easeOut' }
}
```

## 3. scaleUp
تأثير النبض أو التكبير المتزن (ممتاز للنوافذ المنبثقة والمودال).
```typescript
export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  // ... parameters
}
```

## 4. Stagger Effects (staggerContainer & listItem)
يُستخدم مع القوائم المعقدة لجعل عناصرها תظهر بتتابع مرئي أنيق مما يعكس حداثة وسلاسة الواجهة.
