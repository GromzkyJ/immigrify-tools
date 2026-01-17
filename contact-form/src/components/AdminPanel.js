import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadConfig, saveConfig } from '../utils/configManager';
import { testWebhook } from '../utils/webhookService';
import './AdminPanel.css';

const AdminPanel = () => {
  const [config, setConfig] = useState(null);
  const [activeTab, setActiveTab] = useState('fields');
  const [isSaving, setIsSaving] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState(null);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin');
      return;
    }

    loadConfig().then(setConfig);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const saved = await saveConfig(config);
      if (saved) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings. Please try again.');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!config.n8n.webhookUrl) {
      alert('Please enter a webhook URL first');
      return;
    }

    setIsTestingWebhook(true);
    setWebhookStatus(null);

    try {
      const result = await testWebhook(config.n8n.webhookUrl);
      setWebhookStatus(result);
    } catch (error) {
      setWebhookStatus({
        success: false,
        message: 'Failed to test webhook'
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const toggleFieldEnabled = (fieldId) => {
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, enabled: !field.enabled } : field
      )
    }));
  };

  const updateField = (fieldId, updates) => {
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  const updateFormSettings = (updates) => {
    setConfig(prev => ({
      ...prev,
      formSettings: { ...prev.formSettings, ...updates }
    }));
  };

  const updateMessages = (updates) => {
    setConfig(prev => ({
      ...prev,
      messages: { ...prev.messages, ...updates }
    }));
  };

  const updateN8n = (updates) => {
    setConfig(prev => ({
      ...prev,
      n8n: { ...prev.n8n, ...updates }
    }));
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact-form-config.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        setConfig(imported);
        alert('Configuration imported successfully! Click Save to apply.');
      } catch (error) {
        alert('Invalid configuration file');
      }
    };
    reader.readAsText(file);
  };

  if (!config) {
    return <div className="admin-panel-loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel-container">
      <div className="admin-panel-header">
        <h1>Contact Form Admin Panel</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-panel-content">
        <div className="admin-tabs">
          <button
            className={`tab ${activeTab === 'fields' ? 'active' : ''}`}
            onClick={() => setActiveTab('fields')}
          >
            Form Fields
          </button>
          <button
            className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          <button
            className={`tab ${activeTab === 'n8n' ? 'active' : ''}`}
            onClick={() => setActiveTab('n8n')}
          >
            n8n Integration
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="admin-tab-content">
          {activeTab === 'fields' && (
            <div className="tab-panel">
              <h2>Form Fields</h2>
              <p className="panel-description">Enable or disable form fields, and customize their labels.</p>
              
              <div className="fields-list">
                {config.fields.map(field => (
                  <div key={field.id} className="field-item">
                    <div className="field-header">
                      <label className="field-toggle">
                        <input
                          type="checkbox"
                          checked={field.enabled}
                          onChange={() => toggleFieldEnabled(field.id)}
                        />
                        <span className="field-label">{field.label}</span>
                        {field.required && <span className="required-badge">Required</span>}
                      </label>
                    </div>
                    {field.enabled && (
                      <div className="field-options">
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          placeholder="Field label"
                          className="field-input"
                        />
                        <input
                          type="text"
                          value={field.placeholder || ''}
                          onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                          placeholder="Placeholder text"
                          className="field-input"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="tab-panel">
              <h2>Messages</h2>
              <p className="panel-description">Customize the messages shown to users.</p>
              
              <div className="form-group">
                <label>Success Message</label>
                <textarea
                  value={config.messages.success}
                  onChange={(e) => updateMessages({ success: e.target.value })}
                  rows={3}
                  className="message-input"
                />
              </div>
              
              <div className="form-group">
                <label>Error Message</label>
                <textarea
                  value={config.messages.error}
                  onChange={(e) => updateMessages({ error: e.target.value })}
                  rows={3}
                  className="message-input"
                />
              </div>
            </div>
          )}

          {activeTab === 'n8n' && (
            <div className="tab-panel">
              <h2>n8n Integration</h2>
              <p className="panel-description">Configure your n8n webhook to receive form submissions.</p>
              
              <div className="form-group">
                <label>n8n Webhook URL</label>
                <input
                  type="url"
                  value={config.n8n.webhookUrl}
                  onChange={(e) => updateN8n({ webhookUrl: e.target.value })}
                  placeholder="https://your-n8n-instance.com/webhook/..."
                  className="webhook-input"
                />
                <button
                  type="button"
                  className="test-button"
                  onClick={handleTestWebhook}
                  disabled={isTestingWebhook || !config.n8n.webhookUrl}
                >
                  {isTestingWebhook ? 'Testing...' : 'Test Connection'}
                </button>
              </div>

              {webhookStatus && (
                <div className={`webhook-status ${webhookStatus.success ? 'success' : 'error'}`}>
                  {webhookStatus.message}
                </div>
              )}

              <div className="info-box">
                <h3>Webhook Payload Format</h3>
                <pre>{JSON.stringify({
                  type: 'form_submission',
                  timestamp: '2024-12-XX...',
                  data: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    // ... other form fields
                  },
                  source: 'immigrify-contact-form'
                }, null, 2)}</pre>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-panel">
              <h2>Form Settings</h2>
              <p className="panel-description">Configure general form settings.</p>
              
              <div className="form-group">
                <label>Form Title</label>
                <input
                  type="text"
                  value={config.formSettings.title}
                  onChange={(e) => updateFormSettings({ title: e.target.value })}
                  className="settings-input"
                />
              </div>
              
              <div className="form-group">
                <label>Form Description</label>
                <textarea
                  value={config.formSettings.description}
                  onChange={(e) => updateFormSettings({ description: e.target.value })}
                  rows={3}
                  className="settings-input"
                />
              </div>
              
              <div className="form-group">
                <label>Submit Button Text</label>
                <input
                  type="text"
                  value={config.formSettings.submitButtonText}
                  onChange={(e) => updateFormSettings({ submitButtonText: e.target.value })}
                  className="settings-input"
                />
              </div>

              <div className="settings-actions">
                <h3>Configuration Management</h3>
                <div className="action-buttons">
                  <button type="button" className="export-button" onClick={exportConfig}>
                    Export Config
                  </button>
                  <label className="import-button">
                    Import Config
                    <input
                      type="file"
                      accept=".json"
                      onChange={importConfig}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="admin-panel-footer">
          <button
            type="button"
            className="save-button"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
