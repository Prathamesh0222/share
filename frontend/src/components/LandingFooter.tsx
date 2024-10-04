import { motion } from "framer-motion";

export const LandingFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
      }}
      className="w-full py-4 border-t-white text-white text-center"
    >
      <p>&copy; {new Date().getFullYear()} BlogInk. All rights reserved.</p>
    </motion.footer>
  );
};
