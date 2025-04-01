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
import { data, Gallery4 } from "@/components/gallery4";
import { Bookmark, Pencil, Signature, Tag, User } from "lucide-react";

export const Landing = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const FeaturedPostRef = useRef(null);
  const desktopBlogInk = import.meta.env.VITE_DESKTOP_SCREEN;
  const iPadBlogInk = import.meta.env.VITE_IPAD_SCREEN;
  const iPhoneBlogInk = import.meta.env.VITE_IPHONE_SCREEN;

  const isInView = useInView(featuresRef, { once: false, margin: "-30px 0px" });
  const FeaturedPostInView = useInView(FeaturedPostRef, {});

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col scollbar">
      <LandingNavbar />
      <div className="relative flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            stiffness: 100,
            damping: 10,
            type: "spring",
            ease: "easeOut",
          }}
          className="absolute -z-20 top-20 left-0 w-full md:h-[910px] h-[650px] bg-dot-pattern"
          style={{
            backgroundSize: "20px 20px",
          }}
        ></motion.div>

        <div className="relative mt-48 items-center">
          <div className="md:h-[700px] lg:h-[600px] flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.1,
                type: "spring",
                ease: "easeOut",
              }}
              className="absolute left-[5%] md:left-[10%] lg:left-[17%] top-20 md:top-34 -rotate-12 p-6 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-2xl shadow-green-500/90 hover:shadow-green-500 transition-all duration-300 hover:scale-110 hidden md:block"
            >
              <User
                size={40}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white/90 hover:text-white transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.2,
                type: "spring",
                ease: "easeOut",
              }}
              className="absolute right-[5%] md:right-[15%] lg:right-[20%] top-12 p-6 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 shadow-2xl shadow-red-500/90 hover:shadow-red-500 transition-all duration-300 hover:scale-110 hidden md:block"
            >
              <Pencil
                size={40}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white/90 hover:text-white transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                ease: "easeOut",
              }}
              className="absolute right-[5%] md:right-[15%] lg:right-[23%] md:top-[8%] lg:top-[9%] p-6 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl shadow-yellow-500/90 hover:shadow-yellow-500 transition-all duration-300 hover:scale-110 z-10 hidden md:block"
            >
              <Bookmark
                size={40}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white/90 hover:text-white transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.2,
                type: "spring",
                ease: "easeOut",
              }}
              className="absolute left-[5%] md:left-[10%] lg:left-[20%] lg:top-[9%] md:top-[7.7%] p-6 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl shadow-blue-500/90 hover:shadow-blue-500 transition-all duration-300 hover:scale-110 z-10 hidden md:block"
            >
              <Tag
                size={40}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white/90 hover:text-white transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
            >
              <Signature size={55} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="text-6xl md:text-7xl text-center tracking-tight"
            >
              <span className="font-bold">Discover</span>{" "}
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-blue-500 to-blue-400 text-center">
                BlogInk
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
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
                through
                <span className="italic text-blue-300 font-semibold underline underline-offset-4">
                  {" "}
                  beautiful
                </span>{" "}
                blogs.
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
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                className="text-4xl font-semibold text-black dark:text-white"
              >
                Unleash your creativity with <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Engaging Content
                </span>
              </motion.h1>
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
            ref={FeaturedPostRef}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={
              FeaturedPostInView
                ? { opacity: 1, y: 0, scale: 1 }
                : {
                    opacity: 0,
                    y: -50,
                    scale: 0.9,
                  }
            }
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 10,
              ease: "easeOut",
            }}
            className="max-w-7xl mx-auto"
          >
            <Gallery4 items={data} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: -40, scale: 0.95 }
            }
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 10,
              ease: "easeOut",
            }}
            ref={featuresRef}
            className="min-h-screen max-w-7xl mx-auto flex flex-col mt-28 md:px-4 px-6 lg:px-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-20 rounded-3xl -z-10"></div>
              <div className="text-center space-y-4 mb-16">
                <span className="inline-block px-4 py-1.5 bg-white text-black font-medium rounded-full text-sm">
                  Features
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span>Why Choose BlogInk?</span>
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
                  className="bg-zinc-950 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
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
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                stiffness: 100,
                damping: 10,
                ease: "easeOut",
                type: "spring",
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-20 rounded-3xl -z-10"></div>
              <div className="text-center space-y-4 mb-16">
                <span className="inline-block px-4 py-1.5 bg-white text-black font-medium rounded-full text-sm">
                  Testimonials
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">Reviews</h2>
                <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg">
                  See what our users are saying about their experience with
                  BlogInk across the internet
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                stiffness: 100,
                damping: 10,
                ease: "easeOut",
                type: "spring",
              }}
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
