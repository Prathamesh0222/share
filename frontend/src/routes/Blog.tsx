import { BlogCard } from "@/components/BlogCard";
import { Header } from "@/components/Header";
import { useBlog } from "@/hooks/useBlog";

const Blog = () => {
  const { blogs, loading } = useBlog();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="py-6 sm:px-0">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Latest Blogs
        </h1>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              author={blog.author}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
