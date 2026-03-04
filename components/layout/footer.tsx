"use client";

import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-card mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="md:col-span-1">
                        <h3 className="font-bold font-cairo text-lg mb-4 text-primary">فكر هب</h3>
                        <p className="text-sm text-muted-foreground font-tajawal leading-relaxed">
                            منصة العصف الذهني وإدارة الأفكار. نبني بيئة إبداعية تجمع بين التقنية الحديثة والقيم الأصيلة.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 font-cairo">روابط سريعة</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">عن المنصة</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">الأسعار والباقات</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 font-cairo">المساعدة والدعم</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
                            <li><Link href="/guide" className="hover:text-primary transition-colors">دليل الاستخدام</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">شروط الخدمة</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© {currentYear} فكر هب. جميع الحقوق محفوظة.</p>
                    <p className="font-cairo text-primary/70">"وَقُل رَّبِّ زِدْنِي عِلْمًا"</p>
                </div>
            </div>
        </footer>
    );
}
