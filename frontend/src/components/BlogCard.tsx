import { Bookmark } from "lucide-react";

interface BlogCardProps {
    title: string;
    author: string;
    content: string;
    publishedDate: string;
  }
  
  export const BlogCard = ({
    title,
    author,
    content,
    publishedDate,
  }: BlogCardProps) => {
    return (
      <div className="container p-4 mx-auto">
        <div className="max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-md md:p-6 lg:p-8 dark:bg-gray-800">
          <div className="flex">
            <div className="flex flex-col justify-start">
              <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
                {title}
              </h2>
              <p className="w-[80%] text-sm text-gray-700 md:text-base lg:text-lg dark:text-gray-300">
                {content.slice(0, 100) + "..."}
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm">
                <p className="text-sm dark:text-muted-foreground text-muted-foreground">
                  By {author}
                </p>
                <p className="text-sm dark:text-muted-foreground text-muted-foreground">
                  {publishedDate}
                </p>
                <Bookmark size={20} className="ml-auto mr-20 cursor-pointer text-muted-foreground" />
              </div>
            </div>
            <div className="ml-auto">
              <img src="./images.jpeg" className="flex" width={200} height={200} />
            </div>
          </div>
        </div>
      </div>
    );
  };