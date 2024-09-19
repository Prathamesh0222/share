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
  );
};

export default Blog;
