import { BlogCard } from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { useBlog } from "@/hooks/useBlog";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { motion } from "framer-motion";

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
      <div className="py-6 sm:px-0">
        <div className="flex justify-center mx-12 md:mx-32 lg:w-1/2 lg:mx-auto mb-8 mt-4">
          <Input
            placeholder="Search for blogs"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <motion.div key={index} variants={itemVarient}>
              <BlogCardSkeleton />
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={containerVarient}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredBlogs.map((blog) => (
              <motion.div key={blog.id} variants={itemVarient}>
                <BlogCard
                  key={blog.id}
                  imgUrl={blog.imgUrl}
                  id={blog.id}
                  author={blog.author}
                  title={blog.title}
                  content={blog.content}
                  tags={blog.tags}
                  publishedDate={"2nd Feb 2024"}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
