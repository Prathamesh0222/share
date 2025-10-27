import { PostCardProps } from "@/types/types";
import Image from "next/image";
import { Bookmark, Clock, Heart, MessageCircle, Newspaper } from "lucide-react";
import { Badge } from "./ui/badge";

const formatTimeAgo = (dateString: string | Date) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

export const FeaturedPostCard = ({
  id,
  title,
  content,
  imageUrl,
  Tags,
  author,
  createdAt,
  _count,
}: PostCardProps) => {
  return <div></div>;
};

export const PostCard = ({
  title,
  content,
  imageUrl,
  Tags,
  author,
  createdAt,
  _count,
}: PostCardProps) => {
  const timeAgo = formatTimeAgo(createdAt);
  return (
    <div className="max-w-md p-2 flex flex-col h-full">
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center rounded-xl">
            <Newspaper className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Published {timeAgo}</span>
        </div>
        <h1 className="text-lg font-semibold leading-tight text-foreground my-1">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm">
          {content.length > 80 ? `${content.slice(0, 80)}...` : content}
        </p>
        <div className="flex flex-wrap gap-2 my-4">
          {Tags.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-green-500 text-green-200 font-bold text-lg">
              {author.name ? author.name.charAt(0).toUpperCase() : "?"}
            </div>
            <h3 className="text-muted-foreground text-sm font-semibold">
              {author.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Heart className="size-4" />
              <p className="text-xs">{_count.Like}</p>
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="size-4" />
              <p className="text-xs">{_count.Bookmark}</p>
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="size-4" />
              <p className="text-xs">{_count.Comment}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
