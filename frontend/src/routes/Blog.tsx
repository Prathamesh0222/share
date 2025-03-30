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
      <div className="py-6 sm:px-0 mt-24">
        <div className="flex justify-center mx-12 md:mx-32 lg:w-1/3 lg:mx-auto mb-8 mt-4">
          <Input
            placeholder="Search for blogs"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
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
                  published={blog.published}
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
