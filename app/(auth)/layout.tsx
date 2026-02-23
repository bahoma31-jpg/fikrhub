import React from "react";
import { Card, CardContent } from "@/components/ui/card";

// Layout مشترك لصفحات المصادقة — يعرض بطاقة مركزيّة في وسط الشاشة
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="py-8">{children}</CardContent>
      </Card>
    </div>
  );
}
