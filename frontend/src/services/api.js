/**
 * API Service for Medicore HMIS Frontend
 * Base URL: http://localhost:8000/api/
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function for handling API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  return response.json();
};

// Helper function for GET requests
const get = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

// Helper function for POST requests
const post = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// ============================================
// PACKAGES API
// ============================================

/**
 * Get all active packages
 * @returns {Promise<Array>} List of packages
 */
export const getPackages = async () => {
  return get('/packages/');
};

/**
 * Get a single package by slug
 * @param {string} slug - Package slug
 * @returns {Promise<Object>} Package details
 */
export const getPackageBySlug = async (slug) => {
  return get(`/packages/${slug}/`);
};

// ============================================
// TEAM API
// ============================================

/**
 * Get all active team members
 * @returns {Promise<Array>} List of team members
 */
export const getTeamMembers = async () => {
  return get('/team/');
};

// ============================================
// SERVICES API
// ============================================

/**
 * Get all active services
 * @returns {Promise<Array>} List of services
 */
export const getServices = async () => {
  return get('/services/');
};

/**
 * Get a single service by slug
 * @param {string} slug - Service slug
 * @returns {Promise<Object>} Service details
 */
export const getServiceBySlug = async (slug) => {
  return get(`/services/${slug}/`);
};

// ============================================
// CONTACT API
// ============================================

/**
 * Submit a contact message
 * @param {Object} data - Contact form data
 * @param {string} data.name - Sender's name
 * @param {string} data.email - Sender's email
 * @param {string} data.subject - Message subject
 * @param {string} data.message - Message content
 * @returns {Promise<Object>} Response with success message
 */
export const submitContactMessage = async (data) => {
  return post('/contact/', data);
};

// ============================================
// APPOINTMENT / BOOK DEMO API
// ============================================

/**
 * Submit a demo appointment request
 * @param {Object} data - Appointment form data
 * @param {string} data.name - Full name
 * @param {string} data.email - Email address
 * @param {string} data.phone - Phone number
 * @param {string} data.facility_name - Facility name
 * @param {string} data.facility_type - Type of facility
 * @param {number} data.bed_capacity - Number of beds
 * @param {string} data.preferred_date - Preferred demo date
 * @param {string} data.interested_package - Package interested in
 * @param {string} data.message - Additional notes
 * @returns {Promise<Object>} Response with success message
 */
export const createAppointment = async (data) => {
  return post('/appointments/', data);
};

// ============================================
// FAQ API
// ============================================

/**
 * Get all active FAQs
 * @returns {Promise<Array>} List of FAQs
 */
export const getFAQs = async () => {
  return get('/faqs/');
};

// ============================================
// SITE SETTINGS API
// ============================================

/**
 * Get all site settings as a key-value object
 * @returns {Promise<Object>} Site settings
 */
export const getSiteSettings = async () => {
  return get('/settings/');
};

/**
 * Get a specific site setting by key
 * @param {string} key - Setting key
 * @returns {Promise<Object>} Setting value
 */
export const getSiteSetting = async (key) => {
  return get(`/settings/${key}/`);
};

// ============================================
// ADMIN API (for content management)
// ============================================

/**
 * Get all packages (admin only)
 * @returns {Promise<Array>} List of all packages
 */
export const adminGetPackages = async () => {
  return get('/admin/packages/');
};

/**
 * Create a new package (admin only)
 * @param {Object} data - Package data
 * @returns {Promise<Object>} Created package
 */
export const adminCreatePackage = async (data) => {
  return post('/admin/packages/', data);
};

/**
 * Update a package (admin only)
 * @param {string} slug - Package slug
 * @param {Object} data - Package data
 * @returns {Promise<Object>} Updated package
 */
export const adminUpdatePackage = async (slug, data) => {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${slug}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

/**
 * Delete a package (admin only)
 * @param {string} slug - Package slug
 * @returns {Promise<Object>} Deletion confirmation
 */
export const adminDeletePackage = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/admin/packages/${slug}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status}`);
  }
  return { message: 'Package deleted successfully' };
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format currency in KES
 * @param {string|number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
  if (isNaN(num)) return amount;
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

/**
 * Format date for display
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .filter((part) => part[0] === part[0]?.toUpperCase())
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

/**
 * Slugify a string
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// ============================================
// DEFAULT EXPORT
// ============================================

const api = {
  // Packages
  getPackages,
  getPackageBySlug,
  
  // Team
  getTeamMembers,
  
  // Services
  getServices,
  getServiceBySlug,
  
  // Contact
  submitContactMessage,
  
  // Appointments
  createAppointment,
  
  // FAQs
  getFAQs,
  
  // Site Settings
  getSiteSettings,
  getSiteSetting,
  
  // Admin
  adminGetPackages,
  adminCreatePackage,
  adminUpdatePackage,
  adminDeletePackage,
  
  // Utilities
  formatCurrency,
  formatDate,
  getInitials,
  slugify,
};

export default api;