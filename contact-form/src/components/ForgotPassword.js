import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadConfig } from '../utils/configManager';
import { generateResetToken, saveResetToken, getResetLink } from '../utils/passwordReset';
import { sendPasswordResetEmail } from '../utils/webhookService';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!config) {
      setError('Configuration not loaded');
      return;
    }

    // Check if email matches admin email
    if (email !== config.admin.email) {
      setError('Email address not found');
      return;
    }

    if (!config.n8n.webhookUrl) {
      setError('n8n webhook is not configured. Please configure it in the admin panel first.');
      return;
    }

    setIsLoading(true);

    try {
      // Generate reset token
      const resetToken = generateResetToken();
      saveResetToken(resetToken, email);
      
      // Generate reset link
      const resetLink = getResetLink(resetToken);
      
      // Send email via n8n
      const result = await sendPasswordResetEmail(email, resetToken, resetLink);
      
      if (result.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(result.message || 'Failed to send reset email');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!config) {
    return <div className="forgot-password-loading">Loading...</div>;
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password?</h2>
        <p className="forgot-password-subtitle">
          Enter your admin email address and we'll send you a password reset link.
        </p>
        
        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            Password reset link has been sent to your email. Please check your inbox.
            <br />
            <small>The link will expire in 1 hour.</small>
          </div>
        )}
        
        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your admin email"
                required
                autoFocus
              />
            </div>
            
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        
        <div className="forgot-password-footer">
          <a href="/admin" className="back-link">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
