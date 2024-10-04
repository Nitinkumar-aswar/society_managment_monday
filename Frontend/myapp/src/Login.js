/*
import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        const formData = { email, password };

        try {
            setLoading(true); // Set loading to true before API call
            const response = await axios.post('http://127.0.0.1:5000/login', formData);
            setError(''); // Clear error if successful
            console.log(response.data.message); // Log success message
            onLoginSuccess(); // Call the onLoginSuccess prop to change the view or update the state
        } catch (error) {
            setLoading(false); // Stop loading after error or success
            if (error.response && error.response.data.message) {
                setError(error.response.data.message); // Set error from the backend
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false); // Always stop loading after request is done
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
        </div>
    );
};

export default Login;
*/






















import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email,
                password,
            });
            // Handle successful login here
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                // Request made and server responded
                setError(error.response.data.message || 'Login failed');
            } else {
                // Something happened in setting up the request
                setError('An error occurred while logging in.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;










