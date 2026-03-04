import type { Metadata } from 'next';
import { Cairo, Tajawal } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

// Using Tajawal as the primary font and Cairo for headings or specifics
const tajawal = Tajawal({
    subsets: ['arabic'],
    weight: ['300', '400', '500', '700', '800'],
    variable: '--font-tajawal',
});

const cairo = Cairo({
    subsets: ['arabic'],
    weight: ['300', '400', '500', '700', '800'],
    variable: '--font-cairo',
});

export const metadata: Metadata = {
    title: 'FikrHub - فكر هب',
    description: 'منصة العصف الذهني وإدارة الأفكار',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <body className={`${tajawal.variable} ${cairo.variable} font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        {/* TODO: Add AuthProvider when A2 completes */}
                        {children}
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
