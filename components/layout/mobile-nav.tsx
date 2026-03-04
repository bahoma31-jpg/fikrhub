"use client";

import { useUiStore } from '@/stores/ui-store';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
    { name: 'الرئيسية', href: '/dashboard', icon: Home },
    { name: 'جلسات العصف', href: '/sessions', icon: Lightbulb },
    { name: 'الملف الشخصي', href: '/profile', icon: User },
    { name: 'الإعدادات', href: '/settings', icon: Settings },
];

export function MobileNav() {
    const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
    const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
    const pathname = usePathname();

    return (
        <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="right" className="w-64 p-0">
                <SheetTitle className="sr-only">قائمة التصفح</SheetTitle>
                <div className="flex h-16 items-center px-6 py-4 border-b border-border">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                        <Lightbulb className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold font-tajawal">فكر هب</span>
                    </Link>
                </div>

                <nav className="flex flex-col space-y-1 p-4 h-[calc(100vh-8rem)] overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={cn(
                                    "group flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-border p-4 mt-auto">
                    <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                        <LogOut className="h-5 w-5" />
                        تسجيل الخروج
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
