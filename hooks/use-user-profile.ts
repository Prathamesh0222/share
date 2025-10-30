import { UserProfile } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      return response.json() as Promise<UserProfile>;
    },
    enabled: !!userId,
  });
};
