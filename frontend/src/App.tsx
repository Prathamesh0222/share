import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import {
  BLOG_ID_URL,
  BLOG_URL,
  HOME_URL,
  PUBLISH_URL,
  SIGNIN_URL,
  SIGNUP_URL,
} from "./constants/config";
import { Signup } from "./routes/Signup";
import { Toaster } from "sonner";
import { Signin } from "./routes/Signin";
import Blog from "./routes/Blog";
import { DotBackground } from "./components/dotBackground";
import BlogPost from "./routes/BlogPost";
import Publish from "./routes/Publish";

function App() {
  return (
    <>
      <DotBackground />
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster />
        <div>
          <BrowserRouter>
            <Routes>
              <Route path={HOME_URL} element={<Signup />} />
              <Route path={SIGNUP_URL} element={<Signup />} />
              <Route path={SIGNIN_URL} element={<Signin />} />
              <Route path={BLOG_URL} element={<Blog />} />
              <Route path={BLOG_ID_URL} element={<BlogPost />} />
              <Route path={PUBLISH_URL} element={<Publish />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
