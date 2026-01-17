// Configuration Manager - Handles loading and saving configuration

let cachedConfig = null;

export const loadConfig = async () => {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch('/config.json');
    if (!response.ok) {
      throw new Error('Failed to load config');
    }
    const config = await response.json();
    
    // Check for localStorage overrides
    const storedConfig = localStorage.getItem('contactFormConfig');
    if (storedConfig) {
      const parsed = JSON.parse(storedConfig);
      cachedConfig = { ...config, ...parsed };
    } else {
      cachedConfig = config;
    }
    
    return cachedConfig;
  } catch (error) {
    console.error('Error loading config:', error);
    return getDefaultConfig();
  }
};

export const saveConfig = async (config) => {
  try {
    // Save to localStorage for immediate effect
    localStorage.setItem('contactFormConfig', JSON.stringify(config));
    cachedConfig = config;
    return true;
  } catch (error) {
    console.error('Error saving config:', error);
    return false;
  }
};

export const getDefaultConfig = () => {
  return {
    admin: {
      email: "",
      password: "",
      resetTokenExpiry: 3600000
    },
    formSettings: {
      title: "Contact Us",
      description: "Get in touch with us. We'd love to hear from you.",
      submitButtonText: "Send Message"
    },
    fields: [],
    messages: {
      success: "Thank you! We've received your message and will get back to you soon.",
      error: "Something went wrong. Please try again later.",
      validation: {
        required: "This field is required",
        email: "Please enter a valid email address",
        phone: "Please enter a valid phone number"
      }
    },
    n8n: {
      webhookUrl: "",
      enabled: true
    },
    styling: {
      primaryColor: "#007bff",
      fontFamily: "Arial, sans-serif"
    },
    isConfigured: false
  };
};

export const clearConfigCache = () => {
  cachedConfig = null;
};
