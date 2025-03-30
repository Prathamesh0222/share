import { BookmarkCheck, Signature, SquarePen } from "lucide-react";
import { Avatar } from "./Avatar";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BOOKMARK_URL } from "@/constants/config";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="fixed top-0 w-full z-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
        }}
      >
        <div className="max-w-6xl mx-auto py-4 md:px-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to={"/blog"}>
              <div className="flex items-center gap-2 text-xl font-bold cursor-pointer hover:scale-105 duration-300">
                <span className="rounded-lg">
                  <Signature />
                </span>
                <span className="text-black dark:text-white">BlogInk</span>
              </div>
            </Link>
            <div className="ml-2 md:ml-6 hidden md:block">
              <ModeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="md:block hidden">
              <Link to={BOOKMARK_URL}>
                <Button
                  variant={"outline"}
                  className="rounded-full px-4 py-2 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
                >
                  <BookmarkCheck
                    size={18}
                    className="text-blue-600 dark:text-blue-400 mr-2"
                  />
                  <span className="hidden md:block font-medium">Bookmarks</span>
                </Button>
              </Link>
            </div>
            <Link to={"/publish"}>
              <Button
                variant="ghost"
                className="rounded-full flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
              >
                <SquarePen
                  size={18}
                  className="text-blue-600 dark:text-blue-400"
                />
                <span className="font-medium">Write</span>
              </Button>
            </Link>
            <div className="ml-2">
              <Avatar />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
