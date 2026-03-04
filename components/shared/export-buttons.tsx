"use client";

import { FileText, Image as ImageIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { jsPDF } from 'jspdf';
import { Idea } from '@/stores/ideas-store';

interface ExportButtonsProps {
    data: Idea[];
    sessionTitle: string;
}

export function ExportButtons({ data, sessionTitle }: ExportButtonsProps) {

    const handleExportCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" +
            "المحتوى,الأصوات,تاريخ الإنشاء\n" +
            data.map(i => `"${i.content.replace(/"/g, '""')}",${i.votes},${i.createdAt}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `fikrhub_session_${sessionTitle}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        // This is a basic stub, a full implementation would likely use html2canvas + jspdf
        // or properly configure jsPDF for Arabic text (which is complex).
        const doc = new jsPDF();
        doc.text(`FikrHub Session: ${sessionTitle}`, 10, 10);
        doc.text(`Total Ideas: ${data.length}`, 10, 20);
        // ... adding data rows ...
        doc.save(`fikrhub_session_${sessionTitle}.pdf`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    تصدير النتائج
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer gap-2">
                    <FileText className="h-4 w-4 text-emerald-600" />
                    تصدير كملف Excel / CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer gap-2">
                    <ImageIcon className="h-4 w-4 text-rose-600" />
                    تصدير كملف PDF
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
