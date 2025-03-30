import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/constants/config";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  imgUrl: string;
}

const IdBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully");
      setIsDialogOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        toast.error("Error while deleting blog");
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/id`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data.response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          My Blogs
        </h1>
        <div className="h-1 w-20 bg-blue-500 rounded"></div>
      </div>

      {blogs.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center text-center w-full p-12 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm max-w-2xl mx-auto">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Blogs Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Share your thoughts with the world by creating your first blog
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center">
            <span className="mr-2">Create New Blog</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
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
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              {blogs.map((blog: Blog, idx) => (
                <div key={idx}>
                  <Card className="overflow-hidden h-full shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <img
                        src={blog.imgUrl}
                        className="object-cover w-full h-56 duration-500 hover:scale-110"
                        alt={blog.title}
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-black dark:bg-white dark:text-black rounded-full">
                          Blog
                        </span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle
                        onClick={() => navigate(`/blog/${blog.id}`)}
                        className="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200"
                      >
                        {blog.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div
                        className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: blog.content.slice(0, 150) + "...",
                        }}
                      />
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => navigate(`/blog/${blog.id}`)}
                          className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center"
                        >
                          Read more
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </button>

                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}
                        >
                          <DialogTrigger
                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                            onClick={() => {
                              setSelectedBlogId(blog.id);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Button variant="ghost" size="sm" className="p-2">
                              <Trash size={18} className="text-red-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold text-center">
                                Delete Blog
                              </DialogTitle>
                              <DialogDescription className="text-center">
                                <p className="text-base">
                                  This action cannot be undone. This will
                                  permanently delete your blog and remove it
                                  from our servers.
                                </p>
                                <div className="flex justify-center space-x-4 mt-6">
                                  <Button
                                    onClick={() => {
                                      setIsDialogOpen(false);
                                    }}
                                    variant="outline"
                                    className="w-32"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleDelete(selectedBlogId!)
                                    }
                                    variant="destructive"
                                    className="w-32"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default IdBlog;
