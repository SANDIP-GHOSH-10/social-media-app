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
  });
  const [errors, setErrors] = useState({});
  const [emailInUse, setEmailInUse] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Form validation
  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
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
      setEmailInUse(false); // Reset email error on change
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const emailValid = await handleEmailCheck();
      if (emailValid) {
        try {
          await dispatch(registerUser(formData)); // Assuming this dispatch handles registration.
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Your account has been created. Redirecting to login...',
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
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          CricketZone Registration
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
          Join our cricket community and share your love for the game!
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
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
            label="Email"
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
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>

        {/* Error Message */}
        {emailInUse && (
          <Alert severity="error" sx={{ mt: 2 }}>
            The email address is already in use. Please try another email.
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
