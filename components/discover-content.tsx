"use client";

import { DiscoverHeader } from "@/components/discover-header";
import { PostCard } from "@/components/post-card";
import { FeaturedPostCard } from "@/components/featured-post-card";
import { useFetchPost } from "@/hooks/use-fetch-post";
import { useEffect, useRef } from "react";
import { DiscoverSkeleton } from "@/components/discover-skeleton";
import { instrumentSerif } from "@/lib/font";
import { LibraryBig } from "lucide-react";

export function DiscoverContent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchPost();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  const groupedPosts = [];
  for (let i = 0; i < posts.length; i += 4) {
    groupedPosts.push(posts.slice(i, i + 4));
  }

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

  if (isLoading) {
    return (
      <div>
        <DiscoverHeader />
        <DiscoverSkeleton />
      </div>
    );
  }

  return (
    <div>
      <DiscoverHeader />
      <div className="max-w-5xl mx-auto space-y-8 px-4 py-8">
        <h1
          className={`${instrumentSerif.className} text-5xl flex items-center gap-2`}
        >
          <LibraryBig className="size-8" />
          Discover
        </h1>
        {groupedPosts.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {group[0] && (
              <FeaturedPostCard
                id={group[0].id}
                slug={group[0].slug}
                title={group[0].title}
                content={group[0].content}
                imageUrl={group[0].imageUrl}
                author={group[0].author}
                Tags={group[0].Tags}
                _count={group[0]._count}
                createdAt={group[0].createdAt}
                isBookmarked={group[0].isBookmarked ?? false}
                isLiked={group[0].isLiked ?? false}
              />
            )}
            {group.slice(1, 4).map((post) => (
              <div key={post.id} className="col-span-12 md:col-span-4">
                <PostCard
                  id={post.id}
                  title={post.title}
                  slug={post.slug}
                  content={post.content}
                  imageUrl={post.imageUrl}
                  author={post.author}
                  Tags={post.Tags}
                  _count={post._count}
                  createdAt={post.createdAt}
                  isBookmarked={post.isBookmarked ?? false}
                  isLiked={post.isLiked ?? false}
                />
              </div>
            ))}
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
