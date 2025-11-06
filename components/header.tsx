import { TypeOutline } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <TypeOutline className="text-green-500 size-7 cursor-pointer hover:scale-110 duration-300 transition-all" />
      <Button className="font-semibold text-white cursor-pointer hover:scale-105 duration-300 transition-all">
        Get Started
      </Button>
    </header>
  );
};
