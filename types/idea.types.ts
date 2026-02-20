// ملف: types/idea.types.ts — أنواع الأفكار والتقييمات
import { ideas } from "@/db/schema/ideas";
import { ratings } from "@/db/schema/ratings";
import { comments } from "@/db/schema/comments";

export type Idea = typeof ideas.$inferSelect;
export type NewIdea = typeof ideas.$inferInsert;

export type Rating = typeof ratings.$inferSelect;
export type NewRating = typeof ratings.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
