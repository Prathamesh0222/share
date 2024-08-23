import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import {  SIGNUP_URL } from "./constants/config";
import { Signup } from "./routes/Signup";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div
        className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]
        dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]"
        aria-hidden="true"
      />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster/>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path={SIGNUP_URL} element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
