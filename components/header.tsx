"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import { ModeToggle } from "./mode-toggle";
import { AlphaLogo } from "./alpha-logo";
import { motion } from "motion/react";

export const Header = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 border-b md:border-x border-dotted border-black/20 dark:border-white/10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex h-16 items-center justify-between"
        >
          <Link href="/" className="flex items-center gap-1">
            <AlphaLogo />
            <span
              className={`text-lg font-semibold dark:text-white text-black transition-colors italic`}
            >
              Typen
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {data?.user ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => router.push("/discover")}
                  className="font-semibold"
                >
                  Discover
                </Button>
                <Button
                  onClick={() => router.push("/publish")}
                  className="font-semibold"
                >
                  Write
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/discover")}
                  className="font-medium"
                >
                  Explore
                </Button>
                <Button
                  onClick={() => router.push("/signin")}
                  className="font-semibold"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </header>
  );
};
