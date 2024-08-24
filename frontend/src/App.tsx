import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import {  BLOG_URL, SIGNIN_URL, SIGNUP_URL } from "./constants/config";
import { Signup } from "./routes/Signup";
import { Toaster } from "sonner";
import { Signin } from "./routes/Signin";
import { Blog } from "./routes/Blog";
import { DotBackground } from "./components/dotBackground";

function App() {
  return (
    <>
    <DotBackground/>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster/>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path={SIGNUP_URL} element={<Signup />} />
              <Route path={SIGNIN_URL} element={<Signin />} />
              <Route path={BLOG_URL} element={<Blog />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
