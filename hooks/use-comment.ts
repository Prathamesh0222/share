import { queryClient } from "@/components/providers";
import { createComment, fetchComments } from "@/lib/api-client/comment";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useComments = (
  postId: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["comments", postId, page, limit],
    queryFn: () => fetchComments(postId, page, limit),
    enabled: !!postId,
  });
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", newComment.postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["post", newComment.postId],
      });
    },
  });
};
