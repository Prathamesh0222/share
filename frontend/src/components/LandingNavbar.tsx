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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl container p-4 flex items-center text-white justify-between">
        <div className="flex gap-2 items-center">
          <Signature />
          <div className="text-xl font-bold">BlogInk</div>
        </div>
        <div className="flex space-x-3 mr-4">
          <Button
            onClick={() => {
              navigate(SIGNIN_URL);
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate(SIGNUP_URL);
            }}
            className="bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white"
          >
            <Wand /> <span className="ml-2">Join Now</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
