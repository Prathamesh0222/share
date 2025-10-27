import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!isMounted) {
    return (
      <Button
        variant={"ghost"}
        className="cursor-pointer rounded-full w-10 h-10"
        disabled
      >
        <div className="size-4" />
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
