import { PostCardProps } from "@/types/types";
import Image from "next/image";
import { Bookmark, Clock, Heart, MessageCircle, Newspaper } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/format-time";
import { useToggleBookmark } from "@/hooks/toggle-bookmark";
import { useToggleLike } from "@/hooks/toggle-like";

export const PostCard = ({
  id,
  title,
  content,
  imageUrl,
  Tags,
  slug,
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
    <div className="border border-subtlest rounded-lg overflow-hidden h-full flex flex-col bg-background">
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Newspaper className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="p-4 space-y-3 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Published {timeAgo}</span>
        </div>
        <h2 className="text-lg font-bold leading-tight text-foreground line-clamp-2">
          <Link
            href={href}
            className="hover:underline hover:text-green-500 duration-200 transition-colors"
          >
            {title}
          </Link>
        </h2>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {content.length > 120 ? `${content.slice(0, 120)}...` : content}
        </p>
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
              <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-green-500 text-green-200 font-bold text-sm">
                {author?.name ? author.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
            <h3 className="text-muted-foreground text-sm font-semibold">
              {author?.name || "Unknown"}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1 cursor-pointer">
              <Heart
                className={`size-4 transition-all ${
                  isLiked
                    ? "fill-green-500 text-green-500"
                    : "hover:fill-green-500 hover:text-green-500"
                } ${isLikePending ? "opacity-50" : ""}`}
                onClick={handleLikeClick}
              />
              <span className="text-xs">{likeCount}</span>
            </span>
            <span className="flex items-center gap-1">
              <Bookmark
                className={`h-4 w-4 cursor-pointer transition-all ${
                  isBookmarked
                    ? "fill-green-500 text-green-500"
                    : "hover:text-green-500"
                } ${isPending ? "opacity-50" : ""}`}
                onClick={handleBookmarkClick}
              />
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
};
