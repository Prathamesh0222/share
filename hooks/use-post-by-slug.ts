import { fetchPostBySlug } from "@/lib/api-client/fetch-post-slug";
import { useQuery } from "@tanstack/react-query";

export function usePostBySlug(slug?: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug as string),
    enabled: !!slug,
    staleTime: 60_000,
    retry: 1,
  });
}
