import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../utils/useDarkMode";

import {
  SunIcon,
  MoonIcon,
  ExitIcon,
  HomeIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";

import { auth, db } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";

export default function AppLayout() {
  const [user, loading, error] = useAuthState(auth);
  const [fetched, setFetched] = useState(false);
  const [authData, setAuthData] = useState(null);

  const [isDark, setIsDark] = useDarkMode();
  let navigate = useNavigate();

  //prefetching all data's for use in Dashboard,Tasks
  useEffect(() => {
    if (!user) navigate("/");
    else {
      setAuthData(user);
      setFetched(true);
    }
  }, [user, loading]);

  return (
    <main className="flex relative w-screen min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <nav className=" w-1/6 flex flex-col items-center h-screen py-2 justify-between z-50 ">
        <div className="w-1/2 h-1/5 mt-2 rounded text-center flex items-center justify-center bg-gray-200 text-black">
          {authData && (
            <h1>
              hi, <br /> {authData.displayName}
            </h1>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Link
            to="/app"
            className={
              `navLink ` +
              (window.location.pathname === `/app` ||
              window.location.pathname === `/app/dashboard`
                ? `text-red-400`
                : `hover:text-gray-900 dark:hover:text-gray-300`)
            }
          >
            <HomeIcon /> Dashboard
          </Link>
          <Link
            to="tasks"
            className={
              `navLink ` +
              (window.location.pathname === `/app/tasks`
                ? `text-red-400`
                : `hover:text-gray-900 dark:hover:text-gray-300`)
            }
          >
            <Pencil1Icon /> Tasks
          </Link>
          <div
            className="navLink hover:text-gray-900 dark:hover:text-gray-300 cursor-pointer"
            onClick={() => {
              signOut(auth);
            }}
          >
            <ExitIcon /> Logout
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="font-bold tracking-wider px-2 head text-3xl">
            selfie
          </h2>

          <div
            className="hover:bg-gray-200 dark:hover:bg-gray-800 w-fit h-fit p-2 rounded cursor-pointer"
            onClick={() => setIsDark(isDark === true ? false : true)}
          >
            {isDark === true ? <SunIcon /> : <MoonIcon />}
          </div>
        </div>
      </nav>
      <div className="w-5/6 grid place-items-center">
        {fetched && <Outlet context={[authData, setAuthData]} />}
      </div>
    </main>
  );
}
