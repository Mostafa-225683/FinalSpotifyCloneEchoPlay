import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Login failed');
      }

      const result = await response.json();
      console.log('Login Response:', result);
      localStorage.setItem('user', JSON.stringify(result));
      window.dispatchEvent(new Event('storage'));

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Login Error:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="auth-submit-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
