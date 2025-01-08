import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookmarkIcon, LogOut, UserPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";

export const Avatar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const Logout = () => {
    console.log("Logout");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const Profile = () => {
    navigate("/profile");
  };

  const Bookmark = () => {
    navigate("/bookmark");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <div className="items-center ">
            {
              <span className="rounded-full w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
                {user?.name ? user.name[0].toUpperCase() : "?"}
              </span>
            }
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={Profile}>
            <UserPen size={18} />
            <span className="pl-1">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={Bookmark}>
            <BookmarkIcon size={18} />
            <span className="pl-1">Bookmark</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={Logout}>
            <LogOut className="ml-1" size={18} />
            <span className="pl-1">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
