import axios from 'axios'

// עדכן את ה-URL לפי השרת שלך
const API_URL = 'http://localhost:3000/api/products'

export const productService = {
  // קבלת כל המוצרים
  getAllProducts: async () => {
    try {
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // קבלת מוצר לפי ID
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // הוספת מוצר חדש
  addProduct: async (productData) => {
    try {
      const response = await axios.post(API_URL, productData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // עדכון מוצר
  updateProduct: async (id, productData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // מחיקת מוצר
  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}
