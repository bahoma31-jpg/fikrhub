"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session?: Session | null;
};

// ملف مزوّد الجلسة — يلفّ التطبيق من أجل توفير بيانات الجلسة للـ client
export default function AuthProvider({ children, session }: Props): React.ReactElement {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
