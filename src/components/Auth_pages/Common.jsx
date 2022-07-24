import React from "react";
import img from "../../../assets/img.png";
import "./auth.css";

function Common() {
  return (
    <div>
        <div className="outer">
        <h3>Welcome to</h3>
        <button className="btn">SELFIE :)</button>
        <div className="common">  
            <img src={img} alt="img" />
        </div>
        </div>
    </div>
  )
}

export default Common