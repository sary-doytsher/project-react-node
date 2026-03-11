import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { productService } from '../api/productService'
import { updateProduct } from '../features/products/productsSlice'

const availableImages = [
  'pic1.jpg',
  'pic2.jpg',
  'pic3.jpg',
  'pic4.jpg',
  'pic5.jpg',
  'laptop.jpg',
  'phone.jpg',
  'tablet.jpg',
  'headphones.jpg',
  'camera.jpg',
]

const EditProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user)
  const { products } = useSelector(state => state.products)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // בדיקה אם המשתמש הוא מנהל
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error">אין לך הרשאה לגשת לעמוד זה</Alert>
      </Container>
    )
  }

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // חיפוש המוצר ב-Redux
        let product = products.find(p => p._id === id)
        
        // אם לא נמצא, נסה לטעון מהשרת
        if (!product) {
          product = await productService.getProductById(id)
        }
        
        if (product) {
          reset({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: product.image,
            category: product.category || '',
          })
        }
        setLoading(false)
      } catch (err) {
        setError('שגיאה בטעינת המוצר')
        setLoading(false)
      }
    }

    loadProduct()
  }, [id, products, reset])

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')
    try {
      const updatedProduct = await productService.updateProduct(id, {
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
      })
      dispatch(updateProduct(updatedProduct))
      setSuccess('המוצר עודכן בהצלחה!')
      setTimeout(() => {
        navigate('/products')
      }, 1500)
    } catch (err) {
      setError(err.message || 'שגיאה בעדכון המוצר')
    }
  }

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Edit sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1">
            עריכת מוצר
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="שם המוצר"
            margin="normal"
            {...register('name', {
              required: 'שדה חובה',
              minLength: {
                value: 2,
                message: 'שם המוצר חייב להכיל לפחות 2 תווים',
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            fullWidth
            label="תיאור"
            margin="normal"
            multiline
            rows={3}
            {...register('description', {
              required: 'שדה חובה',
              minLength: {
                value: 10,
                message: 'התיאור חייב להכיל לפחות 10 תווים',
              },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <TextField
            fullWidth
            label="מחיר"
            type="number"
            margin="normal"
            inputProps={{ step: '0.01', min: '0' }}
            {...register('price', {
              required: 'שדה חובה',
              min: {
                value: 0,
                message: 'המחיר חייב להיות חיובי',
              },
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <TextField
            fullWidth
            label="מלאי"
            type="number"
            margin="normal"
            inputProps={{ min: '0' }}
            {...register('stock', {
              required: 'שדה חובה',
              min: {
                value: 0,
                message: 'המלאי חייב להיות חיובי',
              },
            })}
            error={!!errors.stock}
            helperText={errors.stock?.message}
          />

          <TextField
            fullWidth
            select
            label="תמונה"
            margin="normal"
            {...register('image', {
              required: 'שדה חובה',
            })}
            error={!!errors.image}
            helperText={errors.image?.message || 'בחר תמונה מהרשימה'}
          >
            {availableImages.map((image) => (
              <MenuItem key={image} value={image}>
                {image}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="קטגוריה"
            margin="normal"
            {...register('category', {
              required: 'שדה חובה',
            })}
            error={!!errors.category}
            helperText={errors.category?.message}
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button type="submit" fullWidth variant="contained" size="large">
              שמור שינויים
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => navigate('/products')}
            >
              ביטול
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default EditProduct
