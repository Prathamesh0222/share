import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const updateTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
