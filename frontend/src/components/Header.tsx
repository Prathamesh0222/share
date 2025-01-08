import { BookmarkCheck, Signature, SquarePen } from "lucide-react";
import { Avatar } from "./Avatar";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BOOKMARK_URL } from "@/constants/config";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.3,
        type: "spring",
      }}
    >
      <div className="p-4 border-b shadow-xl dark:bg-zinc-950 bg-white">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link to={"/blog"}>
            <div className="flex gap-2 text-xl font-bold cursor-pointer mx-2">
              <span className="mt-1">
                <Signature />
              </span>
              BlogInk
            </div>
          </Link>
          <div className="mx-3">
            <ModeToggle />
          </div>
          <div className="flex items-center justify-end w-full gap-5 mx-2">
            <Link to={BOOKMARK_URL}>
              <Button variant={"outline"}>
                <span className="md:hidden">
                  <BookmarkCheck size={20} />
                </span>
                <span className="hidden md:block">View Bookmarked Posts</span>
              </Button>
            </Link>
            <Link to={"/publish"}>
              {" "}
              <span className="flex items-center gap-2 cursor-pointer hover:underline">
                <SquarePen size={17} />
                Write
              </span>
            </Link>
            <Avatar />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
