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
        title: 'Login Successful',
        text: 'Welcome back!',
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
          backdropFilter: 'blur(7px)',
          zIndex: 1,
        }}
      ></Box>

      <Container maxWidth="sm" sx={{ zIndex: 2 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#4CAF50',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            Cricket Zone
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Enter your login credentials to proceed.
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
              variant="contained"
              color="success"
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '16px',
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2, color: '#555', fontSize: '14px' }}>
            Not registered?{' '}
            <Link to="/reg" style={{ textDecoration: 'none', color: '#4CAF50' }}>
              Create an account
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

























// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../Redux/Slice/AuthSlice'; // Import your login action
// import { Box, Container, TextField, Typography, Button, Paper } from '@mui/material';
// import Swal from 'sweetalert2';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // State to handle form input
//   const [inputState, setInputState] = useState({
//     email: '',
//     password: '',
//   });

//   // State for validation errors
//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
//   });

//   // Redux state for loading and errors
//   const { isLoading, error, loginValue } = useSelector((state) => state.auth);

//   // Handle input change and validation
//   const changeHandler = (event) => {
//     let { name, value } = event.target;
//     let errMsg = {};

//     switch (name) {
//       case 'email':
//         if (value.length < 1) errMsg.email = 'Email is required.';
//         else errMsg.email = '';
//         break;

//       case 'password':
//         if (value.length < 1) errMsg.password = 'Password is required.';
//         else if (value.length < 8) errMsg.password = 'Minimum 8 characters.';
//         else errMsg.password = '';
//         break;

//       default:
//         break;
//     }
//     setInputState({
//       ...inputState,
//       [name]: value,
//     });
//     setErrors({ ...errors, ...errMsg });
//   };

//   // Handle form submit
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Check for validation errors before dispatching
//     if (!inputState.email || !inputState.password) {
//       return;
//     }

//     // Dispatch login action
//     await dispatch(loginUser(inputState));

//     // Handle login success or failure
//     if (loginValue) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful',
//         text: 'Welcome back!',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       setTimeout(() => navigate('/'), 3000); // Redirect to homepage after successful login
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Failed',
//         text: error || 'Invalid email or password. Please try again.',
//       });
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundImage: 'url("Asset/login.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         py: 4,
//       }}
//     >
//       {/* Overlay */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backdropFilter: 'blur(7px)',
//           zIndex: 1,
//         }}
//       ></Box>

//       <Container maxWidth="sm" sx={{ zIndex: 2 }}>
//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             borderRadius: 5,
//             backgroundColor: 'rgba(255, 255, 255, 0.5)',
//             boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
//           }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{
//               fontWeight: 'bold',
//               color: '#4CAF50',
//               textShadow: '1px 2px 4px rgba(0, 0, 0, 0.4)',
//             }}
//           >
//             Cricket Zone
//           </Typography>
//           <Typography variant="body1" align="center" sx={{ mb: 3 }}>
//             Enter your login credentials to proceed.
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Email"
//               name="email"
//               value={inputState.email}
//               onChange={changeHandler}
//               error={!!errors.email}
//               helperText={errors.email}
//               sx={{ mb: 3 }}
//             />

//             <TextField
//               fullWidth
//               variant="outlined"
//               type="password"
//               label="Password"
//               name="password"
//               value={inputState.password}
//               onChange={changeHandler}
//               error={!!errors.password}
//               helperText={errors.password}
//               sx={{ mb: 3 }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               color="success"
//               fullWidth
//               sx={{
//                 py: 1.5,
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 fontSize: '16px',
//               }}
//             >
//               Login
//             </Button>
//           </form>

//           <Typography align="center" sx={{ mt: 2, color: '#555', fontSize: '14px' }}>
//             Not registered?{' '}
//             <Link to="/reg" style={{ textDecoration: 'none', color: '#4CAF50' }}>
//               Create an account
//             </Link>
//           </Typography>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Login;





























// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Box,
//   Container,
//   TextField,
//   Typography,
//   Button,
//   Paper,
// } from '@mui/material';
// import Swal from 'sweetalert2';

// const Login = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState(null);

//   let [inputState, setState] = useState({
//     email: '',
//     password: '',
//   });
//   let [errors, setErrors] = useState({
//     email: '',
//     password: '',
//   });

//   const changeHandler = (event) => {
//     let { name, value } = event.target;
//     let errMsg = {};

//     switch (name) {
//       case 'email':
//         if (value.length < 1) errMsg.email = 'Email is required.';
//         else errMsg.email = '';
//         break;

//       case 'password':
//         if (value.length < 1) errMsg.password = 'Password is required.';
//         else if (value.length < 8) errMsg.password = 'Minimum 8 characters.';
//         else errMsg.password = '';
//         break;

