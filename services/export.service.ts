import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { db } from "@/db";
import { sessions, ideas } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Fetch data for an export session
 */
async function getSessionData(sessionId: string) {
    const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.id, sessionId))
        .limit(1);

    if (!session) {
        throw new Error("Session not found");
    }

    const sessionIdeas = await db
        .select()
        .from(ideas)
        .where(eq(ideas.sessionId, sessionId));

    return { session, sessionIdeas };
}

/**
 * توليد PDF للجلسة
 */
export async function generatePDF(sessionId: string): Promise<Buffer> {
    const { session, sessionIdeas } = await getSessionData(sessionId);

    // Initialize jsPDF
    const doc = new jsPDF();

    // Basic title and headers
    doc.setFontSize(22);
    doc.text(`FikrHub - Brainstorming Session`, 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.text(`Session: ${session.title}`, 20, 40);
    doc.text(`Technique: ${session.techniqueType}`, 20, 50);
    doc.text(`Date: ${new Date(session.createdAt).toLocaleDateString()}`, 20, 60);

    doc.text(`Ideas Generated:`, 20, 80);

    doc.setFontSize(12);
    let yPos = 90;

    sessionIdeas.forEach((idea, index) => {
        // Add new page if yPos exceeds page height
        if (yPos > 280) {
            doc.addPage();
            yPos = 20;
        }

        // Split text into lines to fit page width
        const textLines = doc.splitTextToSize(`${index + 1}. ${idea.content}`, 170);
        doc.text(textLines, 20, yPos);
        yPos += textLines.length * 7;
    });

    return Buffer.from(doc.output("arraybuffer"));
}

/**
 * توليد Excel للجلسة
 */
export async function generateExcel(sessionId: string): Promise<Buffer> {
    const { session, sessionIdeas } = await getSessionData(sessionId);

    // Format data for Excel rows
    const excelData = sessionIdeas.map((idea, index) => ({
        "ID": index + 1,
        "Idea Text": idea.content,
        "Category": idea.category || "Uncategorized",
        "AI Generated": idea.aiGenerated ? "Yes" : "No",
        "Created At": new Date(idea.createdAt).toLocaleString(),
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Session Ideas");

    // Output to buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    return excelBuffer;
}
