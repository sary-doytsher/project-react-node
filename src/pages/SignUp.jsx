import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
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
import { PersonAdd } from '@mui/icons-material'
import { userService } from '../api/userService'
import { setUser } from '../features/user/userSlice'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    setError('')
    try {
      const { confirmPassword, ...userData } = data
      const user = await userService.signup(userData)
      dispatch(setUser(user))
      navigate('/products')
    } catch (err) {
      setError(err.message || 'שגיאה בהרשמה. אנא נסה שנית.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PersonAdd sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1">
            הרשמה
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
            label="שם מלא"
            margin="normal"
            {...register('name', {
              required: 'שדה חובה',
              minLength: {
                value: 2,
                message: 'השם חייב להכיל לפחות 2 תווים',
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

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
            label="טלפון"
            margin="normal"
            {...register('phone', {
              required: 'שדה חובה',
              pattern: {
                value: /^[0-9]{9,10}$/,
                message: 'מספר טלפון לא תקין',
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <TextField
            fullWidth
            label="כתובת"
            margin="normal"
            {...register('address', {
              required: 'שדה חובה',
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
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

          <TextField
            fullWidth
            label="אימות סיסמה"
            type="password"
            margin="normal"
            {...register('confirmPassword', {
              required: 'שדה חובה',
              validate: (value) => value === password || 'הסיסמאות אינן תואמות',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            הירשם
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              כבר רשום?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                התחבר כאן
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default SignUp
