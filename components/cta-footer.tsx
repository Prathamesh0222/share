"use client";

import { instrumentSerif } from "@/lib/font";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export const CTAFooter = () => {
  return (
    <section className="py-24 px-4 border-t md:border-x border-dotted border-black/20 dark:border-white/10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="max-w-4xl mx-auto text-center space-y-2"
      >
        <h2
          className={`text-3xl md:text-4xl font-bold tracking-tight ${instrumentSerif.className}`}
        >
          Ready to start writing?
        </h2>
        <p className="text-md text-muted-foreground max-w-2xl mx-auto">
          Join our community of writers and readers. <br />
          Start sharing your stories today.
        </p>
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center pt-4">
          <Button asChild className=" rounded-lg font-semibold">
            <Link href="/signin">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground pt-4">
          No credit card required • Free forever • Start writing in seconds
        </p>
      </motion.div>
    </section>
  );
};
