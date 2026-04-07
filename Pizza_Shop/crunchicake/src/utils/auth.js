// Authentication utilities for admin panel

// Authentication constants
export const AUTH_CONFIG = {
  ADMIN_EMAIL: "seharmughal881@gmail.com",
  ADMIN_PASSWORD: "1234",
  TOKEN_KEY: "admin_auth_token",
  USER_KEY: "admin_user_data",
  SESSION_TIMEOUT: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
};

// Generate a simple token (for demo purposes)
const generateToken = () => {
  return (
    Math.random().toString(36).substring(2) +
    Date.now().toString(36) +
    Math.random().toString(36).substring(2)
  );
};

// Store authentication data
const setAuthData = (token, userData) => {
  const authData = {
    token,
    userData,
    expiry: Date.now() + AUTH_CONFIG.SESSION_TIMEOUT,
  };
  localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, JSON.stringify(authData));
  localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(userData));
};

// Get authentication data
const getAuthData = () => {
  try {
    const authData = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    return authData ? JSON.parse(authData) : null;
  } catch (error) {
    console.error("Error reading auth data:", error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const authData = getAuthData();

  if (!authData) return false;

  // Check if token has expired
  if (Date.now() > authData.expiry) {
    logout();
    return false;
  }

  return true;
};

// Login function
export const login = (email, password) => {
  // Validate credentials
  if (
    email === AUTH_CONFIG.ADMIN_EMAIL &&
    password === AUTH_CONFIG.ADMIN_PASSWORD
  ) {
    const userData = {
      email: email,
      name: "Administrator",
    };

    const token = generateToken();
    setAuthData(token, userData);

    return {
      success: true,
      message: "Login successful",
      user: userData,
    };
  }

  return {
    success: false,
    message: "Invalid email or password",
  };
};

// Logout function
export const logout = () => {
  // Clear all auth-related data
  localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
  localStorage.removeItem(AUTH_CONFIG.USER_KEY);

  return {
    success: true,
    message: "Logout successful",
  };
};

// Get current user data
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error reading user data:", error);
    return null;
  }
};

// Get session info
export const getSessionInfo = () => {
  const authData = getAuthData();
  const userData = getCurrentUser();

  if (!authData || !userData) {
    return null;
  }

  const now = Date.now();
  const expiresIn = authData.expiry - now;

  return {
    user: userData,
    expiresIn: Math.max(0, expiresIn),
  };
};

// Export auth status for React components
export const useAuth = () => {
  return {
    isAuthenticated: isAuthenticated(),
    user: getCurrentUser(),
    session: getSessionInfo(),
  };
};
