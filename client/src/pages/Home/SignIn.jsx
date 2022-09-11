import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn({ setSignIn }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCred) => {
        navigate("/app"); //go to dashboard after sign in
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form
        className="flex w-3/4 flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <input
          className="input w-4/5"
          type="email"
          placeholder="email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input w-4/5"
          type="password"
          placeholder="password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input type="submit" value="Sign In" className="submit w-1/2" />
      </form>

      <p className="text-sm pt-5">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer px-1 py-1 dark:hover:bg-blue-900 hover:bg-blue-300 hover:text-black rounded dark:hover:text-white"
          onClick={() => setSignIn(false)}
        >
          {" "}
          Sign Up
        </span>
      </p>
    </>
  );
}
