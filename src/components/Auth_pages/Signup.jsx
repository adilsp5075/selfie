import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
  } from '../Firebase/fireBase';
import "./auth.css"
import Common from './Common'
function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
      if (!name) alert("Please enter name");
      registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
      if (loading) return;
      if (user) navigate("/home");
    }, [user, loading]);
  return (
    <div>
        <Common />
        <div className='inner2'>
            <div className="con1">
                <h2>Sign up</h2>
            </div>
            <div className="con2">
                <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="button" value="Sign up" onClick={register}/>
                <input type="button" value= "Sign up with Google" onClick={signInWithGoogle} />
            </div>
            <div className="con3">
                <h4>Have an account? <Link to= "/"><span> Sign in</span></Link></h4>
            </div>
        </div>
    </div>
  )
}

export default Signin