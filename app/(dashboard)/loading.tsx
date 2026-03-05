import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="mt-4 text-muted-foreground font-tajawal">جاري تحميل لوحة التحكم...</p>
            </div>
        </div>
    );
}
