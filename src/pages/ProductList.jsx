import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid, Typography, CircularProgress, Alert, Snackbar } from '@mui/material'
import { productService } from '../api/productService'
import { setProducts, setLoading, setError, deleteProduct as deleteProductAction } from '../features/products/productsSlice'
import { mockProducts } from '../mockData'
import Product from '../components/Product'

const ProductList = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(state => state.products)
  const { currentUser } = useSelector(state => state.user)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    dispatch(setLoading(true))
    try {
      const data = await productService.getAllProducts()
      dispatch(setProducts(data))
    } catch (err) {
      console.log('שרת לא זמין, משתמש ב-Mock Data')
      // אם השרת לא זמין, נשתמש במוצרי דוגמה
      dispatch(setProducts(mockProducts))
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את המוצר?')) {
      return
    }

    try {
      await productService.deleteProduct(productId)
      dispatch(deleteProductAction(productId))
      setSnackbar({ open: true, message: 'המוצר נמחק בהצלחה', severity: 'success' })
    } catch (err) {
      setSnackbar({ open: true, message: 'שגיאה במחיקת המוצר', severity: 'error' })
    }
  }

  const handleAddedToCart = () => {
    setSnackbar({ open: true, message: 'המוצר נוסף לסל', severity: 'success' })
  }

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        כל המוצרים
      </Typography>

      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Product
              product={product}
              isAdmin={currentUser?.role === 'admin'}
              onDelete={handleDelete}
              onAddedToCart={handleAddedToCart}
            />
          </Grid>
        ))}
      </Grid>

      {products.length === 0 && (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          אין מוצרים להצגה
        </Typography>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ProductList
