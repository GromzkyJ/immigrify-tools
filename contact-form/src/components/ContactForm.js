import React, { useState, useEffect } from 'react';
import { loadConfig } from '../utils/configManager';
import { submitForm } from '../utils/webhookService';
import { validateForm } from '../utils/validation';
import './ContactForm.css';

const ContactForm = () => {
  const [config, setConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);

  if (!config) {
    return <div className="contact-form-loading">Loading form...</div>;
  }

  const enabledFields = config.fields.filter(field => field.enabled);

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Validate form
    const validation = validateForm(enabledFields, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitForm(formData);
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: config.messages.success });
        setFormData({});
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitStatus({ type: 'error', message: result.message || config.messages.error });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: config.messages.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const value = formData[field.id] || '';
    const hasError = errors[field.id];

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id} className="form-field">
            <label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <textarea
              id={field.id}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={hasError ? 'error' : ''}
              rows={5}
            />
            {hasError && <span className="error-message">{errors[field.id]}</span>}
          </div>
        );

      default:
        return (
          <div key={field.id} className="form-field">
            <label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type={field.type}
              id={field.id}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={hasError ? 'error' : ''}
            />
            {hasError && <span className="error-message">{errors[field.id]}</span>}
          </div>
        );
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form">
        {config.formSettings.title && (
          <h2 className="form-title">{config.formSettings.title}</h2>
        )}
        {config.formSettings.description && (
          <p className="form-description">{config.formSettings.description}</p>
        )}

        {submitStatus && (
          <div className={`submit-status ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {enabledFields.map(renderField)}
          
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : config.formSettings.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
