import { Header } from "./Header";
import { BookmarkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  content: string;
  title: string;
  author: {
    name: string;
  };
  imgUrl: string;
  published: string;
}

export const IdPost = ({ blog }: { blog: Blog }) => {
  const formattedDate = blog.published
    ? new Date(blog.published).toLocaleString()
    : "Not available";
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};
