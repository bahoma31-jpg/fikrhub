import { NextRequest, NextResponse } from "next/server";
import { getDuaByContext } from "@/services/islamic.service";
import { Dua } from "@/data/duas";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const contextStr = searchParams.get("context");

        // Default context if none provided (or invalid) to prevent type errors
        let context: Dua['context'] = 'session-start';

        const validContexts: Dua['context'][] = ['session-start', 'session-end', 'inspiration', 'gratitude'];
        if (contextStr && validContexts.includes(contextStr as Dua['context'])) {
            context = contextStr as Dua['context'];
        }

        const dua = getDuaByContext(context);

        return NextResponse.json({ success: true, data: dua });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch dua", message: error.message },
            { status: 500 }
        );
    }
}
