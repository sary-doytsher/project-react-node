import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Alert,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { orderService } from '../api/orderService'
import { productService } from '../api/productService'
import { userService } from '../api/userService'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)
  const [tabValue, setTabValue] = useState(0)
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Dialog states
  const [orderStatusDialog, setOrderStatusDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  const [productDialog, setProductDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  })

  // Check if user is admin
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login')
      return
    }
    loadAllData()
  }, [currentUser, navigate])

  const loadAllData = async () => {
    setLoading(true)
    setError('')
    try {
      const [ordersData, usersData, productsData] = await Promise.all([
        orderService.getAllOrders(),
        userService.getAllUsers(),
        productService.getAll(),
      ])
      setOrders(ordersData)
      setUsers(usersData)
      setProducts(productsData)
    } catch (err) {
      setError('שגיאה בטעינת הנתונים')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ==================== ORDERS ====================

  const handleChangeOrderStatus = async () => {
    if (!newStatus) return
    try {
      await orderService.updateOrderStatus(selectedOrder._id, newStatus)
      setSuccess('סטטוס ההזמנה עודכן בהצלחה')
      setOrderStatusDialog(false)
      loadAllData()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('שגיאה בעדכון סטטוס ההזמנה')
    }
  }

  // ==================== PRODUCTS ====================

  const handleOpenProductDialog = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setProductForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
      })
    } else {
      setEditingProduct(null)
      setProductForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
      })
    }
    setProductDialog(true)
  }

  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price || !productForm.stock) {
      setError('אנא מלא את כל השדות החובה')
      return
    }

    try {
      if (editingProduct) {
        await productService.update(editingProduct._id, productForm)
        setSuccess('המוצר עודכן בהצלחה')
      } else {
        await productService.create(productForm)
        setSuccess('המוצר נוסף בהצלחה')
      }
      setProductDialog(false)
      loadAllData()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('שגיאה בשמירת המוצר')
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המוצר הזה?')) {
      try {
        await productService.delete(productId)
        setSuccess('המוצר נמחק בהצלחה')
        loadAllData()
        setTimeout(() => setSuccess(''), 3000)
      } catch (err) {
        setError('שגיאה במחיקת המוצר')
      }
    }
  }

  // ==================== RENDER ====================

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Paper elevation={3}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          aria-label="admin tabs"
        >
          <Tab label="הזמנות" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="מוצרים" id="tab-1" aria-controls="tabpanel-1" />
          <Tab label="משתמשים" id="tab-2" aria-controls="tabpanel-2" />
        </Tabs>

        {/* ORDERS TAB */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            ניהול הזמנות
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>מספר הזמנה</TableCell>
                  <TableCell>משתמש</TableCell>
                  <TableCell align="right">סכום</TableCell>
                  <TableCell>סטטוס</TableCell>
                  <TableCell>תאריך</TableCell>
                  <TableCell align="center">פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => {
                  const user = users.find((u) => u._id === order.userId)
                  return (
                    <TableRow key={order._id} hover>
                      <TableCell>#{order._id}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell align="right">₪{order.total}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={
                            order.status === 'pending'
                              ? 'warning'
                              : order.status === 'shipped'
                              ? 'info'
                              : 'success'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString('he-IL')}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setSelectedOrder(order)
                            setNewStatus(order.status)
                            setOrderStatusDialog(true)
                          }}
                        >
                          שנה סטטוס
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* PRODUCTS TAB */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">ניהול מוצרים</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenProductDialog()}
            >
              הוסף מוצר חדש
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>שם המוצר</TableCell>
                  <TableCell>קטגוריה</TableCell>
                  <TableCell align="right">מחיר</TableCell>
                  <TableCell align="center">מלאי</TableCell>
                  <TableCell align="center">פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">₪{product.price}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenProductDialog(product)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* USERS TAB */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            ניהול משתמשים
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>שם</TableCell>
                  <TableCell>אימייל</TableCell>
                  <TableCell>תפקיד</TableCell>
                  <TableCell>כניסה אחרונה</TableCell>
                  <TableCell>חברות מ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role === 'admin' ? 'מנהל' : 'משתמש'}
                        color={user.role === 'admin' ? 'error' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.lastLogin).toLocaleDateString('he-IL', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString('he-IL')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      {/* ORDER STATUS DIALOG */}
      <Dialog open={orderStatusDialog} onClose={() => setOrderStatusDialog(false)}>
        <DialogTitle>שינוי סטטוס הזמנה</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <TextField
            select
            fullWidth
            label="סטטוס חדש"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            SelectProps={{
              native: true,
            }}
            sx={{ mt: 2 }}
          >
            <option value=""></option>
            <option value="pending">בטיפול</option>
            <option value="shipped">נשלח</option>
            <option value="delivered">התקבל</option>
            <option value="cancelled">בוטל</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderStatusDialog(false)}>ביטול</Button>
          <Button onClick={handleChangeOrderStatus} variant="contained">
            שמור
          </Button>
        </DialogActions>
      </Dialog>

      {/* PRODUCT DIALOG */}
      <Dialog open={productDialog} onClose={() => setProductDialog(false)}>
        <DialogTitle>
          {editingProduct ? 'עריכת מוצר' : 'הוספת מוצר חדש'}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 450 }}>
          <TextField
            fullWidth
            label="שם המוצר"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
            sx={{ mt: 2, mb: 1 }}
          />
          <TextField
            fullWidth
            label="תיאור"
            multiline
            rows={3}
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="קטגוריה"
            value={productForm.category}
            onChange={(e) =>
              setProductForm({ ...productForm, category: e.target.value })
            }
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="מחיר"
            type="number"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({ ...productForm, price: Number(e.target.value) })
            }
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="מלאי"
            type="number"
            value={productForm.stock}
            onChange={(e) =>
              setProductForm({ ...productForm, stock: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductDialog(false)}>ביטול</Button>
          <Button onClick={handleSaveProduct} variant="contained">
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default AdminDashboard
