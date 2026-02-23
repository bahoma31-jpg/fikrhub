// ملف: middleware.ts — حماية المسارات الحساسة عبر NextAuth middleware
// يستورد auth من lib/auth ويصدره كميدلوير افتراضي
import { auth } from "@/lib/auth";

// نص: نحمي لوحة التحكم وواجهات الـ API عمومًا.
// استثناء: تأكد أن /api/auth/* غير محمي لأنه نقطة الدخول للمصادقة
export default auth;

// matcher يستخدم أنماط regex لتحديد المسارات المحمية.
export const config = {
  matcher: [
    "/dashboard/:path*",
    // نحمي كل /api/* لكن يجب استبعاد /api/auth/* من التكوين في NextAuth route
    "/api/:path*",
    "/login",
    "/register",
  ],
};
