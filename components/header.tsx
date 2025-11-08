"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeOutline } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <TypeOutline className="text-green-600 dark:text-green-500 size-5" />
            <span className="text-lg font-semibold">ypen</span>
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {data?.user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/discover")}
                  className="font-medium"
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
        </div>
      </div>
    </header>
  );
};
