# 📦 سجل التبعيات (DEPENDENCIES.md)

حسب القاعدة رقم 17، يتم توثيق كافة المكتبات المستخدمة في المشروع هنا.

## مكتبات الإنتاج (Production Dependencies)
- **next (15.1.7)**: إطار العمل الأساسي (App Router).
- **drizzle-orm**: الواجهة البرمجية للتعامل مع قاعدة البيانات.
- **@neondatabase/serverless / pg**: محركات الاتصال بـ PostgreSQL.
- **next-auth (beta)**: نظام المصادقة والمفاتيح.
- **@auth/drizzle-adapter**: محول Drizzle لنظام NextAuth.
- **zustand**: إدارة الحالة العالمية (State Management).
- **zod**: التحقق من صحة المدخلات.
- **dotenv**: إدارة متغيرات البيئة.
- **react-hook-form**: إدارة نماذج الإدخال (Forms).
- **@hookform/resolvers**: ربط Zod مع React Hook Form.
- **stripe**: تكامل بوابة الدفع.
- **class-variance-authority**: إدارة متغيرات الأنماط (Component Variants).
- **lucide-react**: مكتبة الأيقونات المستخدمة في UI.
- **clsx / tailwind-merge**: أدوات دمج أصناف CSS.
- **radix-ui**: المكونات الأساسية (Primitives) لـ shadcn/ui.

## أدوات التطوير (Dev Dependencies)
- **drizzle-kit**: أدوات الهجرة وإدارة نظام Drizzle.
- **tsx**: تشغيل ملفات TypeScript (Seed/Scripts).
- **typescript**: لغة البرمجة الأساسية.
- **@types/node / @types/react / @types/pg**: أدوات تعريف الأنواع لـ TypeScript.
- **tailwindcss / @tailwindcss/postcss**: أدوات التصميم و CSS.
