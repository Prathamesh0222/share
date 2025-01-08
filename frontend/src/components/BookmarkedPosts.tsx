import { useEffect } from "react";
import { useBookmark } from "@/hooks/useBookmark";
import { BlogCard } from "./BlogCard";
import { Header } from "./Header";

const BookmarkedPosts = () => {
  const { bookmarkedPosts, getBookmarks } = useBookmark();

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Bookmarked Posts
        </h2>
        <div className="space-y-5">
          {bookmarkedPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              content={post.content}
              imgUrl={post.imgUrl}
              tags={post.PostTag.map((postTag: any) => postTag.tag)}
              published={post.published}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookmarkedPosts;
