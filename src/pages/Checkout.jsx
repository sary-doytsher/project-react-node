import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container, Typography, Box, Button, Paper, Grid, TextField,
  Divider, CircularProgress, Alert,
} from '@mui/material'
import { CreditCard, Lock, CheckCircle, ArrowBack } from '@mui/icons-material'
import { clearCart, adjustCartStock } from '../features/cart/cartSlice'
import { decreaseStock } from '../features/products/productsSlice'
import { addOrder } from '../features/orders/ordersSlice'
import { orderService } from '../api/orderService'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector(state => state.cart)
  const { currentUser } = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [stockError, setStockError] = useState(null)
  const [cardData, setCardData] = useState({ cardNumber: '', cardName: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState({})

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0 && !success) {
    navigate('/cart')
    return null
  }

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) {
      let month = parseInt(digits.slice(0, 2))
      if (month > 12) month = 12
      if (month === 0) month = 1
      const monthStr = String(month).padStart(2, '0')
      return monthStr + '/' + digits.slice(2)
    }
    return digits
  }

  const handleChange = (field, value) => {
    let formatted = value
    if (field === 'cardNumber') formatted = formatCardNumber(value)
    if (field === 'cardName') formatted = value.replace(/[^a-zA-Zא-ת\s]/g, '')
    if (field === 'expiry') formatted = formatExpiry(value)
    if (field === 'cvv') formatted = value.replace(/\D/g, '').slice(0, 3)
    setCardData(prev => ({ ...prev, [field]: formatted }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (cardData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'מספר כרטיס חייב להכיל 16 ספרות'
    if (!cardData.cardName.trim()) newErrors.cardName = 'שם בעל הכרטיס נדרש'
    if (cardData.expiry.length !== 5) {
      newErrors.expiry = 'תאריך תפוגה לא תקין (MM/YY)'
    } else {
      const [month, year] = cardData.expiry.split('/')
      const monthNum = parseInt(month)
      const yearNum = parseInt(year)
      const now = new Date()
      const currentYear = now.getFullYear() % 100
      const currentMonth = now.getMonth() + 1
      if (monthNum < 1 || monthNum > 12) {
        newErrors.expiry = 'חודש לא תקין (01-12)'
      } else if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
        newErrors.expiry = 'כרטיס פג תוקף'
      }
    }
    if (cardData.cvv.length !== 3) newErrors.cvv = 'CVV חייב להכיל 3 ספרות'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    setStockError(null)
    try {
      const orderData = {
        userId: currentUser._id,
        items: items.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: totalPrice,
        createdAt: new Date().toISOString(),
      }

      let serverOrder
      try {
        serverOrder = await orderService.createOrder(orderData)
      } catch (err) {
        // שגיאת מלאי - עדכן סל והצג הודעה
        if (err?.message === 'insufficient_stock' && err?.items) {
          dispatch(adjustCartStock(err.items))
          setStockError(err.items)
          setLoading(false)
          return
        }
        // שרת לא זמין - ממשיכים עם הזמנה מקומית
        serverOrder = { ...orderData, _id: Date.now().toString() }
      }

      const localOrder = {
        _id: serverOrder._id || Date.now().toString(),
        items: orderData.items,
        total: totalPrice,
        createdAt: new Date().toISOString(),
        userId: currentUser._id,
      }

      dispatch(addOrder(localOrder))
      dispatch(decreaseStock(items.map(item => ({ _id: item._id, quantity: item.quantity }))))
      dispatch(clearCart())
      setSuccess(true)
      setTimeout(() => navigate('/my-orders'), 2000)
    } catch (err) {
      console.error('שגיאה ביצירת הזמנה:', err)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 90, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom fontWeight="bold" color="success.main">
          ההזמנה בוצעה בהצלחה! 🎉
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          תודה על הקנייה! מעביר אותך לדף ההזמנות שלך...
        </Typography>
        <CircularProgress color="success" />
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/cart')} sx={{ mb: 2 }}>
        חזרה לסל
      </Button>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        סיום הזמנה
      </Typography>

      <Grid container spacing={4}>
        {/* טופס כרטיס אשראי */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <CreditCard color="primary" />
              <Typography variant="h6" fontWeight="bold">פרטי תשלום</Typography>
              <Lock fontSize="small" color="success" sx={{ ml: 'auto' }} />
              <Typography variant="caption" color="success.main" fontWeight="bold">מאובטח SSL</Typography>
            </Box>

            {/* תצוגת הכרטיס */}
            <Box sx={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              borderRadius: 3,
              p: 3,
              mb: 3,
              color: 'white',
              minHeight: 170,
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <Box sx={{
                position: 'absolute', top: 0, right: 0, width: 200, height: 200,
                borderRadius: '50%', background: 'rgba(255,255,255,0.05)', transform: 'translate(50px, -80px)',
              }} />
              <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 2, display: 'block', mb: 2 }}>
                CREDIT CARD
              </Typography>
              <Typography variant="h5" sx={{ letterSpacing: 4, mb: 3, fontFamily: 'monospace' }}>
                {cardData.cardNumber || '•••• •••• •••• ••••'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.6, display: 'block' }}>שם בעל הכרטיס</Typography>
                  <Typography variant="body1" sx={{ textTransform: 'uppercase' }}>
                    {cardData.cardName || 'FULL NAME'}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ opacity: 0.6, display: 'block' }}>תוקף</Typography>
                  <Typography variant="body1">{cardData.expiry || 'MM/YY'}</Typography>
                </Box>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="מספר כרטיס"
                  value={cardData.cardNumber}
                  onChange={(e) => handleChange('cardNumber', e.target.value)}
                  error={!!errors.cardNumber} helperText={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="שם בעל הכרטיס"
                  value={cardData.cardName}
                  onChange={(e) => handleChange('cardName', e.target.value)}
                  error={!!errors.cardName} helperText={errors.cardName}
                  placeholder="כפי שמופיע על הכרטיס"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="תאריך תפוגה"
                  value={cardData.expiry}
                  onChange={(e) => handleChange('expiry', e.target.value)}
                  error={!!errors.expiry} helperText={errors.expiry}
                  placeholder="MM/YY"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="CVV"
                  value={cardData.cvv}
                  onChange={(e) => handleChange('cvv', e.target.value)}
                  error={!!errors.cvv} helperText={errors.cvv}
                  placeholder="123"
                  type="password"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* סיכום הזמנה */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 80 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              סיכום הזמנה
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {items.map(item => (
              <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight="medium">{item.name}</Typography>
                  <Typography variant="caption" color="text.secondary">כמות: {item.quantity}</Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold">₪{item.price * item.quantity}</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">סכום ביניים:</Typography>
              <Typography>₪{totalPrice}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">משלוח:</Typography>
              <Typography color="success.main" fontWeight="bold">חינם 🎁</Typography>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">סה"כ לתשלום:</Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">₪{totalPrice}</Typography>
            </Box>

            <Button
              variant="contained" fullWidth size="large"
              onClick={handleSubmit} disabled={loading}
              sx={{
                py: 1.5, fontSize: '1.1rem', fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4393 100%)' },
              }}
            >
              {loading ? <CircularProgress size={26} color="inherit" /> : '💳 שלם עכשיו'}
            </Button>

            {stockError && (
              <Alert severity="warning" sx={{ mt: 2 }} onClose={() => setStockError(null)}>
                <strong>חלק מהמוצרים עודכנו — המלאי השתנה:</strong>
                <ul style={{ margin: '8px 0 0 0', paddingRight: 20 }}>
                  {stockError.map(item => (
                    <li key={item._id}>
                      <strong>{item.name}</strong>:{' '}
                      {item.available === 0
                        ? 'אזל מהמלאי והוסר מהסל'
                        : `נותרו ${item.available} במלאי — הכמות בסל עודכנה`}
                    </li>
                  ))}
                </ul>
                אנא בדוק את הסל ואשר מחדש.
              </Alert>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 2 }}>
              <Lock fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                תשלום מאובטח - הפרטים לא נשמרים
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
