import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, Bell, CreditCard, Sparkles } from 'lucide-react';
// @ts-expect-error
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
    title: 'الإعدادات | FikrHub',
    description: 'إدارة حسابك واشتراكك',
};

export default async function SettingsPage() {
    const session = { user: { name: 'أحمد محمود', email: 'ahmed@example.com', image: null, subscriptionTier: 'FREE' } };

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-4 text-foreground">
            <h1 className="text-4xl font-bold font-cairo">الإعدادات</h1>

            <div className="grid grid-cols-1 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-cairo">
                            <User className="w-5 h-5 text-primary" /> الملف الشخصي
                        </CardTitle>
                        <CardDescription className="font-tajawal">تحديث معلوماتك الشخصية</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 font-tajawal">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">الاسم</label>
                                <div className="relative">
                                    <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input defaultValue={session.user.name} className="pr-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">البريد الإلكتروني</label>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input defaultValue={session.user.email} disabled className="pr-10 bg-muted/50" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <Button>حفظ التغييرات</Button>
                    </CardFooter>
                </Card>

                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-cairo">
                            <Shield className="w-5 h-5 text-primary" /> الاشتراك الحالي
                        </CardTitle>
                        <CardDescription className="font-tajawal">إدارة خطتك ومزاياك</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div className="space-y-1 font-tajawal">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">الخطة المجانية</span>
                                    <Badge variant="outline">Free</Badge>
                                </div>
                                <p className="text-muted-foreground">لديك 3 جلسات متبقية هذا الشهر</p>
                            </div>
                            <Button className="bg-primary hover:bg-primary/90">
                                <Sparkles className="mr-2 w-4 h-4" /> الترقية لـ Pro
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
