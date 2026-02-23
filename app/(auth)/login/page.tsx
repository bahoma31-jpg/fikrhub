"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Zod schema للفورم
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage(): JSX.Element {
  const searchParams = useSearchParams();
  const errorFromParams = searchParams?.get("error") ?? undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginForm) {
    const res = await signIn("credentials", { redirect: false, email: values.email, password: values.password });
    if (res && (res as any).error) {
      setError("password", { message: (res as any).error });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>تسجيل الدخول</CardTitle>
          <CardDescription>ادخل بياناتك لتسجيل الدخول</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          {errorFromParams ? (
            <div className="text-sm text-destructive mb-4">{errorFromParams}</div>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input placeholder="البريد الإلكتروني" type="email" {...register("email")} />
              {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
            </div>

            <div>
              <Input placeholder="كلمة المرور" type="password" {...register("password")} />
              {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <Button type="button" variant="outline" onClick={() => signIn("google")}>تسجيل الدخول بـ Google</Button>
              <Button type="submit" disabled={isSubmitting}>تسجيل الدخول</Button>
            </div>
          </form>

          <div className="mt-4 text-sm">
            ليس لديك حساب؟ <Link href="/register" className="text-primary">سجّل الآن</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
