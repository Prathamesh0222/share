import { BookmarkIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

interface BlogCardProps {
  title: string;
  author: {
    name: string;
  };
  content: string;
  publishedDate: string;
  id: string;
  imgUrl: string;
  tags:{name:string}[];
}

export const BlogCard = ({
  id,
  title,
  author,
  content,
  imgUrl,
  tags,
  publishedDate,
}: BlogCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };

  return (
    <main className="p-4 mx-auto bg-white border rounded-xl dark:bg-slate-950 max-w-7xl sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row">
        <div className="flex justify-center mb-4 sm:mb-0 sm:mr-6 sm:w-1/3">
          <img
            src={imgUrl}
            className="object-cover w-full h-48 rounded-lg lg:h-48 md:h-full lg:w-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:underline">
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
            <img
              src={`https://p.kindpng.com/picc/s/24-248253_user-profile-default-image-png-clipart-png-download.png`}
              className="object-cover w-10 h-10 rounded-full sm:h-12 sm:w-12"
            />
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <span className="text-sm text-gray-700">{author.name}</span>
              <span className="text-sm text-gray-600">{publishedDate}</span>
            </div>
          </div>
          <div className="mt-6 space-x-3">
            {tags.map((tag)=> {
              return <Badge variant={"secondary"}>{tag.name}</Badge>
            })}
            </div>
        </div>
      </div>
    </main>
  );
};
