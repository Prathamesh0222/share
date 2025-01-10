import { motion } from "framer-motion";

export function GridSmallBackgroundDemo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: 0.3,
        type: "spring",
      }}
      className="h-[50rem] w-full bg-background dark:bg-background dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          delay: 0.3,
          type: "spring",
        }}
        className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background dark:bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      ></motion.div>
    </motion.div>
  );
}
