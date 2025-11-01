import { queryClient } from "@/components/providers";
import { createBookmark } from "@/lib/api-client/create-bookmark";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateBookmark = () => {
  return useMutation({
    mutationFn: async (postId: string) => {
      return createBookmark(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("Bookmark created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create bookmark");
    },
  });
};
