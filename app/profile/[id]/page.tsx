"use client";

import { DiscoverHeader } from "@/components/discover-header";
import { PostCard } from "@/components/post-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfile } from "@/hooks/use-user-profile";
import { formatTimeAgo } from "@/lib/format-time";
import {
  Calendar,
  FileText,
  Heart,
  Bookmark,
  MessageCircle,
  BookmarkCheck,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function UserProfilePage() {
  const { id } = useParams() as { id?: string };
  const { data: profile, isLoading, error } = useUserProfile(id);
  const [activeTab, setActiveTab] = useState<
    "posts" | "bookmarks" | "community"
  >("posts");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DiscoverHeader />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border p-4 space-y-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-7 w-12" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-8 border-t border-subtlest" />

          <div className="flex gap-6 border-b border-subtlest">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-subtlest rounded-xl overflow-hidden"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <DiscoverHeader />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-destructive">Failed to load profile.</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <DiscoverHeader />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Profile not found.</p>
        </div>
      </div>
    );
  }

  const joinedDate = formatTimeAgo(profile.createdAt);

  return (
    <div className="min-h-screen bg-background">
      <DiscoverHeader />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl -z-10" />
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative group">
                {profile.image ? (
                  <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-background shadow-2xl">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-linear-to-br from-green-400 to-emerald-600 text-white font-bold text-5xl ring-4 ring-background shadow-2xl">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="text-center lg:text-left space-y-3">
                <h1 className="text-xl md:text-2xl font-bold leading-tight">
                  {profile.name}
                </h1>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-green-50 border border-green-500/20 dark:bg-green-950/50 dark:border-green-900">
                  <Calendar className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-medium text-green-700 dark:text-green-300">
                    Joined {joinedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold text-muted-foreground">
                  Activity Overview
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 transition-all hover:shadow-xl hover:shadow-green-500/20 cursor-pointer border border-green-100 dark:border-green-900/50">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-green-500/10 rounded-full -mr-14 -mt-14 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative space-y-3">
                    <div className="p-2.5 rounded-xl bg-green-500/10 w-fit">
                      <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                        {profile._count.Post}
                      </p>
                      <p className="text-xs font-semibold text-green-600/70 dark:text-green-400/70 mt-1">
                        Posts Published
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-5 transition-all hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer border border-blue-100 dark:border-blue-900/50">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full -mr-14 -mt-14 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative space-y-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 w-fit">
                      <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                        {profile._count.Comment}
                      </p>
                      <p className="text-xs font-semibold text-blue-600/70 dark:text-blue-400/70 mt-1">
                        Comments Made
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 p-5 transition-all hover:shadow-xl hover:shadow-rose-500/20 cursor-pointer border border-rose-100 dark:border-rose-900/50">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/10 rounded-full -mr-14 -mt-14 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative space-y-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 w-fit">
                      <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-rose-700 dark:text-rose-300">
                        {profile._count.Like}
                      </p>
                      <p className="text-xs font-semibold text-rose-600/70 dark:text-rose-400/70 mt-1">
                        Likes Received
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 p-5 transition-all hover:shadow-xl hover:shadow-amber-500/20 cursor-pointer border border-amber-100 dark:border-amber-900/50">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full -mr-14 -mt-14 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative space-y-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 w-fit">
                      <Bookmark className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                        {profile._count.Bookmark}
                      </p>
                      <p className="text-xs font-semibold text-amber-600/70 dark:text-amber-400/70 mt-1">
                        Posts Saved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-subtlest" />

        <div className="flex gap-6 mt-8 border-b border-subtlest">
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-4 px-2 font-semibold text-sm transition-colors relative ${
              activeTab === "posts"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Posts
            {activeTab === "posts" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`pb-4 px-2 font-semibold text-sm transition-colors relative ${
              activeTab === "bookmarks"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bookmarks
            {activeTab === "bookmarks" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`pb-4 px-2 font-semibold text-sm transition-colors relative ${
              activeTab === "community"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Community
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
              {profile._count.Comment}
            </span>
            {activeTab === "community" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
            )}
          </button>
        </div>

        <div className="mt-8">
          {activeTab === "posts" && (
            <>
              {profile.Post.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.Post.map((post) => (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      imageUrl={post.imageUrl}
                      slug={post.slug}
                      author={post.author}
                      Tags={post.Tags}
                      _count={post._count}
                      createdAt={post.createdAt}
                      isBookmarked={post.isBookmarked}
                      isLiked={post.isLiked}
                    />
                  ))}
                </div>
              ) : (
                <div className="border border-subtlest rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">No posts yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Posts will appear here once published
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "bookmarks" && (
            <div className="border border-subtlest rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <BookmarkCheck className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No bookmarks yet</h3>
              <p className="text-sm text-muted-foreground">
                Bookmarks will appear here once saved
              </p>
            </div>
          )}

          {activeTab === "community" && (
            <div className="border border-subtlest rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Community Activity</h3>
              <p className="text-sm text-muted-foreground">
                {profile._count.Comment} comments across the platform
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
