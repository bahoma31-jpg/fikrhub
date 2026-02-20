# 🧠 FikrHub - منصة العصف الذهني المتقدم

الأساس التقني لمنصة **FikrHub**، المصممة لدعم المبدعين والفرق في توليد الأفكار وتنظيمها باستخدام الذكاء الاصطناعي، مع واجهة عربية أصيلة.

## 🔥 التقنيات المستخدمة (Stack)
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Supabase) + pgvector
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js (v5 Beta)
- **UI**: Tailwind CSS + Shadcn/ui
- **Validation**: Zod

## 🚀 طريقة التشغيل (Setup)

1. **تثبيت المكتبات**:
   ```bash
   npm install
   ```

2. **إعداد متغيرات البيئة**:
   قم بنسخ ملف `.env.example` إلى `.env` وقم بتعبئة القيم المطلوبة:
   ```bash
   cp .env.example .env
   ```

3. **تجهيز قاعدة البيانات**:
   ```bash
   # دفع المخططات (Schema) لقاعدة البيانات
   npm run db:push

   # بذر البيانات الأولية (Verses, Duas, Templates)
   npm run db:seed
   ```

4. **تشغيل المشروع**:
   ```bash
   npm run dev
   ```

## 📂 هيكلية قاعدة البيانات (Schema)
تم تصميم الجداول بناءً على معايير **3NF**:
- **Users**: الحسابات والمصادقة.
- **Workspaces**: مساحات العمل الجماعية.
- **Sessions**: جلسات العصف الذهني (Techniques: Classic, Brainwriting, etc).
- **Ideas**: الأفكار والمشاريع مع دعم البحث الدلالي (Vector Search).
- **Islamic Content**: آيات وأدعية مُلهمة.

## 📜 القواعد البرمجية (Core Rules)
- **Strict Mode**: TypeScript مفعل بشكل كامل.
- **Arabic First**: التعليقات والتوثيق والواجهة باللغة العربية.
- **Error Handling**: كل دالة تحتوي على معالجة للأخطاء مع Logging.
- **Zod**: التحقق من كافة المدخلات.

---
*بنيت بكل فخر لخدمة العقل العربي المبدع.*