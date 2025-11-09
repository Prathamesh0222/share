"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant={"ghost"}
        className="cursor-pointer rounded-full w-10 h-10"
        onClick={() => updateTheme()}
      >
        <Moon className="size-4 hover:text-green-500 text-green-500" />
      </Button>
    );
  }

  return (
    <Button
      variant={"ghost"}
      className="cursor-pointer rounded-full w-10 h-10"
      onClick={() => updateTheme()}
    >
      {theme === "dark" ? (
        <Sun className="size-4 hover:text-green-500 text-green-500" />
      ) : (
        <Moon className="size-4 hover:text-green-500 text-green-500" />
      )}
    </Button>
  );
};
