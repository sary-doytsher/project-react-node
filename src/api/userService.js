import axios from 'axios'

// עדכן את ה-URL לפי השרת שלך
const API_URL = 'http://localhost:3000/api/users'

export const userService = {
  // הרשמה
  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // התחברות
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // קבלת פרטי משתמש
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // עדכון פרטי משתמש
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}
