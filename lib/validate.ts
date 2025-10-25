import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  slug: z.string().min(1).max(200).optional(),
  tags: z
    .array(z.string().min(1).max(30))
    .max(10, "Maximum 10 tags allowed")
    .optional(),
  imageUrl: z.string().url().optional(),
});
