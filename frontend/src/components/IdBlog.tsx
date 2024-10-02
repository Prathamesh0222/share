import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/constants/config";

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
    <div>
      <div className="flex justify-center mt-24 mb-8 text-3xl">My Blogs</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!loading ? (
          blogs.map((blog: Blog) => (
            <div className="px-6 py-6">
              <Card key={blog.id}>
                <CardHeader>
                  <CardHeader>
                    <img
                      src={blog.imgUrl}
                      className="object-cover w-full h-48"
                    />
                  </CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blog.content.slice(0, 200) + "...",
                    }}
                  />
                </CardContent>
                <div className="flex items-center justify-between">
                  <Dialog>
                    <DialogTrigger className="p-8 mb-4">
                      <Button variant={"destructive"}>
                        <Delete size={20} />{" "}
                        <span className="ml-2">Delete</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="text-lg">
                          This action cannot be undone. This will permanently
                          delete your blog and remove it from our servers.
                          <div className="flex justify-center md:justify-end lg:justify-end items-center space-x-2 mt-4">
                            <Button variant={"destructive"}>
                              <span>Delete</span>
                            </Button>
                            <Button variant={"default"}>
                              <span>Cancel</span>
                            </Button>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default IdBlog;
