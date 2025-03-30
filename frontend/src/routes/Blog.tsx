import { BlogCard } from "@/components/BlogCard";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { useBlog } from "@/hooks/useBlog";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SIGNIN_URL } from "@/constants/config";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { SearchIcon } from "lucide-react";

const containerVarient = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVarient = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const Blog = () => {
  const { blogs, loading } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate(SIGNIN_URL);
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
  );

  return (
    <div>
      <Header />
      <div className="md:py-6 px-0 mt-24">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="relative justify-center mx-12 md:mx-32 lg:w-1/3 lg:mx-auto mb-8 mt-4"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            placeholder="Search for blogs"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="pl-10"
          />
        </motion.div>
        {loading ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 max-w-6xl items-center xl:mx-auto mx-4">
            {[...Array(4)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVarient}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 grid-cols-1 gap-3 max-w-6xl items-center xl:mx-auto mx-4"
          >
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <motion.div key={blog.id} variants={itemVarient}>
                  <BlogCard
                    key={blog.id}
                    imgUrl={blog.imgUrl}
                    id={blog.id}
                    author={blog.author}
                    title={blog.title}
                    content={blog.content}
                    tags={blog.tags}
                    published={blog.published}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="flex flex-col items-center justify-center h-96 gap-4">
                  <SearchIcon className="w-12 h-12 text-gray-400" />
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    No Blogs Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    We couldn't find any blogs matching your search. <br />
                    Try different keywords or check back later!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
