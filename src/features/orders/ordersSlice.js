import { createSlice } from '@reduxjs/toolkit'

const loadOrdersFromLocalStorage = () => {
  try {
    const orders = localStorage.getItem('orders')
    if (!orders) return []
    const parsed = JSON.parse(orders)
    // הסרת כפילויות לפי _id
    const seen = new Set()
    return parsed.filter(o => {
      if (seen.has(o._id)) return false
      seen.add(o._id)
      return true
    })
  } catch (error) {
    return []
  }
}

const saveOrdersToLocalStorage = (orders) => {
  try {
    localStorage.setItem('orders', JSON.stringify(orders))
  } catch (error) {
    console.error('Error saving orders to localStorage:', error)
  }
}

// מיפוי סטטוס שרת לתצוגה
const SERVER_STATUS_MAP = {
  pending:    { label: 'התקבל', color: 'info',    step: 0, icon: '📦' },
  processing: { label: 'נארז',   color: 'warning', step: 1, icon: '📫' },
  shipped:    { label: 'נשלח',   color: 'primary', step: 2, icon: '🚚' },
  delivered:  { label: 'הגיע',   color: 'success', step: 3, icon: '✅' },
  cancelled:  { label: 'בוטל',   color: 'error',   step: 0, icon: '❌' },
}

// מחשבת סטטוס לפי שדה status מהשרת (אם קיים) או לפי כמה זמן עבר
export const getOrderStatus = (createdAt, serverStatus) => {
  if (serverStatus && SERVER_STATUS_MAP[serverStatus]) {
    return SERVER_STATUS_MAP[serverStatus]
  }
  // fallback לחישוב לפי זמן (להזמנות ישנות ללא סטטוס)
  const elapsed = Date.now() - new Date(createdAt).getTime()
  const minutes = elapsed / (1000 * 60)
  if (minutes < 3)  return { label: 'התקבל', color: 'info',    step: 0, icon: '📦' }
  if (minutes < 8)  return { label: 'נארז',   color: 'warning', step: 1, icon: '📫' }
  if (minutes < 20) return { label: 'נשלח',   color: 'primary', step: 2, icon: '🚚' }
  return              { label: 'הגיע',   color: 'success', step: 3, icon: '✅' }
}

const initialState = {
  orders: loadOrdersFromLocalStorage(),
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const exists = state.orders.some(o => o._id === action.payload._id)
      if (!exists) {
        state.orders.unshift(action.payload) // הכי חדש ראשון
        saveOrdersToLocalStorage(state.orders)
      }
    },
    // מחליף את כל ההזמנות של משתמש מסוים בנתוני השרת (מונע כפילויות)
    mergeUserOrders: (state, action) => {
      const { userId, serverOrders } = action.payload
      // שומר הזמנות של משתמשים אחרים + מוסיף הזמנות השרת של המשתמש הזה
      const otherUsersOrders = state.orders.filter(o => o.userId !== userId)
      const merged = [...serverOrders, ...otherUsersOrders]
      state.orders = merged
      saveOrdersToLocalStorage(merged)
    },
    clearOrders: (state) => {
      state.orders = []
      saveOrdersToLocalStorage([])
    },
  },
})

export const { addOrder, mergeUserOrders, clearOrders } = ordersSlice.actions
export default ordersSlice.reducer
