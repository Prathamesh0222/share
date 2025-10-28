"use client";

import { DiscoverHeader } from "@/components/discover-header";
import { DiscoverMore } from "@/components/discover-more";
import { usePostBySlug } from "@/hooks/use-post-by-slug";
import { Bookmark, Heart, MessageCircle, Clock } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { RichTextViewer } from "@/components/rich-text-viewer";

export default function PostDetails() {
  const { slug } = useParams() as { slug?: string };
  const { data: post, isLoading, error } = usePostBySlug(slug);
  console.log(post);
  console.log("Slug", slug);

  if (isLoading) {
    return (
      <div>
        <DiscoverHeader />
        <div className="max-w-4xl mx-auto">
          <div className="mt-8 grid gap-4">
            <div className="h-8 w-1/2 bg-muted rounded" />
            <div className="h-4 w-1/3 bg-muted rounded" />
            <div className="h-64 bg-muted rounded" />
            <div className="h-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <DiscoverHeader />
        <div className="max-w-4xl mx-auto">
          <p className="text-destructive mt-8">Failed to load post.</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <DiscoverHeader />
        <div className="max-w-4xl mx-auto">
          <p className="mt-8 text-muted-foreground">Post not found.</p>
        </div>
      </div>
    );
  }

  const likeCount = post._count?.Like || 0;
  const bookmarkCount = post._count?.Bookmark || 0;
  const commentCount = post._count?.Comment || 0;
  const published = post.createdAt ? new Date(post.createdAt) : null;

  return (
    <div>
      <DiscoverHeader />
      <div className="max-w-4xl mx-auto">
        <article className="mx-auto mt-8 grid gap-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            {post.title}
          </h1>
          {post.imageUrl ? (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-green-500 text-green-200 font-bold text-sm">
                {post.author?.name
                  ? post.author.name.charAt(0).toUpperCase()
                  : "?"}
              </div>
              <span className="font-medium">
                {post.author?.name || "Unknown"}
              </span>
            </div>
            {published && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {published.toLocaleDateString()}
              </span>
            )}
            <div className="ml-auto flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> {likeCount}
              </span>
              <span className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" /> {bookmarkCount}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> {commentCount}
              </span>
            </div>
          </div>
          <RichTextViewer html={post.content} />
        </article>
        <div className="my-12">
          <h1 className="text-xl font-bold tracking-tighter">Discover More</h1>
          <DiscoverMore currentSlug={slug as string} />
        </div>
      </div>
    </div>
  );
}
