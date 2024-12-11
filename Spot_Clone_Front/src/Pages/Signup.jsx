import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Signup failed');
      }

      const result = await response.json();
      console.log('Signup Response:', result);
      localStorage.setItem('user', JSON.stringify(result));
      window.dispatchEvent(new Event('storage'));

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Signup Error:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-submit-btn">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
