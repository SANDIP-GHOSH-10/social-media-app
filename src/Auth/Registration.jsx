import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/Slice/AuthSlice';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: '',
  });

  const [errors, setErrors] = useState({});
  const [emailInUse, setEmailInUse] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEmailCheck = async () => {
    try {
      const response = await fetch('http://localhost:1000/auth');
      const users = await response.json();
      const emailExists = users.some((user) => user.email === formData.email);
      setEmailInUse(emailExists);
      return !emailExists;
    } catch (err) {
      console.error('Error checking email:', err);
      return false;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      setEmailInUse(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const emailValid = await handleEmailCheck();
      if (emailValid) {
        try {
          await dispatch(registerUser(formData));
          Swal.fire({
            icon: 'success',
            title: 'Welcome to SocialMedia!',
            text: 'Your account has been created successfully.',
            timer: 3000,
            showConfirmButton: false,
          });
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } catch (err) {
          console.error('Error during registration:', err);
        }
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        sx={{
          boxShadow: 5,
          p: 4,
          borderRadius: 3,
          bgcolor: 'background.paper',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          SocialMedia Sign Up
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
          Connect with friends and the world around you.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email || emailInUse}
            helperText={emailInUse ? 'Email is already in use' : errors.email}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            variant="outlined"
            margin="normal"
          />

          <Button
            component="label"
            variant="outlined"
            color="secondary"
            sx={{ mt: 2, mb: 2, width: '100%' }}
          >
            Upload Profile Picture
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>

          {formData.profileImage && (
            <Box sx={{ mt: 2 }}>
              <img
                src={formData.profileImage}
                alt="Profile Preview"
                style={{ maxWidth: '100%', borderRadius: 10 }}
              />
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
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
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
          </Button>
        </form>

        {emailInUse && (
          <Alert severity="error" sx={{ mt: 2 }}>
            This email is already registered.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Registration;








