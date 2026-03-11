# ⚡ מדריך התייחסות מהיר (Cheat Sheet)

## 🚀 התחלה

```bash
# התקנה
npm install

# הפעלה
npm run dev

# בנייה
npm run build

# תצוגה
npm run preview
```

## 📦 Redux Hooks

### useSelector - קרא מ-State
```javascript
const { products, loading } = useSelector(state => state.products)
const { items } = useSelector(state => state.cart)
const { currentUser } = useSelector(state => state.user)
```

### useDispatch - כתוב ל-State
```javascript
const dispatch = useDispatch()

// Products
dispatch(setProducts(data))
dispatch(addProduct(product))
dispatch(updateProduct(product))
dispatch(deleteProduct(id))

// Cart
dispatch(addToCart(product))
dispatch(increaseQuantity(id))
dispatch(decreaseQuantity(id))
dispatch(removeFromCart(id))
dispatch(clearCart())

// User
dispatch(setUser(user))
dispatch(logout())
```

## 🎨 Material UI Components

### נפוצים בפרויקט
```javascript
import {
  AppBar,          // NavBar
  Button,          // כפתורים
  Card,            // כרטיסים
  TextField,       // inputs
  Box,             // container
  Container,       // wrapper
  Grid,            // layout
  IconButton,      // כפתור עם icon
  Badge,           // תגית
  Alert,           // הודעות
  Snackbar,        // notification
  CircularProgress,// loading
  Table,           // טבלה
  MenuItem,        // dropdown
  Dialog,          // חלון
  Paper,           // background
} from '@mui/material'

import { Delete, Edit, Add, Logout } from '@mui/icons-material'
```

## 📝 React Hook Form

```javascript
import { useForm } from 'react-hook-form'

const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

// בטופס:
<input {...register('fieldName', { required: 'Error message' })} />
{errors.fieldName && <span>{errors.fieldName.message}</span>}

// Submit:
<form onSubmit={handleSubmit(onSubmit)}>
```

## 🔄 React Router

```javascript
import { useNavigate, useParams, Link } from 'react-router-dom'

const navigate = useNavigate()
navigate('/path')

const { id } = useParams()

<Link to="/path">Link</Link>
```

## 💾 Local Storage

```javascript
// שמור
localStorage.setItem('key', JSON.stringify(data))

// קרא
const data = JSON.parse(localStorage.getItem('key'))

// מחק
localStorage.removeItem('key')
```

## 🌐 Axios API Calls

```javascript
import axios from 'axios'

// GET
const response = await axios.get(url)

// POST
const response = await axios.post(url, data)

// PUT
const response = await axios.put(url, data)

// DELETE
const response = await axios.delete(url)

// Error Handling
try {
  const data = await axios.get(url)
  // Success
} catch (error) {
  console.error(error.response?.data || error.message)
}
```

## 🎯 Redux Slice Template

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { setData } = mySlice.actions
export default mySlice.reducer
```

## 🔐 בדיקות Common Pattern

```javascript
// Email
pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// Phone
pattern: /^[0-9]{9,10}$/

// Min Length
minLength: { value: 6, message: 'Min 6 chars' }

// Required
required: 'This field is required'
```

## 🎨 CSS Classes

```css
/* Global */
body { direction: rtl; }

/* Flexbox */
.flex { display: flex; }
.flex-center { justify-content: center; align-items: center; }
.flex-between { justify-content: space-between; }

/* Grid */
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

/* Responsive */
@media (max-width: 768px) { }
@media (max-width: 480px) { }
```

## 🐛 Debugging

```javascript
// Redux DevTools - F12 → Redux tab

// Console Logs
console.log('Value:', value)
console.table(array)
console.error('Error:', error)

// React DevTools - F12 → Components tab

// Network Tab - F12 → Network
// בדוק API calls
```

## 📱 Responsive Breakpoints (MUI)

```javascript
sx={{
  fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' },
  display: { xs: 'none', md: 'block' },
  flexDirection: { xs: 'column', sm: 'row' },
}}
```

## 🎭 שימוש ב-State בקומפוננטה

```javascript
function MyComponent() {
  // קרא מ-Redux
  const data = useSelector(state => state.mySlice.data)
  const dispatch = useDispatch()
  
  // Local State
  const [localState, setLocalState] = useState(null)
  
  // Effects
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  
  // Handlers
  const handleClick = () => {
    dispatch(updateData(newData))
  }
  
  // JSX
  return <div>{data}</div>
}
```

## 🚦 Error Handling Pattern

```javascript
try {
  const data = await apiCall()
  dispatch(setSuccess(data))
} catch (error) {
  const errorMessage = error.response?.data?.message || error.message
  dispatch(setError(errorMessage))
  setSnackbar({
    open: true,
    message: errorMessage,
    severity: 'error'
  })
}
```

## 🔗 Common Imports

```javascript
// React
import { useState, useEffect, useCallback } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Router
import { useNavigate, useParams } from 'react-router-dom'

// MUI
import { Box, Button, TextField } from '@mui/material'

// Forms
import { useForm } from 'react-hook-form'

// HTTP
import axios from 'axios'
```

## 💡 טיפים Pro

1. **Redux DevTools** - עקוב אחרי State בזמן אמת
2. **React DevTools** - בדוק Components hierarchy
3. **Network Tab** - בדוק API calls
4. **Lighthouse** - test performance
5. **Mock Data** - עבוד ללא שרת

## 🎯 Flow דוגמה - הוספה לסל

```javascript
// 1. User clicks button
<Button onClick={handleAddToCart}>Add to Cart</Button>

// 2. Handler dispatches Redux action
const handleAddToCart = () => {
  dispatch(addToCart(product))
}

// 3. Redux updates State
cart.items = [...cart.items, product]

// 4. Component re-renders
const { items } = useSelector(state => state.cart)
<Badge badgeContent={items.length}>
  <ShoppingCart />
</Badge>

// 5. LocalStorage auto-saves
localStorage.setItem('cart', JSON.stringify(items))

// 6. On page reload, State restores
useEffect(() => {
  const saved = localStorage.getItem('cart')
  if (saved) dispatch(setCart(JSON.parse(saved)))
}, [])
```

## 📚 Resources

- React Docs: https://react.dev
- Redux Toolkit: https://redux-toolkit.js.org
- MUI: https://mui.com
- React Router: https://reactrouter.com

**זה הכל שאתה צריך! 🚀**
