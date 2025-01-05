import { SquarePen } from "lucide-react";
import { Avatar } from "./Avatar";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BOOKMARK_URL } from "@/constants/config";

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
      <div className="p-4 border-b-2 dark:border-b shadow-xl dark:bg-[#00091D] bg-white flex">
        <div className="flex w-full items-center">
          <Link to={"/blog"}>
            <h1 className="text-2xl font-bold cursor-pointer">BlogInk</h1>
          </Link>
          <div className="mx-8">
            <ModeToggle />
          </div>
        </div>
        <div className="flex items-center justify-end w-full gap-6 mx-8">
          <Link to={BOOKMARK_URL}>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              View Bookmarked Posts
            </button>
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
    </motion.div>
  );
};
