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
        background: '#1a1a2e',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
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
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
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
            color: '#ffffff',
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
                color: '#ffffff',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'rgba(102, 126, 234, 0.3)',
                border: '2px solid #667eea',
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#667eea',
                  borderColor: '#667eea',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                },
              }}
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              sx={{
                color: '#ffffff',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'rgba(102, 126, 234, 0.3)',
                border: '2px solid #667eea',
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#667eea',
                  borderColor: '#667eea',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                },
              }}
              startIcon={<Login />}
              onClick={() => navigate('/login')}
            >
              כניסה
            </Button>
            <Button
              sx={{
                color: '#ffffff',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'rgba(102, 126, 234, 0.3)',
                border: '2px solid #667eea',
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#667eea',
                  borderColor: '#667eea',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
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
                color: '#ffffff',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'rgba(102, 126, 234, 0.3)',
                border: '2px solid #667eea',
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#667eea',
                  borderColor: '#667eea',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                },
              }}
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              sx={{
                color: '#ffffff',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'rgba(102, 126, 234, 0.3)',
                border: '2px solid #667eea',
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#667eea',
                  borderColor: '#667eea',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                },
              }}
              startIcon={<Add />}
              onClick={() => navigate('/add-product')}
            >
              הוסף מוצר
            </Button>
            <Button
              sx={{
                color: '#ffffff',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'rgba(255, 107, 107, 0.3)',
                border: '2px solid #ff6b6b',
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#ff6b6b',
                  borderColor: '#ff6b6b',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
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
                color: '#ffffff',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'rgba(102, 126, 234, 0.3)',
                border: '2px solid #667eea',
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#667eea',
                  borderColor: '#667eea',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                },
              }}
              startIcon={<Store />}
              onClick={() => navigate('/products')}
            >
              כל המוצרים
            </Button>
            <Button
              sx={{
                color: '#ffffff',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'rgba(255, 107, 107, 0.3)',
                border: '2px solid #ff6b6b',
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#ff6b6b',
                  borderColor: '#ff6b6b',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
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
            color: '#ffffff',
            backgroundColor: 'rgba(102, 126, 234, 0.3)',
            border: '2px solid #667eea',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#667eea',
              borderColor: '#667eea',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
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
