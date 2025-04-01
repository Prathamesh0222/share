"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TypescriptSample from "@/assets/samples/typescript_sample.png";
import BunSample2 from "@/assets/samples/bun_sample2.png";
import socialSample from "@/assets/samples/social_sample.png";
import ClaudeSample from "@/assets/samples/Claude_AI.png";
import AISample from "@/assets/samples/AI.png";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

export const data = [
  {
    id: "ai",
    title:
      "Microsoft's TypeScript Compiler Rewritten in Go: A Leap Towards 10x Performance",
    description:
      "In a groundbreaking move, Microsoft has announced the complete rewrite of the TypeScript compiler and its tooling using the Go programming language. This decision comes as part of an effort to significantly improve compilation speed, optimize memory usage, and enhance overall developer experience. By leveraging Go’s highly efficient concurrency model and fast execution capabilities, the new TypeScript compiler is expected to achieve up to a tenfold increase in performance compared to its predecessor, which was written in JavaScript.",
    href: "https://ui.shadcn.com",
    image: TypescriptSample,
  },
  {
    id: "bun",
    title: "Bun – The Lightning-Fast JavaScript Runtime for Modern Development",
    description:
      "Bun is a high-performance JavaScript runtime built for speed, efficiency, and ease of use. Developed in Zig, it is designed to be an all-in-one toolkit that significantly improves developer productivity by integrating a runtime, package manager, test runner, and bundler into a single, lightweight system. With a focus on lightning-fast startup times and optimized memory usage, Bun offers a compelling alternative to Node.js and Deno.",
    href: "https://tailwindcss.com",
    image: BunSample2,
  },
  {
    id: "shadcn",
    title: "Mastering ShadCN: A Comprehensive Guide to Modern UI Components",
    description:
      "ShadCN is a modern, highly customizable UI component library that enhances the developer experience by combining the flexibility of Tailwind CSS with the accessibility and robustness of Radix UI. Unlike traditional UI libraries that impose predefined styles and rigid structures, ShadCN empowers developers by allowing them to import only the components they need while maintaining full control over design, functionality, and customization.",
    href: "https://astro.build",
    image: socialSample,
  },
  {
    id: "claude",
    title:
      "Claude 3.7 Sonnet: The Next Evolution in AI Reasoning and Multimodal Intelligence",
    description:
      "Claude 3.7 Sonnet is the latest breakthrough in AI development, pushing the boundaries of reasoning, multimodal understanding, and user-controlled AI interactions. With a significant leap in both performance and adaptability, this model introduces hybrid reasoning, allowing users to fine-tune the AI’s thought process depending on the complexity of the task.",
    href: "https://react.dev",
    image: ClaudeSample,
  },
  {
    id: "ai",
    title: "The Rise of AI in Web Development: How It's Changing the Industry",
    description:
      "In recent years, Artificial Intelligence (AI) has significantly impacted the web development industry, transforming how websites are designed, built, and maintained. From automated code generation to intelligent design tools, AI is reshaping the traditional development workflow, making it more efficient and accessible to a broader audience.",
    href: "https://nextjs.org",
    image: AISample,
  },
];

const Gallery4 = ({ items = data }: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="relative flex justify-center w-full mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-30 rounded-3xl -z-10"></div>
            <div className="text-center space-y-3 mb-2">
              <span className="inline-block px-4 py-1.5 bg-white text-black font-medium rounded-full text-sm">
                {items.length} Featured Articles
              </span>
              <h2 className="text-4xl md:text-5xl font-bold ">
                <span>Latest Tech Insights</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                Dive into the latest tech trends and updates.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full container">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] lg:max-w-[400px]"
              >
                <a href={item.href} className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-0 bottom-0 flex flex-col justify-end items-start p-6 text-primary bg-black/70 md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm">
                        Read more{" "}
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              carouselApi?.scrollPrev();
            }}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              carouselApi?.scrollNext();
            }}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
