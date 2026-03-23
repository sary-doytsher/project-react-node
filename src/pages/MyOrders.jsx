import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container, Typography, Box, Paper, Chip, Grid, Button,
  Stepper, Step, StepLabel, Divider, CircularProgress,
} from '@mui/material'
import { ShoppingBag, Refresh, ArrowBack, LocalShipping } from '@mui/icons-material'
import { getOrderStatus, addOrder, mergeUserOrders } from '../features/orders/ordersSlice'
import { orderService } from '../api/orderService'

const STATUS_STEPS = ['התקבל', 'נארז', 'נשלח', 'הגיע']
const STATUS_COLORS = ['info', 'warning', 'primary', 'success', 'error']
const STATUS_BG = [
  'rgba(2,136,209,0.1)',
  'rgba(237,108,2,0.1)',
  'rgba(25,118,210,0.1)',
  'rgba(46,125,50,0.1)',
  'rgba(211,47,47,0.1)',
]

const MyOrders = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.orders)
  const { currentUser } = useSelector(state => state.user)
  const [tick, setTick] = useState(0)
  const [fetchLoading, setFetchLoading] = useState(false)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/my-orders' } })
    }
  }, [currentUser, navigate])

  // טוען הזמנות מהשרת ומסנכרן עם ה-Redux state
  const fetchOrdersFromServer = useCallback(async () => {
    if (!currentUser) return
    setFetchLoading(true)
    try {
      const serverOrders = await orderService.getUserOrders(currentUser._id)
      if (Array.isArray(serverOrders)) {
        // מחליף את כל ההזמנות של המשתמש בנתוני השרת — מונע כפילויות
        dispatch(mergeUserOrders({ userId: currentUser._id, serverOrders }))
      }
    } catch {
      // שרת לא זמין – ממשיכים עם הנתונים המקומיים
    } finally {
      setFetchLoading(false)
    }
  }, [currentUser, dispatch])

  useEffect(() => {
    fetchOrdersFromServer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  // מרענן אוטומטית כל 30 שניות
  useEffect(() => {
    const interval = setInterval(() => setTick(n => n + 1), 30000)
    return () => clearInterval(interval)
  }, [])

  if (!currentUser) return null

  const userOrders = orders.filter(order => order.userId === currentUser._id)

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/products')} variant="outlined" size="small">
          חזרה לחנות
        </Button>
        <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
          ההזמנות שלי
        </Typography>
        <Button
          startIcon={fetchLoading ? <CircularProgress size={16} /> : <Refresh />}
          onClick={() => { setTick(n => n + 1); fetchOrdersFromServer() }}
          variant="outlined" size="small"
          disabled={fetchLoading}
        >
          רענן סטטוס
        </Button>
      </Box>

      {userOrders.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
          <ShoppingBag sx={{ fontSize: 90, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            עוד לא ביצעת הזמנות
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
            גלה את המוצרים שלנו ובצע הזמנה ראשונה!
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/products')}>
            התחל לקנות 🛍️
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {userOrders.map((order) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const status = getOrderStatus(order.createdAt, order.status)
            const orderId = order._id?.toString().slice(-8).toUpperCase() || 'N/A'

            return (
              <Paper
                key={order._id}
                elevation={2}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `2px solid`,
                  borderColor: `${STATUS_COLORS[status.step]}.light`,
                }}
              >
                {/* כותרת הזמנה */}
                <Box sx={{
                  background: STATUS_BG[status.step],
                  px: 3, py: 2,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      הזמנה #{orderId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(order.createdAt).toLocaleDateString('he-IL', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    <Chip
                      label={`${status.icon} ${status.label}`}
                      color={STATUS_COLORS[status.step]}
                      sx={{ fontWeight: 'bold', fontSize: '0.95rem', px: 1 }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      ₪{order.total}
                    </Typography>
                  </Box>
                </Box>

                {/* מד התקדמות */}
                <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                  <Stepper activeStep={status.step} alternativeLabel>
                    {STATUS_STEPS.map((label, index) => (
                      <Step key={label} completed={index < status.step}>
                        <StepLabel
                          sx={{
                            '& .MuiStepLabel-label': {
                              fontWeight: index === status.step ? 'bold' : 'normal',
                              color: index === status.step ? `${STATUS_COLORS[status.step]}.main` : 'inherit',
                            },
                          }}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                <Divider sx={{ mx: 3, my: 2 }} />

                {/* פריטי ההזמנה */}
                <Box sx={{ px: 3, pb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                    פריטים בהזמנה ({order.items?.length || 0}):
                  </Typography>
                  <Grid container spacing={1}>
                    {order.items?.map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{
                          display: 'flex', alignItems: 'center', gap: 1.5,
                          p: 1.5, borderRadius: 2, bgcolor: 'action.hover',
                        }}>
                          <img
                            src={`/images/${item.image}`}
                            alt={item.name}
                            style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8 }}
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                          <Box>
                            <Typography variant="body2" fontWeight="medium">{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              כמות: {item.quantity} | ₪{item.price * item.quantity}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  {status.step < 3 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                      <LocalShipping fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {status.step === 0 && 'הזמנתך התקבלה ועומדת להיארז'}
                        {status.step === 1 && 'הזמנתך בתהליך אריזה ותישלח בקרוב'}
                        {status.step === 2 && 'הזמנתך בדרך אליך! צפוי הגעה בקרוב'}
                      </Typography>
                    </Box>
                  )}
                  {status.step === 3 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                      <Typography variant="caption" color="success.main" fontWeight="bold">
                        ✅ ההזמנה הגיעה ליעדה! נשמח לראותך שוב
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            )
          })}
        </Box>
      )}
    </Container>
  )
}

export default MyOrders
