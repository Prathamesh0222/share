import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";
import { motion } from "framer-motion";

export const Landing = () => {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <LandingNavbar />
      <div className="flex-grow mt-32 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
          }}
          className="text-7xl text-center font-bold"
        >
          <span className="text-cyan-200">Welcome to</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-200 via-blue-500 to-blue-400 text-center">
            BlogInk
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
          }}
          className="text-center text-xl text-white mt-4 mx-12"
        >
          Your go-to platform for sharing stories, ideas, and insights through
          blogs.
        </motion.div>
      </div>
      <LandingFooter />
    </div>
  );
};
