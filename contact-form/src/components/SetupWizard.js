import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadConfig, saveConfig } from '../utils/configManager';
import './SetupWizard.css';

const SetupWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    email: '',
    webhookUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (step === 2) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinish = async () => {
    if (!validateStep()) return;

    setIsSaving(true);

    try {
      const updatedConfig = {
        ...config,
        admin: {
          ...config.admin,
          password: formData.password,
          email: formData.email
        },
        n8n: {
          ...config.n8n,
          webhookUrl: formData.webhookUrl || ''
        },
        isConfigured: true
      };

      const saved = await saveConfig(updatedConfig);
      
      if (saved) {
        alert('Configuration saved successfully! You can now login.');
        navigate('/admin');
      } else {
        alert('Failed to save configuration. Please try again.');
      }
    } catch (error) {
      console.error('Setup error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!config) {
    return <div className="setup-wizard-loading">Loading...</div>;
  }

  return (
    <div className="setup-wizard-container">
      <div className="setup-wizard-box">
        <div className="setup-header">
          <h2>Initial Setup</h2>
          <p className="setup-subtitle">Let's configure your contact form admin panel</p>
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
        </div>

        <div className="setup-content">
          {step === 1 && (
            <div className="setup-step">
              <h3>Set Admin Password</h3>
              <p className="step-description">Create a secure password for accessing the admin panel.</p>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Enter password (min 6 characters)"
                  required
                  autoFocus
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm password"
                  required
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="setup-step">
              <h3>Admin Email</h3>
              <p className="step-description">Enter your email address for password reset functionality.</p>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoFocus
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="setup-step">
              <h3>n8n Webhook (Optional)</h3>
              <p className="step-description">
                Enter your n8n webhook URL to receive form submissions. You can add this later in the admin panel.
              </p>
              
              <div className="form-group">
                <label htmlFor="webhookUrl">n8n Webhook URL</label>
                <input
                  type="url"
                  id="webhookUrl"
                  value={formData.webhookUrl}
                  onChange={(e) => handleChange('webhookUrl', e.target.value)}
                  placeholder="https://your-n8n-instance.com/webhook/..."
                />
                <small>Leave empty if you don't have it yet</small>
              </div>
            </div>
          )}
        </div>

        <div className="setup-actions">
          {step > 1 && (
            <button type="button" className="back-button" onClick={handleBack}>
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" className="next-button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button type="button" className="finish-button" onClick={handleFinish} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Finish Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
