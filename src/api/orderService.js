import axios from 'axios'

// עדכן את ה-URL לפי השרת שלך
const API_URL = 'http://localhost:3000/api/orders'

export const orderService = {
  // יצירת הזמנה חדשה
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(API_URL, orderData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // קבלת כל ההזמנות של משתמש
  getUserOrders: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // קבלת הזמנה לפי ID
  getOrderById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}
