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
    <main className="p-4 mx-auto bg-white border rounded-xl dark:bg-zinc-950 max-w-7xl sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row">
        <div className="flex justify-center mb-4 sm:mb-0 sm:mr-6 sm:w-1/3">
          <img
            src={imgUrl}
            className="object-cover w-full h-48 rounded-lg lg:h-48 md:h-full lg:w-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:underline mr-2">
              <Link to={`/blog/${id}`}>{title}</Link>
            </h2>
            <div className="mt-2">
              <BookmarkIcon
                onClick={toggleBookmark}
                className={`w-6 h-6 cursor-pointer ${
                  isBookmarked ? "fill-blue-500" : "text-gray-500"
                }`}
              />
            </div>
          </div>
          <div
            className="pr-12 mt-4 mb-4 text-justify text-gray-600"
            dangerouslySetInnerHTML={{ __html: content.slice(0, 200) + "..." }}
          />
          <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <span className="rounded-full w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
              {author.name ? author.name[0].toUpperCase() : "?"}
            </span>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <span className="text-sm text-gray-700">{author.name}</span>
              <span className="text-sm text-gray-600">{formattedDate}</span>
            </div>
          </div>
          <div className="mt-6 space-x-3">
            {tags.map((tag) => {
              return (
                <Badge key={tag.name} variant={"default"}>
                  {tag.name}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
