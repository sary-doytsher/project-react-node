import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material'
import { ShoppingCart, Delete, Edit } from '@mui/icons-material'
import { addToCart } from '../features/cart/cartSlice'

const Product = ({ product, isAdmin, onDelete, onAddedToCart }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    if (onAddedToCart) {
      onAddedToCart()
    }
  }

  const handleEdit = () => {
    navigate(`/edit-product/${product._id}`)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(product._id)
    }
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={`/images/${product.image}`}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ₪{product.price}
        </Typography>
        {product.stock !== undefined && (
          <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'}>
            {product.stock > 0 ? `במלאי: ${product.stock}` : 'אזל מהמלאי'}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          הוסף לסל
        </Button>
        {isAdmin && (
          <Box>
            <IconButton color="primary" onClick={handleEdit}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  )
}

export default Product
