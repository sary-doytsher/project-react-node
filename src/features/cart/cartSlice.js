import { createSlice } from '@reduxjs/toolkit'

const getCartKey = (userId) => userId ? `cart_${userId}` : 'cart_guest'

const loadCartFromLocalStorage = (userId) => {
  try {
    const cart = localStorage.getItem(getCartKey(userId))
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    return []
  }
}

const saveCartToLocalStorage = (cart, userId) => {
  try {
    localStorage.setItem(getCartKey(userId), JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

// קריאת המשתמש הנוכחי מ-localStorage כדי לטעון את הסל הנכון בעת אתחול
const getCurrentUserId = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user)?._id : null
  } catch {
    return null
  }
}

const initialUserId = getCurrentUserId()

const initialState = {
  items: loadCartFromLocalStorage(initialUserId),
  userId: initialUserId,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // טוען את הסל של המשתמש הנכנס (נקרא אחרי login)
    setCartUser: (state, action) => {
      state.userId = action.payload
      state.items = loadCartFromLocalStorage(action.payload)
    },
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item._id === product._id)
      
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1
        }
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      saveCartToLocalStorage(state.items, state.userId)
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload)
      if (item && item.quantity < item.stock) {
        item.quantity += 1
        saveCartToLocalStorage(state.items, state.userId)
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        saveCartToLocalStorage(state.items, state.userId)
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload)
      saveCartToLocalStorage(state.items, state.userId)
    },
    clearCart: (state) => {
      state.items = []
      saveCartToLocalStorage(state.items, state.userId)
    },
    // מקבל מערך של { _id, available } ומעדכן/מסיר פריטים לפי מלאי בפועל
    adjustCartStock: (state, action) => {
      action.payload.forEach(({ _id, available }) => {
        if (available === 0) {
          state.items = state.items.filter(item => item._id !== _id)
        } else {
          const item = state.items.find(item => item._id === _id)
          if (item) {
            item.quantity = available
            item.stock = available // עדכן גם את המלאי כדי שכפתור + ישתמש בערך עדכני
          }
        }
      })
      saveCartToLocalStorage(state.items, state.userId)
    },
  },
})

export const { setCartUser, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, adjustCartStock } = cartSlice.actions
export default cartSlice.reducer
