"use client";

import Link from "next/link";
import { instrumentSerif } from "@/lib/font";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { motion } from "motion/react";

export const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc =
    theme === "dark" ? "/landing_sample_dark.png" : "/landing_sample_light.png";

  return (
    <section className="pt-30 pb-20 px-4 md:border-x border-dotted border-black/20 dark:border-white/10 bg-linear-to-b from-green-500/20 dark:from-green-900/15 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="space-y-5"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold tracking-tight ${instrumentSerif.className}`}
          >
            Write, share, and discover
            <br />
            <span className="text-green-600 dark:text-green-500">
              stories that matter
            </span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A modern platform for writers and readers. <br /> Publish your
            thoughts, engage with community, and explore meaningful content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="text-sm rounded-lg font-semibold">
              <Link href="/signin">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-sm rounded-lg font-semibold"
            >
              <Link href="/discover">Explore Stories</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
          className="p-1.5 border rounded-xl mask-b-from-50% mask-b-to-90% bg-background mt-12"
        >
          {!mounted ? (
            <Skeleton className="w-full aspect-video rounded-lg" />
          ) : (
            <Image
              src={imageSrc}
              alt="Hero"
              width={1920}
              height={1080}
              className="rounded-lg border border-border"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};
