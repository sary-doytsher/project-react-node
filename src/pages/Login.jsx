import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import { userService } from '../api/userService'
import { setUser } from '../features/user/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/products'
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setError('')
    try {
      const user = await userService.login(data)
      dispatch(setUser(user))
      navigate(from)
    } catch (err) {
      setError(err.message || 'שגיאה בהתחברות. אנא בדוק את הפרטים שהזנת.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LoginIcon sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1">
            התחברות
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="אימייל"
            type="email"
            margin="normal"
            {...register('email', {
              required: 'שדה חובה',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'כתובת אימייל לא תקינה',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="סיסמה"
            type="password"
            margin="normal"
            {...register('password', {
              required: 'שדה חובה',
              minLength: {
                value: 6,
                message: 'הסיסמה חייבת להכיל לפחות 6 תווים',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            התחבר
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              עדיין לא רשום?{' '}
              <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                הירשם כעת
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
