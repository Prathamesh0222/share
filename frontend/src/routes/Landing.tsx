import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.7,
            type: "spring",
          }}
          className="mt-12 flex justify-center"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </motion.div>
      </div>
      <LandingFooter />
    </div>
  );
};
