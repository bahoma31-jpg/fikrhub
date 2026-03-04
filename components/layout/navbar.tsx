"use client";

import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/ui-store';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Navbar() {
    const toggleSidebar = useUiStore((state) => state.toggleSidebar);
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 shadow-sm sm:px-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="hidden md:block">
                    <h1 className="text-xl font-semibold opacity-0 md:opacity-100 transition-opacity">
                        {/* Contextual Title can go here */}
                        مرحباً بك
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    aria-label="تبديل المظهر"
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>

                <Button variant="ghost" size="icon" aria-label="الإشعارات">
                    <div className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive border border-background"></span>
                    </div>
                </Button>

                <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />

                <Avatar className="h-9 w-9 border border-border cursor-pointer">
                    <AvatarImage src="" alt="المستخدم" />
                    <AvatarFallback className="bg-primary/10 text-primary">م</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
