import { queryClient } from "@/components/providers";
import { createBookmark } from "@/lib/api-client/create-bookmark";
import { deleteBookmark } from "@/lib/api-client/delete-bookmark";
import { useSession } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useToggleBookmark = (postId: string) => {
  const { data: session } = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: async (newBookmarkState: boolean) => {
      if (!session?.user) {
        const redirect = encodeURIComponent(window.location.pathname);
        router.push(`/signin?redirect=${redirect}`);
        throw new Error("AUTH_REQUIRED");
      }

      if (newBookmarkState) {
        return createBookmark(postId);
      } else {
        return deleteBookmark(postId);
      }
    },
    onSuccess: (_, newBookmarkState) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      toast.success(
        newBookmarkState
          ? "Bookmark added successfully!"
          : "Bookmark removed successfully!"
      );
    },
    onError: (error: Error) => {
      if (error.message === "AUTH_REQUIRED") return;
      toast.error(error.message || "Failed to toggle bookmark");
    },
  });
};
