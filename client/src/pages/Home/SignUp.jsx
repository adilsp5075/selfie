import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function SignUp({ setSignIn }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCred) => {
        updateProfile(auth.currentUser, {
          displayName: form.name,
        })
          .then(() => {
            navigate("/app"); //go to dashboard after auto-sign in
          })
          .catch((error) => {
            console.log(error);
          });
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
          handleSignUp();
        }}
      >
        <input
          className="input w-4/5"
          type="text"
          placeholder="What should we call you?"
          required
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <input
          className="input w-4/5"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <input
          className="input w-4/5"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <input type="submit" value="Sign Up" className="submit w-1/2" />
      </form>

      <p className="text-sm pt-5">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer px-1 py-1 dark:hover:bg-blue-900 hover:bg-blue-300 hover:text-black rounded dark:hover:text-white"
          onClick={() => setSignIn(true)}
        >
          {" "}
          Sign In
        </span>
      </p>
    </>
  );
}
