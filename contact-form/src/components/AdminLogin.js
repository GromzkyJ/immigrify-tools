import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadConfig } from '../utils/configManager';
import './AdminLogin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadConfig().then(config => {
      setConfig(config);
      setIsLoading(false);
      
      // Check if already logged in
      const session = localStorage.getItem('adminSession');
      if (session) {
        navigate('/admin/panel');
      }
      
      // Check if needs setup
      if (!config.isConfigured) {
        navigate('/admin/setup');
      }
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!config) {
      setError('Configuration not loaded');
      return;
    }

    // Check password
    if (password === config.admin.password) {
      // Create session
      const session = {
        loggedIn: true,
        timestamp: Date.now()
      };
      localStorage.setItem('adminSession', JSON.stringify(session));
      navigate('/admin/panel');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isLoading) {
    return <div className="admin-login-loading">Loading...</div>;
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <p className="login-subtitle">Enter your password to access the admin panel</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        <div className="login-footer">
          <a href="/admin/forgot-password" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
