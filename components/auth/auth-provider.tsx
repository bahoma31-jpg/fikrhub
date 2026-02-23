"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session?: unknown;
};

// ملف مزوّد الجلسة — يلفّ التطبيق من أجل توفير بيانات الجلسة للـ client
export default function AuthProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
