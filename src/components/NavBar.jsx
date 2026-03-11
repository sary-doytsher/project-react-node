import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
} from '@mui/material'
import { ShoppingCart, Logout, Login, PersonAdd, Add, Store } from '@mui/icons-material'
import { logout } from '../features/user/userSlice'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user)
  const { items } = useSelector(state => state.cart)

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/products')
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, cursor: 'pointer', mr: 4 }}
          onClick={() => navigate('/products')}
        >
          חנות אונליין
        </Typography>

        {/* שם המשתמש */}
        <Typography variant="body1" sx={{ mr: 2 }}>
          שלום, {currentUser ? currentUser.name : 'אורח'}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* תפריט לפי סוג משתמש */}
        {!currentUser ? (
          // אורח
          <>
            <Button
              color="inherit"
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              color="inherit"
              startIcon={<Login />}
              onClick={() => navigate('/login')}
            >
              כניסה
            </Button>
            <Button
              color="inherit"
              startIcon={<PersonAdd />}
              onClick={() => navigate('/signup')}
            >
              הרשמה
            </Button>
          </>
        ) : currentUser.role === 'admin' ? (
          // מנהל
          <>
            <Button
              color="inherit"
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              color="inherit"
              startIcon={<Add />}
              onClick={() => navigate('/add-product')}
            >
              הוסף מוצר
            </Button>
            <Button
              color="inherit"
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              יציאה
            </Button>
          </>
        ) : (
          // משתמש רגיל
          <>
            <Button
              color="inherit"
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              color="inherit"
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              יציאה
            </Button>
          </>
        )}

        {/* סל קניות */}
        <IconButton
          color="inherit"
          onClick={() => navigate('/cart')}
          sx={{ ml: 2 }}
        >
          <Badge badgeContent={cartItemsCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
