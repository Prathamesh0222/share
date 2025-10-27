"use client";

import { DiscoverHeader } from "@/components/discover-header";
import { PostCard } from "@/components/post-card";
import { useFetchPost } from "@/hooks/use-fetch-post";
import { PostCardProps } from "@/types/types";
import { useEffect, useRef } from "react";

export default function Discover() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchPost();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.1 }
    );
    const loader = loaderRef.current;
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <DiscoverHeader />
      <div className="grid grid-cols-3 gap-2 max-w-6xl mx-auto">
        {posts.map((post: PostCardProps) => (
          <div key={post.id} className="border rounded-lg">
            <PostCard
              id={post.id}
              title={post.title}
              content={post.content}
              imageUrl={post.imageUrl}
              author={post.author}
              Tags={post.Tags}
              _count={post._count}
              createdAt={post.createdAt}
            />
          </div>
        ))}
      </div>
      <div
        ref={loaderRef}
        className="h-10 flex justify-center items-center mt-8"
      >
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading more posts...</p>
          </div>
        )}
      </div>

      {!hasNextPage && posts.length > 0 && (
        <p className="text-center text-muted-foreground mt-8">
          You've reached the end
        </p>
      )}
    </div>
  );
}
