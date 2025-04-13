import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/Slice/AuthSlice';
import { Box, Container, TextField, Typography, Button, Paper } from '@mui/material';
import Swal from 'sweetalert2';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputState, setInputState] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const { isLoading } = useSelector((state) => state.auth);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    let errMsg = {};

    switch (name) {
      case 'email':
        errMsg.email = value ? '' : 'Email is required.';
        break;
      case 'password':
        if (!value) errMsg.password = 'Password is required.';
        else if (value.length < 8) errMsg.password = 'Minimum 8 characters.';
        else errMsg.password = '';
        break;
      default:
        break;
    }

    setInputState({
      ...inputState,
      [name]: value,
    });

    setErrors({ ...errors, ...errMsg });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputState.email || !inputState.password) return;

    const result = await dispatch(loginUser(inputState));

    if (loginUser.fulfilled.match(result)) {
      Swal.fire({
        icon: 'success',
        title: 'Welcome back!',
        text: 'You’ve successfully logged in.',
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate('/'), 3000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: result.payload || 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("Asset/login.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(8px) brightness(0.95)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="sm" sx={{ zIndex: 2 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            SocialMedia
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 3, color: '#333' }}
          >
            Log in to connect and share with people all around the world.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={inputState.email}
              onChange={changeHandler}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              value={inputState.password}
              onChange={changeHandler}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '16px',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(90deg, #264653 0%, #2a9d8f 100%)',
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 3, fontSize: '14px', color: '#555' }}>
            Don’t have an account?{' '}
            <Link to="/register" style={{ color: '#1976D2', textDecoration: 'none' }}>
              Sign up here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

























