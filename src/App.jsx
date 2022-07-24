import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from './components/Auth_pages/Signin'
import Signup from './components/Auth_pages/Signup'
import Logout from './components/Auth_pages/Logout';
import Home from './components/Home/Home';
import Task from './components/Task/Task';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/task" element={<Task />} />
        </Routes>
    </Router>
    </div>
  )
}

export default App
