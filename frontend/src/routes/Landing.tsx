import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion, useInView } from "framer-motion";
import { features } from "@/constants/Features";
import { testimonials } from "@/constants/testimonials";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import desktopBlogInk from "@/assets/desktop_BlogInk.png";
import iPadBlogInk from "@/assets/ipad_BlogInk.png";
import iPhoneBlogInk from "@/assets/iphone_BlogInk.png";
import { data, Gallery4 } from "@/components/gallery4";

export const Landing = () => {
  const featureVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const featuresRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuresRef, { once: true });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col scollbar">
      <LandingNavbar />
      <div className="relative flex-grow">
        <div className="absolute inset-0"></div>
        <div className="relative mt-48 items-center">
          <div className="h-[600px] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                type: "spring",
              }}
              className="text-6xl md:text-7xl text-center tracking-tight"
            >
              <span className="font-bold">Discover</span>{" "}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-blue-500 to-blue-400 text-center">
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
              className="text-center text-xl mt-4 mx-12"
            >
              <p className="font-normal text-white/85">
                Your go-to platform for sharing stories, ideas, and insights
                through beautiful blogs.
              </p>
              <div className="mt-5 gap-2 flex flex-col md:flex-row justify-center items-center max-w-xl mx-auto">
                <Button
                  className="w-full"
                  onClick={() => navigate("/signin")}
                  variant={"outline"}
                >
                  Get Started
                </Button>
                <Button
                  className="w-full"
                  variant={"default"}
                  onClick={() =>
                    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Features
                </Button>
              </div>
            </motion.div>
          </div>

          <ContainerScroll
            titleComponent={
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash your creativity with <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Engaging Content
                </span>
              </h1>
            }
          >
            <img
              src={desktopBlogInk}
              className="hidden lg:block object-cover w-full rounded-xl min-h-full"
              alt="BlogInk Desktop preview"
            />
            <img
              src={iPadBlogInk}
              className="md:block hidden object-cover min-w-full rounded-xl min-h-full"
              alt="BlogInk iPad preview"
            />
            <img
              src={iPhoneBlogInk}
              className="block md:hidden object-cover w-full rounded-xl"
              alt="BlogInk iPhone preview"
            />
          </ContainerScroll>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              type: "spring",
            }}
            variants={featureVariants}
            className="max-w-7xl mx-auto"
          >
            <Gallery4 items={data} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? "visible" : "hidden"}
            variants={featureVariants}
            transition={{
              duration: 1,
              delay: 0.3,
              type: "spring",
            }}
            ref={featuresRef}
            className="min-h-screen max-w-7xl mx-auto flex flex-col mt-28 md:px-4 px-6 lg:px-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-30 rounded-3xl -z-10"></div>
              <div className="text-center space-y-4 mb-16">
                <span className="inline-block px-4 py-1.5 bg-blue-900/30 text-blue-300 font-medium rounded-full text-sm">
                  Features
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                    Why Choose BlogInk?
                  </span>
                </h2>
                <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg">
                  Discover the powerful features that make BlogInk the perfect
                  platform for your content creation journey
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg  flex items-center justify-center mb-5 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <video
                      className="rounded-xl"
                      loop
                      autoPlay
                      muted
                      preload="auto"
                    >
                      <source src={feature.video} type="video/mp4" />
                    </video>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              type: "spring",
            }}
            className=" max-w-7xl mx-auto flex flex-col mt-28 md:px-4 px-6 lg:px-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-30 rounded-3xl -z-10"></div>
              <div className="text-center space-y-4 mb-16">
                <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-medium rounded-full text-sm">
                  Testimonials
                </span>
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Reviews
                </h2>
                <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg">
                  See what our users are saying about their experience with
                  BlogInk across the internet
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 flex justify-center"
            >
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="relative">
          <LandingFooter />
        </div>
      </div>
    </div>
  );
};
