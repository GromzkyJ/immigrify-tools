// Validation Utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  // Basic phone validation - accepts various formats
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 10;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateField = (field, value) => {
  if (field.required && !validateRequired(value)) {
    return { valid: false, message: 'This field is required' };
  }

  if (!value || value.trim().length === 0) {
    return { valid: true }; // Optional fields can be empty
  }

  switch (field.type) {
    case 'email':
      if (!validateEmail(value)) {
        return { valid: false, message: 'Please enter a valid email address' };
      }
      break;
    case 'tel':
      if (!validatePhone(value)) {
        return { valid: false, message: 'Please enter a valid phone number' };
      }
      break;
    default:
      break;
  }

  return { valid: true };
};

export const validateForm = (fields, formData) => {
  const errors = {};
  let isValid = true;

  fields.forEach(field => {
    if (!field.enabled) return;

    const value = formData[field.id] || '';
    const validation = validateField(field, value);

    if (!validation.valid) {
      errors[field.id] = validation.message;
      isValid = false;
    }
  });

  return { isValid, errors };
};
