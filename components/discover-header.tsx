"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut, SquarePen, TypeOutline, User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { signOut, useSession } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export const DiscoverHeader = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <header className="flex justify-between p-4 max-w-7xl mx-auto">
      <TypeOutline
        onClick={() => router.push("/discover")}
        className="text-green-500 size-7 cursor-pointer hover:scale-110 duration-300 transition-all"
      />
      <div className="flex gap-4 items-center">
        <ModeToggle />
        {data?.user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className=" ">
                  {data.user.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={data.user.image}
                        alt={data.user.name}
                        className="object-cover"
                        width={40}
                        height={40}
                      />
                    </div>
                  ) : data.user.email ? (
                    <div className="flex items-center justify-center w-10 h-10 relative  rounded-full overflow-hidden bg-green-500 text-green-200 font-bold text-lg">
                      {data.user.email.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    "?"
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="font-semibold">
                  {data.user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/publish");
                  }}
                >
                  <SquarePen className="focus:text-green-500" />
                  Write
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (data.user?.id) {
                      router.push(`/profile/${data.user.id}`);
                    }
                  }}
                >
                  <User className="focus:text-green-500" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                  }}
                >
                  <LogOut className="focus:text-green-500" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button
            className="rounded-xl font-semibold cursor-pointer"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Get Started
          </Button>
        )}
      </div>
    </header>
  );
};
