"use client";

import Link from "next/link";
import { instrumentSerif } from "@/lib/font";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc =
    theme === "dark" ? "/landing_sample_dark.png" : "/landing_sample_light.png";

  return (
    <section className="pt-30 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-4">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
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
        <div className="p-1.5 border rounded-xl mask-b-from-50% mask-b-to-90% bg-background mt-12">
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
        </div>
      </div>
    </section>
  );
};
