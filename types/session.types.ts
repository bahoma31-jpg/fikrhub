// ملف: types/session.types.ts — أنواع الجلسات المستنبطة من Schema
import { sessions } from "@/db/schema/sessions";

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type SessionStatus = "draft" | "active" | "completed";

export enum TechniqueType {
    CLASSIC = "classic",
    BRAINWRITING = "brainwriting",
    REVERSE = "reverse",
    SCAMPER = "scamper",
    SIX_HATS = "six_hats",
    SWOT = "swot"
}
