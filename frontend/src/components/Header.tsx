import { SquarePen } from "lucide-react";
import { Avatar } from "./Avatar";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  return (
    <div>
      <div className="p-4 border-b-2 dark:border-b shadow-xl dark:bg-[#00091D] bg-white flex">
        <div className="mx-8">
          <ModeToggle />
        </div>
        <div className="flex items-center justify-end w-full gap-6 mx-8">
          <span className="flex items-center gap-2 cursor-pointer">
            <SquarePen size={17} />
            Write
          </span>
          <Avatar />
        </div>
      </div>
    </div>
  );
};
