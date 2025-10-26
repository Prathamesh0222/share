"use client";

import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import { TypeOutline } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const result = await authClient.signIn.magicLink({
        email,
        callbackURL: "/discover",
      });

      console.log("Magic link result:", result);

      if (result.error) {
        setError(result.error.message || "Failed to send magic link");
      } else {
        setMessage("Check your email for the magic link!");
      }
    } catch (err: any) {
      console.error("Magic link error:", err);
      setError(err.message || "Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/discover",
      });
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="w-[480px] p-8 rounded-xl">
          <div className="mb-5">
            <div className="flex justify-center">
              <TypeOutline className="text-green-500 size-7" />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-semibold">Welcome to Typen</h1>
              <p className="text-xs">Please provide your email address</p>
            </div>
          </div>
          <form onSubmit={handleMagicLink} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Email</Label>
              <Input
                className="py-5"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full font-semibold py-5 cursor-pointer"
              disabled={isLoading || !email}
            >
              {isLoading ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>

          <div className="relative my-6">
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
            variant="outline"
            className="w-full font-semibold py-5 items-center cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <GoogleIcon />
            Login with Google
          </Button>

          {message && (
            <div className="mt-4 text-sm text-green-600 dark:text-green-400 text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-4 text-sm text-red-600 dark:text-red-400 text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
