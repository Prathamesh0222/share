import { Header } from "./Header";
import { BookmarkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/constants/config";
import { toast } from "sonner";

interface Blog {
  id: string;
  content: string;
  title: string;
  author: {
    name: string;
  };
  imgUrl: string;
  published: string;
  Comment: {
    content: string;
    user: {
      name: string;
    };
    addedAt: string;
  }[];
}

export const IdPost = ({ blog }: { blog: Blog }) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Blog["Comment"]>(
    [...blog.Comment].reverse()
  );

  const formattedDate = blog.published
    ? new Date(blog.published).toLocaleString()
    : "Not available";

  const postComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog/comment`,
      {
        postId: blog.id,
        content: commentInput,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComments([response.data, ...comments]);
    toast("Comment added successfully");
    setCommentInput("");
  };

  return (
    <div>
      <Header />
      <div className="mt-3 text-center">
        <div className="lg:max-w-5xl px-4 py-12 mx-auto ">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
              className="px-8 mb-8 text-3xl md:text-5xl font-bold tracking-tight text-start"
            >
              {blog.title}
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            className="flex justify-center mx-8"
          >
            <Dialog>
              <DialogTrigger asChild>
                <img
                  className="rounded-3xl object-cover h-48 md:h-[480px] lg:h-[580px] w-full"
                  src={blog.imgUrl}
                  alt="Blog Image"
                />
              </DialogTrigger>
              <DialogContent>
                <img src={blog.imgUrl} alt="Blog Image" />
              </DialogContent>
            </Dialog>
          </motion.div>
          <div className="mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            className="my-4 dark:border-cyan-200"
          >
            <div className="px-8 text-gray-500 dark:text-slate-300 text-start">
              <div className="flex justify-between">
                <div>
                  By <span className="underline">{blog.author.name}</span> •{" "}
                  <time>{formattedDate}</time>
                </div>
                <BookmarkIcon className="w-5 h-5 mx-2" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            className="px-8 text-lg leading-8 text-justify text-foreground"
          >
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            <div className="mt-12 border-t">
              <h1 className="font-semibold text-2xl my-5">Comments</h1>
              <Input
                placeholder="Write a comment..."
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    postComment();
                  }
                }}
                value={commentInput}
              />
              {comments.map((comment, index) => (
                <div
                  className="mt-12 text-sm flex gap-3 items-center"
                  key={index}
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    {comment.user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{comment.user.name}</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(comment.addedAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1">{comment.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
