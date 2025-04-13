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





















// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     TextField,
//     Button,
//     Box,
//     Typography,
//     Paper,
//     CircularProgress,
//     IconButton,
//     InputAdornment,
//     Snackbar,
//     Alert,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { NavLink, useNavigate } from "react-router-dom";
// import { registerUser } from "../Redux/Slice/AuthSlice";

// function Registration() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [phone, setPhone] = useState("");
//     const [fullName, setFullName] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [phoneError, setPhoneError] = useState("");
//     const [fullNameError, setFullNameError] = useState("");
//     const [uniqueError, setUniqueError] = useState("");
//     const [successMessage, setSuccessMessage] = useState(false); // Snackbar state

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { loading, error, users } = useSelector((state) => state.users);

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     const passwordRegex =
//         /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
//     const phoneRegex = /^\d{10}$/;
//     const fullNameRegex = /^[A-Za-z ]+$/;

//     const handleRegistration = (e) => {
//         e.preventDefault();
//         let isValid = true;
//         setUniqueError("");

//         if (!emailRegex.test(email)) {
//             setEmailError("Please enter a valid email.");
//             isValid = false;
//         } else {
//             setEmailError("");
//         }

//         if (!passwordRegex.test(password)) {
//             setPasswordError(
//                 "Password must be 8-20 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
//             );
//             isValid = false;
//         } else {
//             setPasswordError("");
//         }

//         if (phone && !phoneRegex.test(phone)) {
//             setPhoneError("Phone number should be 10 digits.");
//             isValid = false;
//         } else {
//             setPhoneError("");
//         }

//         if (!fullNameRegex.test(fullName)) {
//             setFullNameError("Full name should only contain alphabets and spaces.");
//             isValid = false;
//         } else {
//             setFullNameError("");
//         }

//         const emailExists = users?.some((user) => user.email === email);
//         if (emailExists) {
//             setUniqueError("This email is already registered. Please use another.");
//             isValid = false;
//         }

//         if (isValid) {
//             dispatch(registerUser({ email, password, phone, fullName }))
//                 .unwrap()
//                 .then(() => {
//                     setSuccessMessage(true); // Show success message
//                     setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
//                 })
//                 .catch((err) => {
//                     console.error("Registration failed:", err);
//                     setUniqueError("Something went wrong. Please try again.");
//                 });
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setSuccessMessage(false);
//     };

//     return (
//         <div className="registration-container">
//             <Paper className="registration-paper">
//                 <Box className="registration-box">
//                     <Typography variant="h5" className="registration-title">
//                         Register to Order Your Favorite Meals!
//                     </Typography>

//                     <form onSubmit={handleRegistration}>
//                         <TextField
//                             label="Full Name"
//                             type="text"
//                             fullWidth
//                             required
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                             className="input-field"
//                             error={!!fullNameError}
//                             helperText={fullNameError}
//                         />
//                         <TextField
//                             label="Email"
//                             type="email"
//                             fullWidth
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="input-field"
//                             error={!!emailError}
//                             helperText={emailError}
//                         />
//                         <TextField
//                             label="Password"
//                             type={showPassword ? "text" : "password"}
//                             fullWidth
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="input-field"
//                             error={!!passwordError}
//                             helperText={passwordError}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             edge="end"
//                                         >
//                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />
//                         <TextField
//                             label="Phone (Optional)"
//                             type="text"
//                             fullWidth
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             className="input-field"
//                             error={!!phoneError}
//                             helperText={phoneError}
//                         />
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             className="submit-btn"
//                             type="submit"
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <CircularProgress size={24} className="circular-progress" />
//                             ) : (
//                                 "Register & Order Now"
//                             )}
//                         </Button>
//                     </form>

//                     {uniqueError && (
//                         <Typography className="error-message">{uniqueError}</Typography>
//                     )}

//                     {error && (
//                         <Typography className="error-message">{error}</Typography>
//                     )}

//                     <Typography className="login-link">
//                         Already have an account?{" "}
//                         <NavLink to="/login" className="login-link-text">
//                             Login
//                         </NavLink>
//                     </Typography>
//                 </Box>
//             </Paper>

//             {/* Success Snackbar */}
//             <Snackbar
//                 open={successMessage}
//                 autoHideDuration={3000}
//                 onClose={handleCloseSnackbar}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity="success">
//                     Registration Successful! Redirecting to Login Page...
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// }

// export default Registration;












// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../Redux/Slice/AuthSlice';
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     profileImage: '', // base64 image string
//   });

//   const [errors, setErrors] = useState({});
//   const [emailInUse, setEmailInUse] = useState(false);

