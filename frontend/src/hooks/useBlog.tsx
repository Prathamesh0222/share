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
}

export const useBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
          throw new Error("No token found");
        }

        const token = JSON.parse(tokenString).token || tokenString;

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data);
      } catch (error: any) {
        console.error("Error fetching blogs:", error);
        if (error.response) {
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
