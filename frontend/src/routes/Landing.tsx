import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion, useInView } from "framer-motion";
import { GridSmallBackgroundDemo } from "@/components/ui/grid-background";
import { features } from "@/constants/Features";
import { testimonials } from "@/constants/testimonials";
import { useRef } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";
import landingImageSm from "../assets/landing_page_ss_sm.jpg";
import landingImageMd from "../assets/landing_page_ss_md.jpg";
import landingImageLg from "../assets/landing_page_ss.jpg";
import FeaturedPosts from "@/components/FeaturedPost";

export const Landing = () => {
  const featureVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  const featuresRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuresRef, { once: true });

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <LandingNavbar />
      <div className="relative flex-grow">
        <div className="absolute inset-0">
          <GridSmallBackgroundDemo />
        </div>
        <div className="relative mt-48 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 0.3,
              type: "spring",
            }}
            className="text-7xl text-center font-bold tracking-tight"
          >
            <span>Welcome to</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-blue-500 to-blue-400 text-center">
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
              <Button
                variant={"default"}
                onClick={() =>
                  featuresRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Features
              </Button>
            </div>
            <div className="flex justify-center mt-12 relative">
              <div className="absolute -top-10 inset-x-0 md:inset-x-0 lg:inset-x-0 xl:inset-x-0 2xl:inset-x-48 h-[110%] -z-10">
                <div className="w-full h-full bg-gradient-to-b from-blue-600/30 via-blue-600/20 to-transparent blur-2xl" />
              </div>
              <div className="relative">
                <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[807px] max-w-[1366px] shadow-xl">
                  <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                  <div className="rounded-[2rem] overflow-hidden h-[770px] bg-white dark:bg-gray-800">
                    <ResponsiveImage
                      landingImageSm={landingImageSm}
                      landingImageMd={landingImageMd}
                      landingImage={landingImageLg}
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-b from-transparent via-background/70 to-background" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 0.6,
              type: "spring",
            }}
            variants={featureVariants}
            className="max-w-7xl mx-auto"
          >
            <h1 className="mt-32 text-5xl text-center mb-20 font-bold decoration-blue-500 underline underline-offset-8">
              Featured Blogs
            </h1>
            <FeaturedPosts />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? "visible" : "hidden"}
            variants={featureVariants}
            transition={{
              duration: 1,
              delay: 0.3,
              type: "spring",
            }}
            ref={featuresRef}
            className="min-h-screen max-w-7xl mx-auto flex flex-col mt-28"
          >
            <div className="mx-auto mt-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 100"
                fill="blue"
              >
                <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
              </svg>
              <h1 className="text-xl text-center text-blue-500 font-bold">
                Features
              </h1>
              <h1 className="text-5xl font-bold decoration-blue-500 underline underline-offset-8">
                Why BlogInk?
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 mt-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 rounded-2xl hover:bg-blue-500/15 transition-colors duration-200 hover:scale-105"
                >
                  <div className="flex flex-col space-y-5">
                    <span className="text-blue-500">{feature.icon}</span>
                    <h2 className="text-2xl font-semibold">{feature.title}</h2>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              delay: 0.6,
              type: "spring",
            }}
            className="max-w-7xl mx-auto flex flex-col"
          >
            <div className="mx-auto">
              <h1 className="text-xl text-center text-blue-500 font-bold">
                Across the internet
              </h1>
              <h1 className="text-center text-5xl font-bold decoration-blue-500 underline underline-offset-8">
                Reviews
              </h1>
            </div>
          </motion.div>

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
        <div className="relative">
          <LandingFooter />
        </div>
      </div>
    </div>
  );
};
