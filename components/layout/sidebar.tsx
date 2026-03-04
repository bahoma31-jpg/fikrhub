"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/ui-store';
// import { signOut } from 'next-auth/react'; // A2 will handle auth

const navigation = [
    { name: 'الرئيسية', href: '/dashboard', icon: Home },
    { name: 'جلسات العصف', href: '/sessions', icon: Lightbulb },
    { name: 'الملف الشخصي', href: '/profile', icon: User },
    { name: 'الإعدادات', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);

    return (
        <aside className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-64 flex-col border-l border-border bg-card transition-transform duration-300 md:static md:translate-x-0 hidden md:flex",
            !isSidebarOpen && "translate-x-full md:translate-x-0"
        )}>
            <div className="flex h-16 items-center px-6 py-4 border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-2">
                    {/* FikrHub Logo */}
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold font-tajawal">فكر هب</span>
                </Link>
            </div>

            <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
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

            <div className="border-t border-border p-4">
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                // onClick={() => signOut()}
                >
                    <LogOut className="h-5 w-5" />
                    تسجيل الخروج
                </Button>
            </div>
        </aside>
    );
}
