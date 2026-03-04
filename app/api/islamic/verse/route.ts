import { NextRequest, NextResponse } from "next/server";
import { getRandomVerse } from "@/services/islamic.service";
import { QuranVerse } from "@/data/quran-verses";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const contextStr = searchParams.get("context");

        // Validate if it matches our context literals
        const validContexts: QuranVerse['context'][] = ['motivation', 'patience', 'creativity', 'reflection'];
        let context: QuranVerse['context'] | undefined = undefined;

        if (contextStr && validContexts.includes(contextStr as QuranVerse['context'])) {
            context = contextStr as QuranVerse['context'];
        }

        const verse = getRandomVerse(context);

        return NextResponse.json({ success: true, data: verse });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch verse", message: error.message },
            { status: 500 }
        );
    }
}
