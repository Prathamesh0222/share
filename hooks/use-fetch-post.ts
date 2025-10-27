import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchPost = () => {
  const limit = 10;

  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/post?page=${pageParam}&limit=${limit}`);
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
  });
};
