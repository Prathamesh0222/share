import { useFetchPost } from "@/hooks/use-fetch-post";
import Image from "next/image";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/format-time";
import { Bookmark, Clock, Heart, MessageCircle } from "lucide-react";
import { DiscoverMoreProps, PostCardProps } from "@/types/types";
import { generateSummary } from "@/lib/generate-summary";
import { instrumentSerif } from "@/lib/font";

export const DiscoverMore = ({
  currentSlug,
  currentId,
}: {
  currentSlug: string;
  currentId?: string;
}) => {
  const { data, isFetchingNextPage } = useFetchPost();
  const posts = data?.pages?.flatMap((page) => page.data) ?? [];
  const related = posts
    .filter(
      (p: DiscoverMoreProps) => p.slug !== currentSlug && p.id !== currentId
    )
    .slice(0, 3);

  if (!data) {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border border-subtlest rounded-lg overflow-hidden h-full flex flex-col bg-background"
          >
            <div className="h-48 w-full bg-muted animate-pulse" />
            <div className="p-4 space-y-3 flex flex-col flex-1">
              <div className="h-3 w-28 bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                  <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-6 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-6 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-6 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!related.length) {
    return <p className="mt-3 text-muted-foreground">No related posts yet.</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {related.map((p: PostCardProps) => {
        const timeAgo = formatTimeAgo(p.createdAt);
        const href = p.slug ? `/post/${p.slug}` : `/post/${p.id}`;
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
                <span>
                  {" "}
                  <Clock className="h-4 w-4" /> {formatTimeAgo(p.createdAt)}
                </span>1
              </div>
              <h2
                className={`text-lg leading-tight text-foreground line-clamp-2 ${instrumentSerif.className}`}
              >
                <Link
                  href={href}
                  className="hover:underline hover:text-green-500 duration-200 transition-colors"
                >
                  {p.title}
                </Link>
              </h2>
              <p
                className="text-muted-foreground text-xs line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html:
                    typeof p.content === "string"
                      ? generateSummary(p.content, 200)
                      : "",
                }}
              ></p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {p.author?.image ? (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={p.author.image}
                        alt={p.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-green-500 text-green-200 font-bold text-sm">
                      {p.author?.name
                        ? p.author.name.charAt(0).toUpperCase()
                        : "?"}
                    </div>
                  )}
                  <h3 className="text-muted-foreground text-xs font-semibold">
                    {p.author?.name.split(" ")[0] || "Unknown"}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="size-3" />
                    <p className="text-xs">{likeCount}</p>
                  </span>
                  <span className="flex items-center gap-1">
                    <Bookmark className="size-3" />
                    <p className="text-xs">{bookmarkCount}</p>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-3" />
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
