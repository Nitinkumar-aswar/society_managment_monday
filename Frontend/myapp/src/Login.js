import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";

import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email,
                password,
            }, {
                withCredentials: true,  // Include credentials to store the session cookie
            });
    
            if (response.status === 200) {
                sessionStorage.setItem('loggedin', true); // Store login state
                navigate('/userdashboard'); // Redirect to user dashboard
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Login failed');
            } else {
                setError('An error occurred while logging in.');
            }
        }
    };
    

    return (
        <div className="login-container">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="email">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
                    <label htmlFor="password">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
        </div>
    );
};

export default Login;
