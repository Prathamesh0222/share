import { IdPost } from "@/components/IdPost";
import { useBlog } from "@/hooks/useBlog";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();
  const { blogs, loading } = useBlog();
  if (loading) return <div>Loading...</div>;
  if (!blogs || blogs.length === 0) return <div>No blog posts available</div>;
  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) return <div>Blog not found</div>;
  return <IdPost blog={blog} />;
};

export default BlogPost;
