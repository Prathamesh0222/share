"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { TypeOutline } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export const DiscoverHeader = () => {
  const router = useRouter();
  return (
    <header className="flex justify-between p-4">
      <TypeOutline className="text-green-500 size-7" />
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Button
          className="rounded-xl font-semibold cursor-pointer"
          onClick={() => {
            router.push("/signin");
          }}
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};
