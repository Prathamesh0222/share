import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBlog } from "@/hooks/useBlog";
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

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

const IdBlog = () => {
  const { blogs, loading } = useBlog();
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
                      src="https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
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
                  <CardFooter>
                    <p>Author: {blog.author.name}</p>
                  </CardFooter>
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
