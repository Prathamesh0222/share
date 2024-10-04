import { motion } from "framer-motion";
import { Signature, Wand } from "lucide-react";
import { Button } from "./ui/button";

export const LandingNavbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        type: "spring",
        stiffness: 100,
      }}
      className="container p-4 flex items-center text-white justify-between"
    >
      <div className="flex gap-2 items-center">
        <Signature />
        <div className="text-xl font-bold">BlogInk</div>
      </div>
      <div className="flex space-x-6 mr-4">
        <Button>Login</Button>
        <Button className="bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 text-white">
          <Wand /> <span className="ml-2">Join Now</span>
        </Button>
      </div>
    </motion.div>
  );
};
