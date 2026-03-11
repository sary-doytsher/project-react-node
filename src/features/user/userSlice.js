import { createSlice } from '@reduxjs/toolkit'

const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (error) {
    return null
  }
}

const saveUserToLocalStorage = (user) => {
  try {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  } catch (error) {
    console.error('Error saving user to localStorage:', error)
  }
}

const initialState = {
  currentUser: loadUserFromLocalStorage(),
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
      saveUserToLocalStorage(action.payload)
    },
    logout: (state) => {
      state.currentUser = null
      state.error = null
      saveUserToLocalStorage(null)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setUser, logout, setLoading, setError } = userSlice.actions
export default userSlice.reducer