//       default:
//         break;
//     }
//     setState({
//       ...inputState,
//       [name]: value,
//     });
//     setErrors({ ...errors, ...errMsg });
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const getUsers = async () => {
//     const data = await axios.get('http://localhost:1000/auth');
//     setUsers(data.data);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const user = users.find(
//       (val) =>
//         val.email === inputState.email && val.password === inputState.password
//     );

//     if (user) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful',
//         text: 'Welcome back!',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       setErrors({ email: '', password: '' });
//       setTimeout(() => navigate('/'), 3000); 
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Failed',
//         text: 'Invalid email or password. Please try again.',
//       });
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundImage: 'url("Asset/login.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         py: 4,
//       }}
//     >
//       {/* Overlay */}
//       <Box
      
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backdropFilter: 'blur(7px)',
//           // background: 'rgba(0, 0, 0, 0.6)',
//           zIndex: 1,
//         }}
//       ></Box>

//       <Container maxWidth="sm" sx={{ zIndex: 2 }}>
//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             borderRadius: 5,
//             backgroundColor: 'rgba(255, 255, 255, 0.5)',
//             boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
//           }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{
//               fontWeight: 'bold',
//               color: '#4CAF50',
//               textShadow: '1px 2px 4px rgba(0, 0, 0, 0.4)',
//             }}
//           >
//             Cricket Zone
//           </Typography>
//           <Typography variant="body1" align="center" sx={{ mb: 3 }}>
//             Enter your login credentials to proceed.
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Email"
//               name="email"
//               value={inputState.email}
//               onChange={changeHandler}
//               error={!!errors.email}
//               helperText={errors.email}
//               sx={{ mb: 3 }}
//             />

//             <TextField
//               fullWidth
//               variant="outlined"
//               type="password"
//               label="Password"
//               name="password"
//               value={inputState.password}
//               onChange={changeHandler}
//               error={!!errors.password}
//               helperText={errors.password}
//               sx={{ mb: 3 }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               color="success"
//               fullWidth
//               sx={{
//                 py: 1.5,
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 fontSize: '16px',
//               }}
//             >
//               Login
//             </Button>
//           </form>

//           <Typography
//             align="center"
//             sx={{ mt: 2, color: '#555', fontSize: '14px' }}
//           >
//             Not registered?{' '}
//             <Link to="/reg" style={{ textDecoration: 'none', color: '#4CAF50' }}>
//               Create an account
//             </Link>
//           </Typography>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Login;


















































// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// const Login = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState(null);

//   let [inputState, setState] = useState({
//       email: "", password: "", 
//   })
//   let [errors, setErors] = useState({
//       email: "", password: "",
//   })


//   const changeHandler = (event) => {
//     let { name, value } = event.target;

//     let errMsg = {};

//     switch (name) {

//         case "email":
//             if (value.length < 1) errMsg.email = "Required field";
//             else errMsg.email = "";
//             break;

//         case "password":
//             if (value.length < 1) errMsg.password = "Required field";
//             else if (value.length < 8) errMsg.password = "minimum 8 char";
//             else errMsg.password = "Successfull";
//             break;


//         default:
//             console.log("Not Applicable");
//             break;
//     }
//     setState({
//         ...inputState,
//         [name]: value
//     })
//     setErors({ ...errors, ...errMsg })
//     console.log("Validation eror", inputState.erors);
// }
// useEffect(() => {
//   getUsers();
// }, []);

// const getUsers = async () => {
//   const data = await axios.get("http://localhost:1000/auth");
//   console.log(data.data);
//   setUsers(data.data);
// };
// const handleSubmit = (event) => {
//   event.preventDefault();
//   console.log("Received Data", inputState);


//   const user = users.find(
//     (val) => val.email === inputState.email && val.password === inputState.password
//   );


// if (user) {
//     alert("Login successful!");
//     setErors({ email: "", password: "" });
//   } else {
//     // setErors({ email: "Invalid User Name", password: "Invalid email or password." });
//     alert("Invalid email or password");
//   }

//   navigate('/add-blog');
// }
//   return (
//     <section style={{backgroundImage: "Asset/login.jpg", backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px',}}>

//     <div className="main">
//     <h1 style={{ color: '#4CAF50', fontSize: '40px', textAlign: 'center', marginTop: '5px', fontFamily: '-webkit-body', textDecoration: 'underline' }}>Ghosh Hotel and Banquet</h1>
//     <h3>Enter your login credentials</h3>

//     <form
//     onSubmit={handleSubmit}
//     >
//       <label htmlFor="first">Email:</label>
//       <input
//         type="text"
//         id="first"
//         name="email"
//         placeholder="Enter your Email"
//         onChange={changeHandler}
//         // value={email}
//         // onChange={(e) => setemail(e.target.value)}

//         required
//       />
//         {errors && errors?.email.length > 0 ? <p className='text-danger text-end'>{errors.email}</p> : ""}

//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         placeholder="Enter your Password"
//         onChange={changeHandler}
//         // value={password}
//         // onChange={(e) => setPassword(e.target.value)}

//         required
//       />
//         {errors && errors?.password.length > 0 ? <p className='text-danger text-end'>{errors.password}</p> : ""}

//       <div className="wrap">
//         <button type="submit">Submit</button>
//       </div>
//     </form>

//     <p>
//       Not registered?{' '}
//       {/* <a href="#" style={{ textDecoration: 'none' }}> */}
//       <Link to={"/reg"} style={{ textDecoration: 'none' }}>
//         Create an account
//       </Link>
//       {/* </a> */}
//     </p>
//   </div>
     
//     </section>
//   )
// }

// export default Login

















// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../Redux/Slice/AuthSlice';

// const Login = () => {
//   const [eemail, setEemail] = useState('');
//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();

//   const { isLoading, error } = useSelector((state) => state.auth);

//   const handleSubmit = (e)=>{
//     e.preventDefault();
//     console.log(" Login Submitted Data",eemail ,password);
//     if (eemail && password) {
//       dispatch(loginUser({ eemail, password }));
//     }
//   }

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }
//   return (
//     <div>
//       <h1>Login</h1>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Eemail</label>
//           <input
//             type="eemail"
//             value={eemail}
//             onChange={(e) => setEemail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//           type='password'
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           />
//         </div>
//         <button type="submit" >Login</button>
//       </form>
      
      
//     </div>
//   )
// }

// export default Login
