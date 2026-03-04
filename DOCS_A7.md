# A7: Documentation - Payments & Export (وكيل الدفع والتصدير)

هذا الملف يوثق العمل المنجز بواسطة الوكيل A7 في مشروع FikrHub.

## 🚀 المسارات (Routes) المضافة

### 1. الدفع (Payments)
- **POST `/api/payments/checkout`**: إنشاء جلسة دفع Stripe Checkout. يتطلب `priceId` ويقوم بإعادة توجيه المستخدم لصفحة Stripe.
- **POST `/api/payments/webhook`**: معالجة أحداث Stripe (نجاح الدفع، تحديث الاشتراك، الإلغاء) وتحديث قاعدة البيانات.

### 2. المحتوى الإسلامي (Islamic Content)
- **GET `/api/islamic/verse`**: جلب آية قرآنية عشوائية. يمكن تمرير `context` (motivation, patience, creativity, reflection).
- **GET `/api/islamic/dua`**: جلب دعاء حسب السياق (session-start, session-end, inspiration, gratitude).

### 3. التصدير (Export)
- **GET `/api/sessions/[id]/export`**: تصدير جلسة عصف ذهني بصيغة PDF أو Excel. يتم الرفع إلى Supabase وإرجاع رابط موقت (Signed URL).

## 🛠️ الخدمات (Services)

### `subscription.service.ts`
- `checkLimit(userId, limitType)`: التحقق من حدود الخطة المجانية (جلسات، أفكار).
- `isProFeature(userId)`: التحقق هل الميزة متاحة للمستخدم بناءً على اشتراكه.
- `upgradeSubscription(...)`: تفعيل الاشتراك المدفوع للمستخدم.

### `islamic.service.ts`
- `getRandomVerse(context)`: اختيار آية من قاعدة البيانات الثابتة.
- `getDuaByContext(context)`: اختيار دعاء من قاعدة البيانات الثابتة.

### `export.service.ts`
- `generatePDF(sessionId)`: توليد ملف PDF احترافي يتضمن الأفكار.
- `generateExcel(sessionId)`: توليد ملف Excel (XLSX) للتحليل.

## 📦 المكتبات المضافة (Dependencies)
- `stripe`: للتكامل مع بوابة الدفع.
- `jspdf`: لتوليد ملفات PDF.
- `xlsx`: لتوليد ملفات Excel.
- `@supabase/supabase-js`: للرفع والتخزين السحابي للملفات المصدّرة.

## ⚠️ ملاحظات هامة
- يجب إعداد متغيرات البيئة التالية في `.env`:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- نظام التصدير حالياً يتحقق من الحدود منطقياً، ولكن يحتاج لإضافة حقل `exports_count` في قاعدة البيانات مستقبلاً لتتبع أدق.
