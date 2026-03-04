import { redirect } from 'next/navigation';
// @ts-expect-error - Assuming A2 will provide this
import { auth } from '@/lib/auth';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // ✅ حماية الصفحات - فقط المستخدمين المسجلين
    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar - شريط جانبي */}
            <Sidebar user={session?.user} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar - شريط علوي */}
                <Navbar user={session?.user} />

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
