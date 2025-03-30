import { useEffect } from "react";
import { useBookmark } from "@/hooks/useBookmark";
import { BlogCard } from "./BlogCard";
import { Header } from "./Header";
import { motion } from "framer-motion";

const BookmarkedPosts = () => {
  const { bookmarkedPosts, getBookmarks } = useBookmark();

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4 mx-auto max-w-5xl md:p-6 lg:p-8 mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Bookmarked Posts
        </h2>
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: "easeOut",
            stiffness: 100,
            type: "spring",
            damping: 10,
          }}
        >
          {bookmarkedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-4">
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
          ) : (
            <div className="flex flex-col items-center justify-center text-center w-full h-64">
              <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
                No Bookmarked Posts
              </h1>
              <p className="text-gray-500 dark:text-gray-500">
                Start bookmarking your favorite posts to see them here.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookmarkedPosts;
