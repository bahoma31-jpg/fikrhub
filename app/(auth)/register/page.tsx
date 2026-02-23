"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Zod schema للفورم التسجيل
const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage(): JSX.Element {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterForm) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
      });

      const json = await res.json();
      if (json?.success) {
        router.push('/login');
      } else {
        // عرض خطأ بسيط للمستخدم
        // Zod أو خطأ من السيرفر سيظهر هنا كمعلومة
        alert(json?.error ?? 'فشل التسجيل');
      }
    } catch (err) {
      alert('فشل الاتصال بالخادم');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>إنشاء حساب</CardTitle>
          <CardDescription>املأ البيانات لإنشاء حساب جديد</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input placeholder="الاسم" {...register('name')} />
              {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
            </div>

            <div>
              <Input placeholder="البريد الإلكتروني" type="email" {...register('email')} />
              {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
            </div>

            <div>
              <Input placeholder="كلمة المرور" type="password" {...register('password')} />
              {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
            </div>

            <div>
              <Input placeholder="تأكيد كلمة المرور" type="password" {...register('confirmPassword')} />
              {errors.confirmPassword ? <p className="text-sm text-destructive">{errors.confirmPassword.message}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isSubmitting}>سجّل</Button>
            </div>
          </form>

          <div className="mt-4 text-sm">
            لديك حساب؟ <Link href="/login" className="text-primary">سجّل الدخول</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
