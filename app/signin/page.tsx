import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { TypeOutline } from "lucide-react";

export default async function () {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="w-[480px] p-8 rounded-xl ">
          <div className="mb-5">
            <div className="flex justify-center">
              <TypeOutline className="text-green-500 size-7" />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-semibold">Welcome to Typen</h1>
              <p className="text-xs">Please provide your email address</p>
            </div>
          </div>
          <div className="space-y-5">
            <Label className="text-sm font-semibold">Email</Label>
            <Input className="py-5" placeholder="Enter your email" />
            <Button className="w-full font-semibold py-5 cursor-pointer">
              Send Magic Link
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              variant={"outline"}
              className="w-full font-semibold py-5 items-center cursor-pointer"
            >
              <GoogleIcon />
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
