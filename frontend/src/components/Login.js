import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import backgroundImage from '../assets/login-bg.jpg';
import { Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Persist login state
    navigate('/rooms');
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.7)',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ width: '300px', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px' }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            style={{ margin: '10px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{ margin: '10px 0', padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Login
          </button>
        </form>
        <p>
          <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;