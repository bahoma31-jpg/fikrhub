// ملف: types/session.types.ts — أنواع الجلسات والتقنيات
import { sessions } from "@/db/schema/sessions";
import { z } from "zod";
import { SessionSchema } from "@/lib/validations";

/**
 * @type Session
 * @description نوع الجلسة المستنبط مباشرة من مخطط قاعدة البيانات.
 */
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

/**
 * @enum SessionStatus
 * @description الحالات الممكنة لجلسة العصف الذهني.
 */
export enum SessionStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    COMPLETED = "completed",
    ARCHIVED = "archived"
}

/**
 * @enum TechniqueType
 * @description أنواع تقنيات العصف الذهني التسع المدعومة في المنصة.
 */
export enum TechniqueType {
    CLASSIC = "classic",
    BRAINWRITING = "brainwriting",
    REVERSE = "reverse",
    STARBURSTING = "starbursting",
    STEPLADDER = "stepladder",
    SIX_HATS = "six_hats",
    SCAMPER = "scamper",
    WORST_IDEA = "worst_idea",
    ELECTRONIC = "electronic"
}

/**
 * @type CreateSessionInput
 * @description نوع البيانات المطلوبة لإنشاء جلسة جديدة، مستنبط من Zod.
 */
export type CreateSessionInput = z.infer<typeof SessionSchema>;

/**
 * @type UpdateSessionInput
 * @description نوع البيانات المطلوبة لتحديث جلسة موجودة.
 */
export type UpdateSessionInput = Partial<CreateSessionInput> & { id: string };
