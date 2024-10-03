import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/constants/config";

export interface Blog {
  id: string;
  content: string;
  title: string;
  author: {
    name: string;
  };
  imgUrl: string;
  tags: {name:string}[];
  PostTag: { tag: { name: string } }[];
}

export const useBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const blogsData = response.data.map((blog: Blog) => ({
          ...blog,
          tags: blog.PostTag.map((postTag: { tag: { name: string } }) => postTag.tag)
        }));
        setBlogs(blogsData);
        console.log("Fetched blogs:", blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        if (axios.isAxiosError(error) && error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return { blogs, loading };
};
