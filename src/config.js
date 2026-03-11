// Application Configuration

export const config = {
  // API Configuration
  api: {
    // Change this to your server URL
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },

  // Application
  app: {
    name: 'חנות אונליין',
    version: '1.0.0',
    language: 'he',
  },

  // Features
  features: {
    useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
    enableReduxDevTools: true,
    enableLogging: true,
  },

  // Cart Settings
  cart: {
    saveToLocalStorage: true,
    storageKey: 'cart',
  },

  // User Settings
  user: {
    saveToLocalStorage: true,
    storageKey: 'user',
  },

  // Pagination
  pagination: {
    productsPerPage: 12,
  },

  // Available product images
  availableImages: [
    'pic1.jpg',
    'pic2.jpg',
    'pic3.jpg',
    'pic4.jpg',
    'pic5.jpg',
    'laptop.jpg',
    'phone.jpg',
    'tablet.jpg',
    'headphones.jpg',
    'camera.jpg',
  ],

  // Product categories
  categories: [
    'מחשבים',
    'טלפונים',
    'טאבלטים',
    'אביזרים',
    'מצלמות',
    'מסכים',
    'אחר',
  ],

  // Validation Rules
  validation: {
    passwordMinLength: 6,
    nameMinLength: 2,
    phoneRegex: /^[0-9]{9,10}$/,
    emailRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },

  // Role Settings
  roles: {
    guest: 'guest',
    user: 'user',
    admin: 'admin',
  },
}

export default config
