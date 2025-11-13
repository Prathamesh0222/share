"use client";

import { DiscoverHeader } from "@/components/discover-header";
import { PostCard } from "@/components/post-card";
import { FeaturedPostCard } from "@/components/featured-post-card";
import { useFetchPost } from "@/hooks/use-fetch-post";
import { useEffect, useRef, useState } from "react";
import { DiscoverSkeleton } from "@/components/discover-skeleton";
import { instrumentSerif } from "@/lib/font";
import { LibraryBig, Search, FileX } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "./ui/input";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "./ui/empty";

export function DiscoverContent() {
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (inputRef.current && document.activeElement === inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearch]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchPost({ search: debouncedSearch });

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
      { root: null, rootMargin: "200px", threshold: 0 }
    );
    const loader = loaderRef.current;
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const isInitialLoading = isLoading && !data;
  if (isInitialLoading) {
    return (
      <div>
        <DiscoverHeader />
        <DiscoverSkeleton />
      </div>
    );
  }

  const hasNoPosts = !isLoading && posts.length === 0;

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
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-2 text-muted-foreground size-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 w-full"
            aria-label="Search posts"
            role="searchbox"
          />
        </div>
        {hasNoPosts ? (
          <Empty>
            <EmptyMedia>
              <FileX className="size-12 text-muted-foreground" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>
                {debouncedSearch
                  ? `No posts found for "${debouncedSearch}"`
                  : "No posts available"}
              </EmptyTitle>
              <EmptyDescription>
                {debouncedSearch
                  ? "Try adjusting your search terms or check back later for new posts."
                  : "Be the first to share something amazing!"}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
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
          </>
        )}
      </div>
      {!hasNoPosts && (
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
      )}
    </div>
  );
}
