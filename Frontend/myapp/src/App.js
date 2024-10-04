// src/App.js
import React from 'react';
import Home from "./Home.js"; 
import Navbar from "./Navbar.js";
import Login from './Login';
import Register from './Register';
import UserDashboard from './UserDashboard.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
