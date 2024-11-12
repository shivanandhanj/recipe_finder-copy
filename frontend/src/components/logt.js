// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css"; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            
            localStorage.setItem('authToken', res.data.token);
            localStorage.setItem('id',res.data._id)
           
            alert('Login successful');
            navigate('/')

        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
        <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="input-field" 
        />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="input-field" 
        />
        <button type="submit" className="submit-btn">Login</button>
        <p className="signup-prompt">
            Don't have an account? <Link to="/register" className="register-link">Register here</Link>
        </p>
    </form>
    );
};

export default Login;
