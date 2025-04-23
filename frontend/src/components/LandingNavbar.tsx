import { motion } from "framer-motion";
import { Signature, Wand } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { SIGNIN_URL, SIGNUP_URL } from "@/constants/config";

export const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        type: "spring",
        stiffness: 100,
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/5 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Signature className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              BlogInk
            </span>
          </motion.div>

          <div className="flex items-center gap-3 md:gap-4">
            <Button
              onClick={() => navigate(SIGNIN_URL)}
              className="text-sm md:text-base hover:text-blue-400 transition-colors"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate(SIGNUP_URL)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 text-sm md:text-base px-4 md:px-6"
            >
              <Wand className="w-4 h-4 md:w-5 md:h-5" />
              <span className="ml-2">Join Now</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
