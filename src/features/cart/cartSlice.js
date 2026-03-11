import { createSlice } from '@reduxjs/toolkit'

const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    return []
  }
}

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

const initialState = {
  items: loadCartFromLocalStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item._id === product._id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      saveCartToLocalStorage(state.items)
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload)
      if (item) {
        item.quantity += 1
        saveCartToLocalStorage(state.items)
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        saveCartToLocalStorage(state.items)
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload)
      saveCartToLocalStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      saveCartToLocalStorage(state.items)
    },
  },
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
