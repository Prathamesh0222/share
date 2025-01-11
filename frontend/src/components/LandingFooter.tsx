import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

export const LandingFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
      }}
      className="max-w-7xl mx-auto flex justify-between w-full p-5 mt-2 text-white text-center"
    >
      <p>&copy; {new Date().getFullYear()} BlogInk. All rights reserved.</p>
      <div className="flex gap-2">
        <a
          href="https://github.com/Prathamesh0222"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
        <a
          href="https://www.linkedin.com/in/prathamesh-pimpalkar-903b0621a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>
      </div>
    </motion.footer>
  );
};
