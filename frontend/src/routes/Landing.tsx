import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import landingImage from "../assets/landing_page_ss.jpg";
import { MouseIcon } from "lucide-react";

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
    <div className="min-h-screen overflow-hidden flex flex-col ">
      <LandingNavbar />
      <div className="flex-grow mt-32 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
          }}
          className="text-7xl text-center font-bold"
        >
          <span>Welcome to</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-200 via-blue-500 to-blue-400 text-center">
            BlogInk
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
          }}
          className="text-center text-xl text-white mt-4 mx-12"
        >
          Your go-to platform for sharing stories, ideas, and insights through
          blogs.
          <div className="mt-5 sm:space-x-2 gap-2 flex flex-col md:flex-row md:justify-center">
            <Button variant={"outline"}>Get Started</Button>
            <Button variant={"default"}>Features</Button>
          </div>
          <div className="flex justify-center mt-12 relative">
            <div className="absolute -top-10 inset-x-96 h-[110%] -z-10">
              <div className="w-full h-full bg-gradient-to-b from-blue-600/30 via-blue-600/20 to-transparent blur-2xl" />
            </div>

            <div className="relative">
              <img
                src={landingImage}
                alt="Landing page illustration"
                className="max-w-[1000px] border h-auto rounded-lg relative shadow-lg hover:shadow-2xl transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-b from-transparent via-background/70 to-background" />
            </div>
          </div>
        </motion.div>
        <div className="2xl:hidden flex justify-center mt-32 animate-bounce">
          <MouseIcon />
        </div>
        <div className="min-h-screen flex flex-col items-center mt-32">
          <h1 className="text-5xl font-bold">Features</h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
