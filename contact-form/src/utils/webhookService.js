// Webhook Service - Handles n8n webhook integration

import { loadConfig } from './configManager';

export const submitForm = async (formData) => {
  try {
    const config = await loadConfig();
    
    if (!config.n8n.webhookUrl) {
      throw new Error('n8n webhook URL is not configured');
    }

    const payload = {
      type: 'form_submission',
      timestamp: new Date().toISOString(),
      data: formData,
      source: 'immigrify-contact-form'
    };

    const response = await fetch(config.n8n.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: 'Form submitted successfully'
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit form'
    };
  }
};

export const sendPasswordResetEmail = async (email, resetToken, resetLink) => {
  try {
    const config = await loadConfig();
    
    if (!config.n8n.webhookUrl) {
      throw new Error('n8n webhook URL is not configured');
    }

    const payload = {
      type: 'password_reset',
      email: email,
      resetToken: resetToken,
      resetLink: resetLink,
      expiresAt: new Date(Date.now() + config.admin.resetTokenExpiry).toISOString(),
      timestamp: new Date().toISOString()
    };

    const response = await fetch(config.n8n.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: 'Password reset email sent successfully'
    };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return {
      success: false,
      message: error.message || 'Failed to send password reset email'
    };
  }
};

export const testWebhook = async (webhookUrl) => {
  try {
    const testPayload = {
      type: 'test',
      timestamp: new Date().toISOString(),
      message: 'This is a test message from contact form'
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    return {
      success: response.ok,
      status: response.status,
      message: response.ok ? 'Webhook connection successful' : 'Webhook connection failed'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to connect to webhook'
    };
  }
};
