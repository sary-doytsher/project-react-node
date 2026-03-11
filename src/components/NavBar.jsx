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
    <AppBar 
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 0, 
            cursor: 'pointer', 
            mr: 4,
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          onClick={() => navigate('/products')}
        >
          חנות אונליין
        </Typography>

        {/* שם המשתמש */}
        <Typography 
          variant="body1" 
          sx={{ 
            mr: 2,
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 500,
            fontSize: '1rem',
          }}
        >
          שלום, {currentUser ? currentUser.name : 'אורח'}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* תפריט לפי סוג משתמש */}
        {!currentUser ? (
          // אורח
          <>
            <Button
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
              startIcon={<Login />}
              onClick={() => navigate('/login')}
            >
              כניסה
            </Button>
            <Button
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
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
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
              startIcon={<Add />}
              onClick={() => navigate('/add-product')}
            >
              הוסף מוצר
            </Button>
            <Button
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
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
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              יציאה
            </Button>
          </>
        )}

        {/* סל קניות */}
        <IconButton
          onClick={() => navigate('/cart')}
          sx={{ 
            ml: 2,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
            },
          }}
        >
          <Badge badgeContent={cartItemsCount} color="error" sx={{ 
            '& .MuiBadge-badge': {
              backgroundColor: '#ff4081',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }
          }}>
            <ShoppingCart sx={{ fontSize: '1.5rem' }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
