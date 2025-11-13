import { useInfiniteQuery } from "@tanstack/react-query";

interface UseFetchPostProps {
  search?: string;
}

export const useFetchPost = ({ search }: UseFetchPostProps) => {
  const limit = 10;

  return useInfiniteQuery({
    queryKey: ["posts", search],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams({
        page: pageParam.toString(),
        limit: limit.toString(),
      });
      if (search) {
        queryParams.append("search", search);
      }
      const res = await fetch(`/api/post?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    placeholderData: (previousData) => previousData,
  });
};
