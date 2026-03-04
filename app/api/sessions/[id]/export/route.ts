import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { generatePDF, generateExcel } from "@/services/export.service";
import { uploadFile } from "@/lib/supabase";
import { checkLimit } from "@/services/subscription.service";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15, route params must be awaited
) {
    try {
        const session = await getServerSession();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "غير مصرح لك للوصول إلى هذا المورد" },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const { id: sessionId } = await params;
        const { searchParams } = new URL(req.url);
        const format = searchParams.get('format') || 'pdf';

        // Verify limit 
        const isWithinLimits = await checkLimit(userId, 'exports');
        if (!isWithinLimits) {
            return NextResponse.json(
                { success: false, error: "تم تجاوز حد التصدير المجاني. يرجى الترقية للحساب المدفوع." },
                { status: 403 }
            );
        }

        // Generate buffer based on format
        let fileBuffer: Buffer;
        let contentType: string;
        let fileExtension: string;

        if (format === 'pdf') {
            fileBuffer = await generatePDF(sessionId);
            contentType = "application/pdf";
            fileExtension = "pdf";
        } else if (format === 'excel') {
            fileBuffer = await generateExcel(sessionId);
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            fileExtension = "xlsx";
        } else {
            return NextResponse.json(
                { success: false, error: "صيغة الملف غير مدعومة" },
                { status: 400 }
            );
        }

        // Upload to supabase storage bucket "exports"
        const bucketName = "exports";
        const filePath = `${userId}/${sessionId}/export_${Date.now()}.${fileExtension}`;

        const signedUrl = await uploadFile(bucketName, filePath, fileBuffer, contentType);

        return NextResponse.json({ success: true, data: { url: signedUrl } });

    } catch (error: any) {
        console.error("❌ Export generation failed:", error);
        return NextResponse.json(
            { success: false, error: "حدث خطأ أثناء محاولة التصدير", message: error.message },
            { status: 500 }
        );
    }
}
