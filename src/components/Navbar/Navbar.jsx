import React from 'react'
import avatar from '/assets/modi.png'
import './navbar.css'
import {AiFillHome} from 'react-icons/ai'
import {MdAddTask} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="navbar">
        <div className="logo">
            <img src={avatar} alt="img"/>
        </div>
        <div className="nav">
                <Link to = '/home'><a><IconContext.Provider value={{ className: 'react-icons' }}><AiFillHome/></IconContext.Provider> Home</a> </Link>    
                <Link to = '/task'><a><IconContext.Provider value={{ className: 'react-icons' }}><MdAddTask/></IconContext.Provider>  Tasks</a></Link>
                <Link to ='/logout'><a><IconContext.Provider value={{ className: 'react-icons' }}><FiLogOut/></IconContext.Provider>Logout</a></Link>   
        </div>
    </div>
  )
}

export default Navbar