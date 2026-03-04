# FikrHub API Documentation — A3

توثيق كامل لمسارات API التابعة لوكيل A3 (Core API) المبنية على Drizzle و NextAuth.

## Workspaces (إدارة مساحات العمل)

| Method | Endpoint | Auth | Description | Body Structure |
|--------|----------|------|-------------|----------------|
| GET | `/api/workspaces` | ✅ | استرجاع قائمة مساحات العمل المسموح للمستخدم برؤيتها مع ترقيم (Pagination `?page=x&limit=y`). | - |
| POST | `/api/workspaces` | ✅ | إنشاء مساحة عمل جديدة ووضع المنشئ كمشرف (Owner). | `{ name: string, description?: string }` |
| GET | `/api/workspaces/[id]` | ✅ | استرجاع تفاصيل مساحة العمل والأعضاء المرتبطين بها. | - |
| PUT | `/api/workspaces/[id]` | ✅ (Owner) | تحديث معلومات مساحة العمل (الاسم أو الوصف). | `{ name?: string, description?: string }` |
| DELETE | `/api/workspaces/[id]` | ✅ (Owner) | حذف مساحة العمل نهائياً مع المحتويات المرتبطة. | - |
| POST | `/api/workspaces/[id]/members` | ✅ (Owner) | إضافة عضو إلى مساحة العمل عن طريق البريد الإلكتروني وتحديد دوره. | `{ email: string, role: "owner" \| "member" \| "viewer" }` |
| DELETE | `/api/workspaces/[id]/members` | ✅ (Owner) | إزالة عضو من مساحة العمل (لا يمكن إزالة المالك الحالي). | `{ userId: string }` |

---

## Sessions (إدارة جلسات العصف الذهني)

| Method | Endpoint | Auth | Description | Body Structure |
|--------|----------|------|-------------|----------------|
| GET | `/api/sessions` | ✅ | جلب الجلسات المتاحة للمستخدم (دعم الفلاتر `technique`, `status`, `workspaceId`). | - |
| POST | `/api/sessions` | ✅ | إنشاء جلسة جديدة بحالة `draft` وتخزين الإعدادات الخاصة. | `{ title: string, workspaceId: string, techniqueType: string, settings?: any }` |
| GET | `/api/sessions/[id]` | ✅ | جلب تفاصيل الجلسة. | - |
| PUT | `/api/sessions/[id]` | ✅ (Creator)| تحديث الجلسة (الاسم أو الإعدادات الخاصة بها). | `{ title?: string, settings?: any }` |
| DELETE | `/api/sessions/[id]` | ✅ (Creator)| أرشفة الجلسة (Soft Delete `status = 'archived'`). | - |
| POST | `/api/sessions/[id]/start` | ✅ (Creator)| تغيير حالة الجلسة من `draft` إلى `active` وبدء التوقيت. | - |
| POST | `/api/sessions/[id]/complete` | ✅ (Creator)| إنهاء الجلسة `active` إلى `completed`، حساب المدة، وتحديث الإحصائيات (Stats). | - |

---

## Ideas (إدارة الأفكار)

| Method | Endpoint | Auth | Description | Body Structure |
|--------|----------|------|-------------|----------------|
| POST | `/api/ideas` | ✅ | إضافة فكرة جديدة لجلسة محددة. | `{ sessionId: string, content: string, category?: string, aiGenerated?: boolean }` |
| PUT | `/api/ideas/[id]` | ✅ (Creator)| تخصيص أو تعديل محتوى الفكرة أو تصنيفها. | `{ content?: string, category?: string }` |
| DELETE | `/api/ideas/[id]` | ✅ (Creator)| حذف دائم للفكرة وإزالة التعليقات/التقييمات المرتبطة بها (Cascade Delete). | - |
| POST | `/api/ideas/[id]/rate` | ✅ | تقييم الفكرة (Upsert) بناءً على النتيجة `score` ومعيار التقييم `criteria`. | `{ score: number, criteria: string }` |
| GET | `/api/ideas/[id]/comments` | ✅ | جلب التعليقات المتعلقة بالفكرة المحددة. | - |
| POST | `/api/ideas/[id]/comments` | ✅ | إضافة تعليق جديد على الفكرة (مع دعم الردود المتداخلة `parentId`). | `{ content: string, parentId?: string }` |

---

## Stats (الإحصائيات المجمعة)

لا توجد مسارات API مباشرة للإحصائيات في هذه المرحلة نظراً لاستخدامها داخلياً عبر واجهات الـ Server Actions من الوكلاء اللاحقين، ولكن خدمة `statsService` تقدم الدوال التالية للاستخدام الداخلي:

*   **`getSessionStats(sessionId)`**: استرداد إحصائيات الجلسة (عدد الأفكار الإجمالي، توزيع الأفكار بالتصنيف، متوسط التقييمات الشاملة، أفضل 3 أفكار، ومدة الجلسة بالدقائق).
*   **`updateUserStats(userId)`**: تحديث السجل غير المعياري `userStats` (عدد الجلسات، عدد الأفكار المضافة، التقنية المفضلة، آخر جلسة أُجريت).

---

**ملاحظات:**
* جميع الـ Responses تتبع بنية موحدة: `{ success: true, data: T }` أو `{ success: false, error: "message" }`.
* الملكية (Ownership) تُفحص إلزامياً كجزء من أمان عمليات التعديل والحذف.
* جميع المدخلات (Inputs) تخضع لتحقق صارم عبر Zod Schemas المُصدرة في `lib/validations.ts`.
