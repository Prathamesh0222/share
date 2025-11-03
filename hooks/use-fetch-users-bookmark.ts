import { useQuery } from "@tanstack/react-query";
import { fetchUserBookmark } from "@/lib/api-client/fetch-user-bookmark";

export const useFetchUsersBookmark = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["bookmarks", page, limit],
    queryFn: () => fetchUserBookmark(page, limit),
    staleTime: 60_000,
    retry: 1,
  });
};