//   const dispatch = useDispatch();
//   const { isLoading, error } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const validate = () => {
//     let valid = true;
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//       valid = false;
//     } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
//       newErrors.name = 'Name can only contain letters and spaces';
//       valid = false;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (
//       !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
//     ) {
//       newErrors.email = 'Invalid email format';
//       valid = false;
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleEmailCheck = async () => {
//     try {
//       const response = await fetch('http://localhost:1000/auth');
//       const users = await response.json();
//       const emailExists = users.some((user) => user.email === formData.email);
//       setEmailInUse(emailExists);
//       return !emailExists;
//     } catch (err) {
//       console.error('Error checking email:', err);
//       return false;
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === 'email') {
//       setEmailInUse(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({
//         ...prev,
//         profileImage: reader.result, // base64 string
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const emailValid = await handleEmailCheck();
//       if (emailValid) {
//         try {
//           await dispatch(registerUser(formData));
//           Swal.fire({
//             icon: 'success',
//             title: 'Registration Successful',
//             text: 'Your account has been created. Redirecting to login...',
//             timer: 3000,
//             showConfirmButton: false,
//           });
//           setTimeout(() => {
//             navigate('/login');
//           }, 3000);
//         } catch (err) {
//           console.error('Error during registration:', err);
//         }
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Box
//         sx={{
//           boxShadow: 3,
//           p: 4,
//           borderRadius: 2,
//           bgcolor: 'background.paper',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           CricketZone Registration
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
//           Join our cricket community and share your love for the game!
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             error={!!errors.name}
//             helperText={errors.name}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={!!errors.email || emailInUse}
//             helperText={emailInUse ? 'Email is already in use' : errors.email}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={!!errors.password}
//             helperText={errors.password}
//             variant="outlined"
//             margin="normal"
//           />

//           {/* Image Upload */}
//           <Button
//             component="label"
//             variant="outlined"
//             sx={{ mt: 2, mb: 1, width: '100%' }}
//           >
//             Upload Profile Image
//             <input type="file" hidden accept="image/*" onChange={handleImageChange} />
//           </Button>

//           {/* Image Preview */}
//           {formData.profileImage && (
//             <Box sx={{ mt: 2 }}>
//               <img
//                 src={formData.profileImage}
//                 alt="Preview"
//                 style={{ maxWidth: '100%', borderRadius: 8 }}
//               />
//             </Box>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 3, py: 1.5 }}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
//           </Button>
//         </form>

//         {/* Alerts */}
//         {emailInUse && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             The email address is already in use. Please try another email.
//           </Alert>
//         )}
//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Registration;















// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../Redux/Slice/AuthSlice';
// import {
//   Box,
//   Button,
//   Container,
//   TextField, 
//   Typography,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   let [imageState, setImage] = useState({});
//   const [errors, setErrors] = useState({});
//   const [emailInUse, setEmailInUse] = useState(false);

//   const dispatch = useDispatch();
//   const { isLoading, error } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   // Form validation
//   const validate = () => {
//     let valid = true;
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//       valid = false;
//     }
//     if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
//       newErrors.name = 'Name can only contain letters and spaces';
//       valid = false;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//       valid = false;
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleEmailCheck = async () => {
//     try {
//       const response = await fetch('http://localhost:1000/auth');
//       const users = await response.json();
//       const emailExists = users.some((user) => user.email === formData.email);
//       setEmailInUse(emailExists);
//       return !emailExists;
//     } catch (err) {
//       console.error('Error checking email:', err);
//       return false;
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === 'email') {
//       setEmailInUse(false); // Reset email error on change
//     }
//   };

//   const imageHandeler = (file) => {
//     // setImage(event.target.files[0])
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file)
//     fileReader.addEventListener('load',()=>{
//         setImage(fileReader.result)
//     })
// }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const emailValid = await handleEmailCheck();
//       if (emailValid) {
//         try {
//           await dispatch(registerUser(formData)); // Assuming this dispatch handles registration.
//           Swal.fire({
//             icon: 'success',
//             title: 'Registration Successful',
//             text: 'Your account has been created. Redirecting to login...',
//             timer: 3000,
//             showConfirmButton: false,
//           });
//           setTimeout(() => {
//             navigate('/login');
//           }, 3000);
//         } catch (err) {
//           console.error('Error during registration:', err);
//         }
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Box
//         sx={{
//           boxShadow: 3,
//           p: 4,
//           borderRadius: 2,
//           bgcolor: 'background.paper',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           CricketZone Registration
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
//           Join our cricket community and share your love for the game!
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             error={!!errors.name}
//             helperText={errors.name}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={!!errors.email || emailInUse}
//             helperText={emailInUse ? 'Email is already in use' : errors.email}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={!!errors.password}
//             helperText={errors.password}
//             variant="outlined"
//             margin="normal"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2, py: 1.5 }}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
//           </Button>
//         </form>

//         {/* Error Message */}
//         {emailInUse && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             The email address is already in use. Please try another email.
//           </Alert>
//         )}

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Registration;





































// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../Redux/Slice/AuthSlice';
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   CircularProgress,
//   Alert,
// } from '@mui/material';

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [emailInUse, setEmailInUse] = useState(false);

//   const dispatch = useDispatch();
//   const { isLoading, error } = useSelector((state) => state.auth);

//   // Form validation
//   const validate = () => {
//     let valid = true;
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//       valid = false;
//     }
//     if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
//       newErrors.name = 'Name can only contain letters and spaces';
//       valid = false;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//       valid = false;
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleEmailCheck = async () => {
//     // Check if the email already exists in db.json
//     try {
//       const response = await fetch('http://localhost:1000/auth'); // Replace with your actual API endpoint
//       const users = await response.json();
//       const emailExists = users.some((user) => user.email === formData.email);
//       setEmailInUse(emailExists);
//       return !emailExists;
//     } catch (err) {
//       console.error('Error checking email:', err);
//       return false;
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === 'email') {
//       setEmailInUse(false); // Reset email error on change
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const emailValid = await handleEmailCheck();
//       if (emailValid) {
//         dispatch(registerUser(formData));
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Box
//         sx={{
//           boxShadow: 3,
//           p: 4,
//           borderRadius: 2,
//           bgcolor: 'background.paper',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           CricketZone Registration
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
//           Join our cricket community and share your love for the game!
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             error={!!errors.name}
//             helperText={errors.name}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={!!errors.email || emailInUse}
//             helperText={emailInUse ? 'Email is already in use' : errors.email}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={!!errors.password}
//             helperText={errors.password}
//             variant="outlined"
//             margin="normal"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2, py: 1.5 }}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
//           </Button>
//         </form>

//         {/* Error Message */}
//         {emailInUse && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             The email address is already in use. Please try another email.
//           </Alert>
//         )}

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}
//       </Box> 
//     </Container>
//   );
// };

// export default Registration;






























// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../Redux/Slice/AuthSlice';
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   CircularProgress,
//   Alert,
// } from '@mui/material';

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [emailInUse, setEmailInUse] = useState(false);

//   const dispatch = useDispatch();

//   const { isLoading, error } = useSelector((state) => state.auth);

//   // Regex validation
//   const validate = () => {
//     let valid = true;
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//       valid = false;
//     }
//     if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
//       newErrors.name = 'Name can only contain letters and spaces';
//       valid = false;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//       valid = false;
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleEmailCheck = async () => {
//     // Check if the email already exists in db.json
//     try {
//       const response = await fetch('http://localhost:5000/users'); // Replace with your actual API endpoint
//       const users = await response.json();
//       const emailExists = users.some((user) => user.email === formData.email);
//       setEmailInUse(emailExists);
//       return !emailExists;
//     } catch (err) {
//       console.error('Error checking email:', err);
//       return false;
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const emailValid = await handleEmailCheck();
//       if (emailValid) {
//         dispatch(registerUser(formData));
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Box
//         sx={{
//           boxShadow: 3,
//           p: 4,
//           borderRadius: 2,
//           bgcolor: 'background.paper',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           CricketZone Registration
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
//           Join our cricket community!
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             error={!!errors.name}
//             helperText={errors.name}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={!!errors.email || emailInUse}
//             helperText={emailInUse ? 'Email is already in use' : errors.email}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={!!errors.password}
//             helperText={errors.password}
//             variant="outlined"
//             margin="normal"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2, py: 1.5 }}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
//           </Button>
//         </form>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Registration;














// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../Redux/Slice/AuthSlice';

// const Registration = () => {
//   const [name,setName] = useState('');
//   const [email,setEmail] = useState('');
//   const [password,setPassword] = useState('');

//   const dispatch = useDispatch();

//   let { isLoading, error } = useSelector((state) => {
//     // console.log("state value", state);
//     return state.auth
// });

//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     console.log(name, email, password);
//     if(name && email && password){
//       dispatch(registerUser({name,email,password}))
//     }
//   }


//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   if (error) {
//     return <p>Error: {error}</p>
//   }
//   return (
//     <div>
//       <h1>Registration</h1>
//     <form onSubmit={handleSubmit}>
//     <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
//     <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
//     <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

//     <button  type='submit'>Register</button>
//     </form>
//     </div>
//   )
// }

// export default Registration









































// import React, { useState } from "react";
// import { Container, Box, TextField, Button, Typography, Grid, Link } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../Redux/Slice/AuthSlice";

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   // const dispatch = useDispatch();

 

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // if (formData) {
//     //   dispatch(registerUser(formData));
//     // }
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           boxShadow: 3,
//           p: 4,
//           borderRadius: 2,
//           backgroundColor: "white",
//         }}
//       >
//         <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
//           Register
//         </Typography>
//         <Box  sx={{ width: "100%" }}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             margin="normal"
//             fullWidth
//             required
//             id="name"
//             label="Full Name"
//             name="name"
//             autoComplete="name"
//             autoFocus
//             value={formData.name}
//             onChange={(e)=> setFormData(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             required
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             value={formData.email}
//             onChange={(e)=> setFormData(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             required
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="new-password"
//             value={formData.password}
//             onChange={(e)=> setFormData(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             required
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             autoComplete="new-password"
//             value={formData.confirmPassword}
//             onChange={(e)=> setFormData(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 3,
//               mb: 2,
//               backgroundColor: "#1e88e5",
//               "&:hover": { backgroundColor: "#1565c0" },
//             }}
//           >
//             Register
//           </Button>
//           </form>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link href="/login" variant="body2" sx={{ textDecoration: "none" }}>
//                 Already have an account? Login
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Registration;
