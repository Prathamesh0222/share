import { motion, useInView } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useRef } from "react";

export const LandingFooter = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const featureInView = useInView(footerRef, { once: false });
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={
        featureInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: -50, scale: 0.9 }
      }
      transition={{
        duration: 0.8,
        delay: 0.5,
        type: "spring",
        ease: "easeOut",
        stiffness: 100,
        damping: 10,
      }}
      ref={footerRef}
      className="max-w-7xl mx-auto flex justify-between w-full p-5 text-white text-center"
    >
      <p className="text-muted-foreground">
        Designed and Developed by Prathamesh
      </p>
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
    </motion.div>
  );
};
