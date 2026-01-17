import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadConfig, saveConfig } from '../utils/configManager';
import { validateResetToken, clearResetToken } from '../utils/passwordReset';
import './ResetPassword.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadConfig().then(config => {
      setConfig(config);
      
      // Validate token
      if (!token) {
        setError('Invalid reset link. No token provided.');
        setIsLoading(false);
        return;
      }

      // Get token data from localStorage
      const tokenData = JSON.parse(localStorage.getItem('passwordResetToken') || 'null');
      
      if (!tokenData) {
        setError('Invalid or expired reset link.');
        setIsLoading(false);
        return;
      }

      const validation = validateResetToken(token, config.admin.email);
      
      if (!validation.valid) {
        setError(validation.message);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    });
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Update password in config
      const updatedConfig = {
        ...config,
        admin: {
          ...config.admin,
          password: newPassword
        }
      };

      const saved = await saveConfig(updatedConfig);
      
      if (saved) {
        // Clear reset token
        clearResetToken();
        
        // Show success and redirect
        alert('Password reset successfully! Please login with your new password.');
        navigate('/admin');
      } else {
        setError('Failed to save new password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Reset password error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-box">
          <div className="loading">Validating reset link...</div>
        </div>
      </div>
    );
  }

  if (!config) {
    return <div className="reset-password-loading">Loading...</div>;
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <p className="reset-password-subtitle">
          Enter your new password below.
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength={6}
              autoFocus
            />
            <small>Must be at least 6 characters</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength={6}
            />
          </div>
          
          <button type="submit" className="submit-button">
            Reset Password
          </button>
        </form>
        
        <div className="reset-password-footer">
          <a href="/admin" className="back-link">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
