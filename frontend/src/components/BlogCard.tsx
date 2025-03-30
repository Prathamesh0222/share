import { BookmarkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { useBookmark } from "@/hooks/useBookmark";

interface BlogCardProps {
  title: string;
  author: {
    name: string;
  };
  content: string;
  published: string;
  id: string;
  imgUrl: string;
  tags: { name: string }[];
}

export const BlogCard = ({
  id,
  title,
  author,
  content,
  imgUrl,
  tags,
  published,
}: BlogCardProps) => {
  const { removeBookmark, getBookmarks, addBookmark, bookmarks } =
    useBookmark();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    getBookmarks();
  }, []);

  useEffect(() => {
    setIsBookmarked(bookmarks.includes(id));
  }, [bookmarks, id]);

  const toggleBookmark = async () => {
    if (isBookmarked) {
      await removeBookmark(id);
      toast("Removed from bookmarks");
    } else {
      await addBookmark(id);
      toast("Added to bookmarks");
    }
    setIsBookmarked(!isBookmarked);
  };

  const formattedDate = new Date(published).toLocaleDateString();

  return (
    <article className="max-w-4xl overflow-hidden bg-white border rounded-xl shadow-sm dark:bg-zinc-950 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col h-[600px] md:h-[560px]">
        <div className="relative md:h-60 h-64">
          <img
            src={imgUrl}
            alt={title}
            className="object-cover w-full h-full duration-500 hover:scale-110"
          />
          <button
            onClick={toggleBookmark}
            className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/50 rounded-full shadow-sm hover:bg-white dark:hover:bg-black transition-colors"
            aria-label={
              isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
            }
          >
            <BookmarkIcon
              className={`w-5 h-5 ${
                isBookmarked ? "fill-blue-500 text-blue-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <div className="mb-3 space-y-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.name}
                  variant={"secondary"}
                  className="dark:text-blue-300 text-blue-600"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
            <h2 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              <Link
                to={`/blog/${id}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200"
              >
                {title}
              </Link>
            </h2>
          </div>

          <div
            className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: content.slice(0, 200) + "..." }}
          />

          <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {author.name ? author.name[0].toUpperCase() : "?"}
            </span>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                {author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
