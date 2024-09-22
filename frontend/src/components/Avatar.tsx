import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserPen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Avatar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    console.log("Logout");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const Profile = () => {
    console.log("Profile");
    navigate("/profile");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={Profile}>
            <UserPen size={18} />
            <span className="pl-1">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={Logout}>
            <LogOut size={18} />
            <span className="pl-1">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
