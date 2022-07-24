import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../Firebase/fireBase";
import "./auth.css"
import Common from './Common'
function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
        // maybe trigger a loading screen
        return;
        }
        if (user) navigate("/home");
    }, [user, loading]);

  return (
    <div>
        <Common />
        <div className='inner2'>
            <div className="con1">
                <h2>Sign in</h2>
            </div>
            <div className="con2">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="button" value="Sign in" onClick={() => signInWithEmailAndPassword(auth, email, password)}/>
                <input type="button" value= "Login with Google"  onClick={signInWithGoogle}/>
            </div>
            <div className="con3">
                <h4>Don't have an account? <Link to= "/signup"><span> Sign up</span></Link></h4>
            </div>
        </div>
    </div>
  )
}

export default Signin