import { formatTimeAgo } from "@/lib/format-time";
import { PostCardProps } from "@/types/types";
import { Bookmark, Clock, Heart, MessageCircle, Newspaper } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { useToggleBookmark } from "@/hooks/toggle-bookmark";
import { useToggleLike } from "@/hooks/toggle-like";

export const FeaturedPostCard = ({
  id,
  title,
  content,
  imageUrl,
  slug,
  Tags,
  author,
  createdAt,
  _count,
  isBookmarked = false,
  isLiked = false,
}: PostCardProps) => {
  const timeAgo = formatTimeAgo(createdAt);
  const likeCount = _count?.Like || 0;
  const bookmarkCount = _count?.Bookmark || 0;
  const commentCount = _count?.Comment || 0;
  const href = slug ? `/post/${slug}` : `/post/${id}`;
  const { mutate: toggleBookmark, isPending } = useToggleBookmark(id);
  const { mutate: toggleLike, isPending: isLikePending } = useToggleLike(id);

  const handleBookmarkClick = () => {
    toggleBookmark(!isBookmarked);
  };

  const handleLikeClick = () => {
    toggleLike(!isLiked);
  };
  return (
    <div className="col-span-12 border border-subtlest rounded-lg overflow-hidden flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-0 lg:p-6 flex-1">
        <div className="relative h-48 lg:h-80 rounded-lg overflow-hidden order-1 lg:order-2">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              loading="eager"
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Newspaper className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="space-y-4 order-2 lg:order-1 flex flex-col h-full p-4 lg:p-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Published {timeAgo}</span>
          </div>
          <h1 className="text-lg lg:text-3xl font-bold leading-tight text-foreground">
            <Link
              href={href}
              className="hover:underline hover:text-green-500 duration-200 transition-colors"
            >
              {title}
            </Link>
          </h1>
          <div
            className="text-muted-foreground text-sm leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{
              __html:
                typeof content === "string"
                  ? content.length > 200
                    ? `${content.substring(0, 200)}...`
                    : content
                  : "",
            }}
          />
          <div className="flex flex-wrap gap-2">
            {Tags.map((tag) => (
              <Badge key={tag.id} className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between">
            <Link
              href={author?.id ? `/profile/${author.id}` : "#"}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {author?.image ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-8 h-8 relative rounded-full border bg-green-500 text-green-200 font-bold text-sm">
                  {author?.name ? author.name.charAt(0).toUpperCase() : "?"}
                </div>
              )}
              <h3 className="text-muted-foreground text-sm font-semibold">
                {author?.name || "Unknown"}
              </h3>
            </Link>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart
                  className={`h-4 w-4 cursor-pointer transition-all ${
                    isLiked
                      ? "fill-green-500 text-green-500"
                      : "hover:fill-green-500 hover:text-green-500"
                  } ${isLikePending ? "opacity-50" : ""}`}
                  onClick={handleLikeClick}
                />
                <span className="text-xs">{likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bookmark
                  className={`h-4 w-4 cursor-pointer transition-all ${
                    isBookmarked
                      ? "fill-green-500 text-green-500"
                      : "hover:text-green-500"
                  } ${isPending ? "opacity-50" : ""}`}
                  onClick={handleBookmarkClick}
                />
                <span className="text-xs">{bookmarkCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
