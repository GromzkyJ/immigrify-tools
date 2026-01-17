// Password Reset Utility - Handles password reset tokens and validation

export const generateResetToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const saveResetToken = (token, email) => {
  const tokenData = {
    token,
    email,
    expiresAt: Date.now() + 3600000, // 1 hour
    createdAt: Date.now()
  };
  localStorage.setItem('passwordResetToken', JSON.stringify(tokenData));
};

export const getResetToken = () => {
  try {
    const tokenData = localStorage.getItem('passwordResetToken');
    if (!tokenData) return null;
    
    const parsed = JSON.parse(tokenData);
    
    // Check if token expired
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem('passwordResetToken');
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error('Error getting reset token:', error);
    return null;
  }
};

export const validateResetToken = (token, email) => {
  const tokenData = getResetToken();
  
  if (!tokenData) {
    return { valid: false, message: 'Reset token not found or expired' };
  }
  
  if (tokenData.token !== token) {
    return { valid: false, message: 'Invalid reset token' };
  }
  
  if (tokenData.email !== email) {
    return { valid: false, message: 'Email does not match reset token' };
  }
  
  if (Date.now() > tokenData.expiresAt) {
    localStorage.removeItem('passwordResetToken');
    return { valid: false, message: 'Reset token has expired' };
  }
  
  return { valid: true };
};

export const clearResetToken = () => {
  localStorage.removeItem('passwordResetToken');
};

export const getResetLink = (token) => {
  const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
  return `${baseUrl}/admin/reset?token=${token}`;
};
