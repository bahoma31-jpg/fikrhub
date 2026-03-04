import { createClient } from "@supabase/supabase-js";

// Check env strings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy";

// Used only for uploading exported files
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * رفع ملف وإرجاع signed URL
 */
export async function uploadFile(
    bucket: string,
    path: string,
    file: Buffer,
    contentType: string = "application/pdf"
): Promise<string> {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            upsert: true,
            contentType,
        });

    if (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }

    // Create a signed URL valid for 24 hours
    const signedUrlRes = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 60 * 24); // 24 ساعة

    if (signedUrlRes.error) {
        throw new Error(`Failed to create signed URL: ${signedUrlRes.error.message}`);
    }

    return signedUrlRes.data.signedUrl;
}
