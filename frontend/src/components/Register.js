// frontend/src/components/Register.js
import React, { useState } from 'react';
import { api } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css'
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/users/register', { name, email, password });
            alert('Registration successful');
            // Redirect to login page
            navigate('/login');
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister} className="register-form">
        <h2 className="form-title">Register</h2>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
        />
        <button type="submit" className="submit-btn">Register</button>
        <p className="login-prompt">
            Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </p>
    </form>
    );
};

export default Register;
