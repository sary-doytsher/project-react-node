import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload._id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload)
    },
    decreaseStock: (state, action) => {
      // action.payload = [{ _id, quantity }, ...]
      action.payload.forEach(({ _id, quantity }) => {
        const product = state.products.find(p => p._id === _id)
        if (product) {
          product.stock = Math.max(0, product.stock - quantity)
        }
      })
    },
  },
})

export const { setProducts, setLoading, setError, addProduct, updateProduct, deleteProduct, decreaseStock } = productsSlice.actions
export default productsSlice.reducer
