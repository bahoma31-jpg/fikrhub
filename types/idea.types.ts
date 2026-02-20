// ملف: types/idea.types.ts — أنواع الأفكار والتقييمات المتطورة
import { ideas } from "@/db/schema/ideas";
import { ratings } from "@/db/schema/ratings";
import { comments } from "@/db/schema/comments";
import { z } from "zod";
import { IdeaSchema } from "@/lib/validations";

/**
 * @type Idea
 * @description نوع الفكرة المستنبط من مخطط قاعدة البيانات.
 */
export type Idea = typeof ideas.$inferSelect;
export type NewIdea = typeof ideas.$inferInsert;

/**
 * @type Rating
 * @description نوع التقييم.
 */
export type Rating = typeof ratings.$inferSelect;
export type NewRating = typeof ratings.$inferInsert;

/**
 * @type Comment
 * @description نوع التعليق.
 */
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

/**
 * @type CreateIdeaInput
 * @description مدخلات إنشاء فكرة جديدة.
 */
export type CreateIdeaInput = z.infer<typeof IdeaSchema>;

/**
 * @interface IdeaWithRatings
 * @description هيكلية الفكرة متضمنة تقييماتها المجمعة.
 */
export interface IdeaWithRatings extends Idea {
    ratings?: Rating[];
    averageScore?: number;
}

/**
 * @interface IdeaWithComments
 * @description هيكلية الفكرة متضمنة قائمة التعليقات.
 */
export interface IdeaWithComments extends Idea {
    comments?: Comment[];
    commentCount?: number;
}
