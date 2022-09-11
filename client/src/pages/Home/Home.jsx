import { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { useLottie } from "lottie-react";
import homePage from "../../assets/animations/homePage.json";

export default function Home() {
  const [signIn, setSignIn] = useState(true);
  let navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) navigate("/app");
    else console.log("no user");
  });

  return (
    <Suspense>
      <section className="flex flex-col md:flex-row justify-between">
        <div className="w-full min-h-screen place-items-center hidden md:grid">
          <Animation />
        </div>
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          {signIn ? (
            <SignIn setSignIn={setSignIn} />
          ) : (
            <SignUp setSignIn={setSignIn} />
          )}
        </div>
      </section>
    </Suspense>
  );
}

function Animation() {
  const options = {
    animationData: homePage,
    loop: true,
  };
  const { View } = useLottie(options);
  return <div className="w-3/5">{View}</div>;
}
