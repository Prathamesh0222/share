import { IdPost } from "@/components/IdPost";
import { useBlog } from "@/hooks/useBlog";

const BlogPost = () => {
  const { blogs, loading } = useBlog();
  if (loading) return <div>Loading...</div>;
  if (!blogs || blogs.length === 0) return <div>No blog posts available</div>;
  return <IdPost blog={blogs[0]} />;
};

export default BlogPost;
