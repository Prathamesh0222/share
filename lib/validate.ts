import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  slug: z.string().min(1).max(200).optional(),
  tags: z.array(z.string().min(1).max(30)).max(10, "Maximum 10 tags allowed"),
  imageUrl: z.string().url().optional(),
});

export const CommentSchema = z.object({
  comment: z
    .string()
    .min(1, "Must be more than 1 character")
    .max(200, "Comment must be less than 200 characters"),
});

export const BookmarkSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
});
