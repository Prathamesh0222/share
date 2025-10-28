import { useFetchPost } from "@/hooks/use-fetch-post";
import Image from "next/image";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/format-time";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { DiscoverMoreProps } from "@/types/types";

export const DiscoverMore = ({ currentSlug }: { currentSlug: string }) => {
  const { data, isFetchingNextPage } = useFetchPost();
  const posts = data?.pages?.[0]?.data ?? [];
  const related = posts
    .filter((p: DiscoverMoreProps) => p.slug !== currentSlug)
    .slice(0, 3);

  if (!data) {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded" />
        ))}
      </div>
    );
  }

  if (!related.length) {
    return <p className="mt-3 text-muted-foreground">No related posts yet.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {related.map((p: any) => {
        const timeAgo = formatTimeAgo(p.createdAt);
        const href = p.slug ? `/post/${p.slug}` : `/post/${p.id}`;
        const excerpt =
          typeof p.content === "string"
            ? p.content.length > 120
              ? `${p.content.slice(0, 120)}...`
              : p.content
            : "";
        const likeCount = p?._count?.Like ?? 0;
        const bookmarkCount = p?._count?.Bookmark ?? 0;
        const commentCount = p?._count?.Comment ?? 0;

        return (
          <div
            key={p.id}
            className="border border-subtlest rounded-lg overflow-hidden h-full flex flex-col bg-background"
          >
            <div className="relative h-48 w-full">
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
            </div>
            <div className="p-4 space-y-3 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Published {timeAgo}</span>
              </div>
              <h2 className="text-lg font-bold leading-tight text-foreground line-clamp-2">
                <Link
                  href={href}
                  className="hover:underline hover:text-green-500 duration-200 transition-colors"
                >
                  {p.title}
                </Link>
              </h2>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-green-500 text-green-200 font-bold text-sm">
                    {p.author?.name
                      ? p.author.name.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {p.author?.name || "Unknown"}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="size-4" />
                    <p className="text-xs">{likeCount}</p>
                  </span>
                  <span className="flex items-center gap-1">
                    <Bookmark className="size-4" />
                    <p className="text-xs">{bookmarkCount}</p>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-4" />
                    <p className="text-xs">{commentCount}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {isFetchingNextPage ? <div className="h-48 bg-muted rounded" /> : null}
    </div>
  );
};
