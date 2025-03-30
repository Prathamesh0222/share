import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import {
  BLOG_ID_URL,
  BLOG_URL,
  BOOKMARK_URL,
  HOME_URL,
  PROFILE_URL,
  PUBLISH_URL,
  SIGNIN_URL,
  SIGNUP_URL,
} from "./constants/config";
import { Signup } from "./routes/Signup";
import { Signin } from "./routes/Signin";
import Blog from "./routes/Blog";
import BlogPost from "./routes/BlogPost";
import Publish from "./routes/Publish";
import Profile from "./routes/Profile";
import { Landing } from "./routes/Landing";
import BookmarkedPosts from "./components/BookmarkedPosts";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={HOME_URL} element={<Landing />} />
          <Route path={SIGNUP_URL} element={<Signup />} />
          <Route path={SIGNIN_URL} element={<Signin />} />
          <Route path={BLOG_URL} element={<Blog />} />
          <Route path={BLOG_ID_URL} element={<BlogPost />} />
          <Route path={PUBLISH_URL} element={<Publish />} />
          <Route path={PROFILE_URL} element={<Profile />} />
          <Route path={BOOKMARK_URL} element={<BookmarkedPosts />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
