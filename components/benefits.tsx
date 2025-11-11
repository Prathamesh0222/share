"use client";

import { instrumentSerif } from "@/lib/font";
import { BenefitItem } from "./benefit-item";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { motion } from "motion/react";

export const Benefits = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc = theme === "dark" ? "/slug_dark.png" : "/slug_light.png";

  return (
    <section className="relative border-t md:border-x border-dotted border-black/20 dark:border-white/10 bg-muted/30 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="gap-16 items-center md:p-24 p-8 py-12">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold tracking-tight ${instrumentSerif.className}`}
            >
              Built for writers,
              <br />
              designed for readers
            </h2>
            <p className="text-sm text-muted-foreground">
              Experience a platform that understands what writers and readers
              need.
              <br /> Clean, fast, and focused on what matters most.
            </p>
            <div className="space-y-4 pt-4">
              <BenefitItem
                title="Lightning Fast"
                description="Write and publish without friction. Our editor is fast, responsive, and gets out of your way."
              />
              <BenefitItem
                title="Clean Interface"
                description="A distraction-free reading and writing experience. Focus on your content, not the interface."
              />
              <BenefitItem
                title="Community Driven"
                description="Connect with like-minded writers and readers. Build your audience and discover amazing content."
              />
              <BenefitItem
                title="Secure & Private"
                description="Your content is yours. We use industry-standard security to protect your data and privacy."
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
          className="w-full hidden md:block overflow-hidden absolute inset-x-0 translate-x-[45%] p-20 z-20"
        >
          {!mounted ? (
            <Skeleton className="w-[65%] aspect-video rounded-2xl" />
          ) : (
            <Image
              src={imageSrc}
              alt="Benefits"
              width={1920}
              height={1080}
              className="object-cover w-[65%] rounded-2xl border border-border/50 mask-b-from-70% mask-b-to-90% mask-r-from-70% mask-r-to-90%"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};
