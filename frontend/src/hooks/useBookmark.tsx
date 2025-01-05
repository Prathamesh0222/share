import { BACKEND_URL } from "@/constants/config";
import axios from "axios";
import { useState } from "react";



export const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any[]>([]);

  const getBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No Token found!!");
      }

      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/bookmarks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bookmarkIds = response.data.map(
        (bookmark: any) => bookmark.post.id
      );
      setBookmarks(bookmarkIds);
      setBookmarkedPosts(response.data.map((bookmark: any) => bookmark.post));
    } catch (error) {
      console.error("Error while fetching bookmark: ", error);
    }
  };

  const removeBookmark = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No Token found!!");
      }

      await axios.delete(`${BACKEND_URL}/api/v1/blog/bookmark`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { postId },
      });
      
      setBookmarks((prev) => prev.filter((id) => id !== postId));
      setBookmarkedPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error removing bookmark: ", error);
    }
  };

  const addBookmark = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No Token found!!!");
      }

      await axios.post(
        `${BACKEND_URL}/api/v1/blog/bookmark`,
        { postId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookmarks((prev) => [...prev, postId]);
    } catch (error) {
      console.error("Error adding bookmark", error);
    }
  };

  return {
    removeBookmark,
    getBookmarks,
    addBookmark,
    bookmarks,
    bookmarkedPosts,
    setBookmarkedPosts,
  };
};