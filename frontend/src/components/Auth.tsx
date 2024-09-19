import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL, BLOG_URL } from "@/constants/config";
import { toast } from "sonner";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      navigate(BLOG_URL);
    }
  })

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (type === "signup" && (!inputs.name || !inputs.email || !inputs.password)) {
      toast("All fields are required.");
      return;
    } else if (type === "signin" && (!inputs.email || !inputs.password)) {
      toast("Email and password are required.");
      return;
    }
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        inputs
      );
      const jwt = res.data;
      localStorage.setItem("token",JSON.stringify(jwt));
      navigate(BLOG_URL);
      toast("Logged in successfully");
    } catch (error) {
      console.error(error);
      toast("Invalid input. Please check your details and try again.");
    }
  };

  return (
    <div>
      <div className="absolute z-10 right-4 top-5">
        <ModeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      >
        <div className="relative flex flex-col justify-center h-screen">
          <div className="flex justify-center">
            <div className="dark:bg-[#00091D] bg-white w-[50vh] items-center pb-7 pt-10 px-8 h-max text-center shadow-lg border rounded-xl">
              <span className="flex justify-center mb-8 text-4xl font-semibold">
                {type === "signin" ? "Login" : "Register"}
              </span>
              <div>
                {type === "signup" ?
                <div>
                <span className="flex justify-start py-2 font-semibold">Username</span>
                <Input
                  placeholder="John Doe"
                  type="text"
                  className="mb-4 font-semibold"
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
                </div>
                 : null}
                <span className="flex justify-start py-2 font-semibold">Email</span>
                <Input
                  placeholder="name@example.com"
                  type="email"
                  className="mb-4 font-semibold"
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                />
                <span className="flex justify-start py-2 font-semibold">Password</span>
                <Input
                  placeholder="********"
                  type={showPassword ? 'text' : 'password'}
                  className="mb-4 font-semibold"
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
                <button
                  className="relative px-4 left-48 text-gray-600 bottom-[2.85rem]"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.68 1.664-1.196 2.388m-2.197 2.197A9.956 9.956 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.197-2.197"
                      />
                    </svg>
                  )}
                </button>
                <Button className="w-full mb-2" onClick={handleSubmit}>
                  {type === "signin" ? "Sign in" : "Sign up"}
                </Button>
              </div>
              <div className="font-semibold">
                <span className="flex justify-center mt-2">
                  {type === "signin"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <Link
                    className="underline"
                    to={type === "signin" ? "/signup" : "/signin"}
                  >
                    {type === "signin" ? "Sign up" : "Sign in"}
                  </Link>
                  
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
