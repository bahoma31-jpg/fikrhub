// @ts-expect-error - Assuming A5 will provide this or use lucide-react directly
import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="mt-4 text-muted-foreground">جاري تحميل لوحة التحكم...</p>
            </div>
        </div>
    );
}
