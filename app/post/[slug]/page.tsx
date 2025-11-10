"use client";

import { DiscoverHeader } from "@/components/discover-header";
import { DiscoverMore } from "@/components/discover-more";
import { usePostBySlug } from "@/hooks/use-post-by-slug";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Clock,
  LibraryBig,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RichTextViewer } from "@/components/rich-text-viewer";
import { formatTimeAgo } from "@/lib/format-time";
import { CommentSection } from "@/components/comment-section";
import { useState } from "react";
import { useToggleLike } from "@/hooks/toggle-like";
import { useToggleBookmark } from "@/hooks/toggle-bookmark";
import { instrumentSerif } from "@/lib/font";

export default function PostDetails() {
  const { slug } = useParams() as { slug?: string };
  const { data: post, isLoading, error } = usePostBySlug(slug);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: toggleBookmark, isPending: isBookmarkPending } =
    useToggleBookmark(post?.id ?? "");
  const { mutate: toggleLike, isPending: isLikePending } = useToggleLike(
    post?.id ?? ""
  );

  const handleBookmarkClick = () => {
    toggleBookmark(!(post?.isBookmarked ?? false));
  };

  const handleLikeClick = () => {
    toggleLike(!(post?.isLiked ?? false));
  };
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
      <div className="gap-8 max-w-4xl mx-auto">
        <div>
          <article className="mx-auto mt-8 grid gap-6">
            <h1
              className={`text-4xl leading-tight tracking-tight ${instrumentSerif.className}`}
            >
              {post.title}
            </h1>
            {post.imageUrl ? (
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  loading="eager"
                  priority
                />
              </div>
            ) : null}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link
                href={post.author?.id ? `/profile/${post.author.id}` : "#"}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-green-500 text-green-200 font-bold text-sm">
                  {post.author?.name
                    ? post.author.name.charAt(0).toUpperCase()
                    : "?"}
                </div>
                <span className="font-medium">
                  {post.author?.name || "Unknown"}
                </span>
              </Link>
              {published && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {formatTimeAgo(published)}
                </span>
              )}
              <div className="ml-auto flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Heart
                    className={`h-4 w-4 cursor-pointer transition-all ${
                      post?.isLiked
                        ? "fill-green-500 text-green-500"
                        : "hover:fill-green-500 hover:text-green-500"
                    } ${isLikePending ? "opacity-50" : ""}`}
                    onClick={handleLikeClick}
                  />{" "}
                  {+99}
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark
                    className={`h-4 w-4 cursor-pointer transition-all ${
                      post?.isBookmarked
                        ? "fill-green-500 text-green-500"
                        : "hover:fill-green-500 hover:text-green-500"
                    } ${isBookmarkPending ? "opacity-50" : ""}`}
                    onClick={handleBookmarkClick}
                  />{" "}
                  {+99}
                </span>
                <span className="flex items-center gap-1 cursor-pointer">
                  <MessageCircle
                    className={`h-4 w-4 cursor-pointer transition-all ${
                      isOpen
                        ? "fill-green-500 text-green-500"
                        : "hover:fill-green-500 hover:text-green-500"
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  {+99}
                </span>
              </div>
            </div>
          </article>
          <CommentSection
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            postId={post.id}
            postAuthorId={post.author?.id}
          />
          <div className="flex gap-2">
            <RichTextViewer html={post.content} />
          </div>
        </div>
      </div>
      <div className="my-12 max-w-4xl mx-auto">
        <h1
          className={`flex items-center gap-1 text-2xl font-bold tracking-tighter ${instrumentSerif.className}`}
        >
          <LibraryBig className="size-5" />
          Discover More
        </h1>
        <DiscoverMore currentSlug={slug as string} currentId={post.id} />
      </div>
    </div>
  );
}
