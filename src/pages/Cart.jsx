import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
} from '@mui/material'
import { Add, Remove, Delete, ShoppingCartCheckout, ArrowBack } from '@mui/icons-material'
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../features/cart/cartSlice'
import { decreaseStock } from '../features/products/productsSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector(state => state.cart)
  const { currentUser } = useSelector(state => state.user)

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id))
  }

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id))
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    if (!currentUser) {
      alert('יש להתחבר כדי לבצע הזמנה')
      navigate('/login', { state: { from: '/cart' } })
      return
    }

    if (window.confirm('האם אתה בטוח שברצונך לבצע את ההזמנה?')) {
      // הורד מלאי לכל מוצר בסל
      dispatch(decreaseStock(items.map(item => ({ _id: item._id, quantity: item.quantity }))))
      alert('ההזמנה בוצעה בהצלחה!')
      dispatch(clearCart())
      navigate('/products')
    }
  }

  const handleContinueShopping = () => {
    navigate('/products')
  }

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          סל הקניות ריק
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleContinueShopping}
          sx={{ mt: 2 }}
        >
          המשך קניה
        </Button>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        סל הקניות שלי
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>תמונה</TableCell>
              <TableCell>שם המוצר</TableCell>
              <TableCell align="center">מחיר</TableCell>
              <TableCell align="center">כמות</TableCell>
              <TableCell align="center">סה"כ</TableCell>
              <TableCell align="center">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">₪{item.price}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => handleDecrease(item._id)}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => handleIncrease(item._id)}>
                      <Add />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="center">₪{(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => handleRemove(item._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ mt: 3, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">סה"כ פריטים:</Typography>
          <Typography variant="h6">{totalQuantity}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">סה"כ לתשלום:</Typography>
          <Typography variant="h6" color="primary">
            ₪{totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleContinueShopping}
            fullWidth
          >
            המשך קניה
          </Button>
          <Button
            variant="contained"
            startIcon={<ShoppingCartCheckout />}
            onClick={handleCheckout}
            fullWidth
          >
            אישור הזמנה
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Cart
