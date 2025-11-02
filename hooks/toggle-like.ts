import { queryClient } from "@/components/providers";
import { createLike } from "@/lib/api-client/create-like";
import { deleteLike } from "@/lib/api-client/delete-like";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useToggleLike = (postId: string) => {
  const { data: session } = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: async (newLikeState: boolean) => {
      if (!session?.user) {
        const redirect = encodeURIComponent(window.location.pathname);
        router.push(`/signin?redirect=${redirect}`);
        throw new Error("AUTH_REQUIRED");
      }

      if (newLikeState) {
        return createLike(postId);
      } else {
        return deleteLike(postId);
      }
    },
    onSuccess: (_, newLikeState) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      toast.success(
        newLikeState ? "Post liked successfully!" : "Post unliked successfully!"
      );
    },
    onError: (error: Error) => {
      if (error.message === "AUTH_REQUIRED") return;
      toast.error(error.message || "Failed to toggle like");
    },
  });
};
