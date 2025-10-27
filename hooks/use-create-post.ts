import { createPost } from "@/lib/api-client/create-post";
import { uploadImage } from "@/lib/api-client/upload-image";
import { Post } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (data: Post) => {
      let imageUrl: string | undefined;

      if (data.image) {
        imageUrl = await uploadImage(data.image);
      }

      return createPost({
        title: data.title,
        content: data.content,
        tags: data.tags,
        imageUrl,
      });
    },
    onSuccess: () => {
      toast.success("Post created successfully!");
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create post");
    },
  });
};
