import { useDarkMode } from "../utils/useDarkMode";
import { Outlet } from "react-router-dom";

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

function Layout({ children }) {
  const [isDark, setIsDark] = useDarkMode();
  return (
    <main className="relative w-screen min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <nav className="flex w-screen p-2 justify-between absolute z-50 top-0">
        <h2 className="font-bold tracking-wider px-2 head text-3xl">selfie</h2>
        <div
          className="hover:bg-gray-200 dark:hover:bg-gray-800 w-fit h-fit p-2 rounded cursor-pointer"
          onClick={() => setIsDark(isDark === true ? false : true)}
        >
          {isDark === true ? <SunIcon /> : <MoonIcon />}
        </div>
      </nav>
      <Outlet />
    </main>
  );
}

export default Layout;
