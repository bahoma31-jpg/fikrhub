// ملف: middleware.ts — حماية المسارات الحساسة عبر NextAuth middleware
// يستورد auth من lib/auth ويصدره كميدلوير افتراضي
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// ملف middleware — حماية المسارات الحساسة مع إعادة توجيه ذكية للمستخدمين
// الاستراتيجية: نستثني /api/auth/* تمامًا، ونستخدم auth(...) لالتقاط الجلسة
export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  // استثناء مسارات مصادقة NextAuth نفسها
  if (pathname.startsWith("/api/auth")) return;

  // إذا كان المستخدم غير مسجّل وحاول الوصول إلى /dashboard/* → إعادة توجيه إلى /login
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // auth wrapper يضيف خواص مثل token/session على الطلب (تتباين حسب التكوين)،
  // فنستخدم وجود token كمؤشر على تسجيل الدخول.
  // نستخدم any لأن الشكل يختلف بين الإصدارات، وتحقق حقيقي يتم أثناء التشغيل.
  const token = (req as any).token;

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // إذا كان مسجّلًا وحاول الوصول لصفحات التسجيل/تسجيل الدخول → أرسله إلى /dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // خلاف ذلك، اسمح بالوصول الطبيعي
  return;
});

// matcher: نحمي واجهة الـ Dashboard وصفحات الدخول/تسجيل المستخدم
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
