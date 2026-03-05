# 🛠️ ISSUES.md — سجل المشاكل الموحّد (A8: Integration)

> يُحدَّث هذا الملف من A8 بعد مراجعة كل فروع الوكلاء السبعة.
> الأولوية: 🔴 حرج → 🟡 تحسين → 🟢 معلومة

---

## 🔴 مشاكل حرجة (Critical — يجب حلّها قبل الدمج)

### من A1 (Foundation)
- [ ] `AUTH-001` — جداول المصادقة (accounts, auth_sessions, verification_tokens) محذوفة من نطاق A1 → مسؤولية A2
- [ ] `STRIPE-001` — ربط Stripe Webhook لتحديث الاشتراكات تلقائياً غير مكتمل

### من A2 (Auth) — بانتظار مراجعة الفرع
- [ ] `AUTH-002` — التحقق من وجود middleware.ts يحمي جميع routes المطلوبة
- [ ] `AUTH-003` — رسائل NextAuth خطأ غير معرَّبة

### من A3 (API Core) — بانتظار مراجعة الفرع
- [ ] `API-001` — التحقق من أن جميع routes تُرجع format موحد `{ success, data?, error? }`
- [ ] `API-002` — التحقق من وجود rate limiting على routes الحساسة

### من A4 (AI Engine) — بانتظار مراجعة الفرع
- [ ] `AI-001` — التحقق من error handling عند فشل Gemini API
- [ ] `AI-002` — التحقق من fallback mechanism

### من A5 (UI Components) — بانتظار مراجعة الفرع
- [ ] `UI-001` — التحقق من RTL support على جميع المكونات
- [ ] `UI-002` — Dark mode consistency عبر كل الصفحات

### من A6 (Pages) — بانتظار مراجعة الفرع
- [ ] `PAGE-001` — التحقق من loading states على جميع الصفحات
- [ ] `PAGE-002` — التحقق من error boundaries

### من A7 (Payments) — بانتظار مراجعة الفرع
- [ ] `PAY-001` — Webhook signature validation
- [ ] `PAY-002` — subscription guard على protected features

---

## 🟡 تحسينات (Improvements — بعد الإطلاق)

- [ ] `PERF-001` — تحسين البحث الدلالي: HNSW index بدلاً من IVFFlat
- [ ] `PERF-002` — إضافة React Suspense على الصفحات الثقيلة
- [ ] `A11Y-001` — إضافة aria-labels ناقصة
- [ ] `SEO-001` — إضافة structured data (JSON-LD)

---

## ✅ تم الحل (Resolved)

- [x] إعداد البنية التحتية الأساسية (A1)
- [x] تصميم مخطط قاعدة البيانات 3NF (A1)
- [x] تثبيت وتهيئة Shadcn/ui (A1)
- [x] إنشاء main branch وإعداد CI/CD (A8 — Phase 1)

---

## 📋 سجل A8 (Integration Log)

| التاريخ | الإجراء | النتيجة |
|---------|---------|--------|
| 2026-03-05 | إنشاء main branch من A1-foundation | ✅ |
| 2026-03-05 | إعداد GitHub Actions CI/CD | ✅ |
| 2026-03-05 | إعداد Playwright config | ✅ |
| 2026-03-05 | إعداد Vercel config | ✅ |
