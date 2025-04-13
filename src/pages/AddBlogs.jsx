import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBlog } from '../Redux/Slice/UserBlogSlice';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import Swal from 'sweetalert2';

const AddBlogs = () => {
  const [profileImage, setProfileImage] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth?.user?.email);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profileImage && description && userEmail) {
      const blogData = {
        image: profileImage,
        description,
        email: userEmail,
      };

      dispatch(addBlog(blogData)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setProfileImage('');
          setDescription('');
          Swal.fire({
            icon: 'success',
            title: 'Post Added Successfully',
            text: 'Your blog has been added.',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            navigate('/');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Post Creation Failed',
            text: 'There was an issue creating your post. Please try again.',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: 'Please log in to create a post.',
      }).then(() => {
        navigate('/login');
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 550,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2,
          }}
        >
          Create a New Post
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mb: 3,
            background: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Share your thoughts with the community.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Button
            component="label"
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
              fontWeight: '500',
              textTransform: 'none',
              color: '#fff',
              borderColor: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
              background: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #264653 0%, #2a9d8f 100%)',
                borderColor: 'linear-gradient(90deg, #264653 0%, #2a9d8f 100%)',
              },
            }}
          >
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleImageChange} required />
          </Button>

          {profileImage && (
            <Box sx={{ mt: 2 }}>
              <img
                src={profileImage}
                alt="Preview"
                style={{ width: '100%', borderRadius: 8 }}
              />
            </Box>
          )}

          <TextField
            label="What's on your mind?"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{
              '& label.Mui-focused': {
                color: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
                },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              background: 'linear-gradient(90deg, #2a9d8f 0%, #264653 100%)',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '16px',
              '&:hover': {
                background: 'linear-gradient(90deg, #264653 0%, #2a9d8f 100%)',
              },
            }}
          >
            Post Now
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddBlogs;
















// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux'; 
// import { useNavigate } from 'react-router-dom';
// import { addBlog } from '../Redux/Slice/UserBlogSlice';
// import { TextField, Button, Paper, Typography, Box } from '@mui/material';

// const AddBlogs = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userEmail = useSelector((state) => state.auth?.user?.email); // Get logged-in user email

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (title && description && userEmail) {
//       const blogData = {
//         title,
//         description,
//         email: userEmail
//       };

//       dispatch(addBlog(blogData)).then((res) => {
//         if (res.meta.requestStatus === 'fulfilled') {
//           setTitle('');
//           setDescription('');
//           navigate('/');
//         } else {
//           alert("Failed to add blog. Please try again.");
//         }
//       });
//     } else {
//       alert("Missing fields or user not logged in");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundImage: 'url("Asset/add.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         overflow: 'hidden',
//       }}
//     >
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
//       />
//       <Paper
//         elevation={4}
//         sx={{
//           p: 4,
//           width: '100%',
//           maxWidth: 500,
//           borderRadius: 3,
//           position: 'relative',
//           zIndex: 2,
//           bgcolor: 'rgba(255, 255, 255, 0.5)',
//           boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#004d40' }}>
//           Add Blog
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <Box mt={3}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 borderRadius: 2,
//               }}
//             >
//               Add Blog
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default AddBlogs;
























// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux'; 
// import { useNavigate } from 'react-router-dom';
// import { addBlog } from '../Redux/Slice/UserBlogSlice';
// import { TextField, Button, Paper, Typography, Box } from '@mui/material';

// const AddBlogs = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userEmail = useSelector((state) => state.auth?.user?.email); // Get logged-in user email

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title && description && userEmail) {
//       dispatch(addBlog({ title, description, email: userEmail }));
//       navigate('/'); 
//     } else {
//       alert("Missing fields or user not logged in");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundImage: 'url("Asset/add.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         overflow: 'hidden',
//       }}
//     >
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
//       />
//       <Paper
//         elevation={4}
//         sx={{
//           p: 4,
//           width: '100%',
//           maxWidth: 500,
//           borderRadius: 3,
//           position: 'relative',
//           zIndex: 2,
//           bgcolor: 'rgba(255, 255, 255, 0.5)',
//           boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#004d40' }}>
//           Add Blog
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <Box mt={3}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 borderRadius: 2,
//               }}
//             >
//               Add Blog
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default AddBlogs;




















// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux'; 
// import { useNavigate } from 'react-router-dom';
// import { addBlog } from '../Redux/Slice/UserBlogSlice';
// import { TextField, Button, Paper, Typography, Box } from '@mui/material';

// const AddBlogs = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title && description) {
//       dispatch(addBlog({ title, description }));
//       navigate('/'); 
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundImage: 'url("Asset/add.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Blur Overlay */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           // background: 'rgba(0, 0, 0, 0.1)',
//           backdropFilter: 'blur(7px)',
//           zIndex: 1,
//         }}
//       />

//       {/* Form Card */}
//       <Paper
//         elevation={4}
//         sx={{
//           p: 4,
//           width: '100%',
//           maxWidth: 500,
//           borderRadius: 3,
//           position: 'relative',
//           zIndex: 2,
//           bgcolor: 'rgba(255, 255, 255, 0.5)',
//           boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
//           textAlign: 'center',
//         }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             color: '#004d40',
//           }}
//         >
//           Add Blog
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <Box mt={3}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 borderRadius: 2,
//               }}
//             >
//               Add Blog
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default AddBlogs;

























// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux'; 
// import { useNavigate } from 'react-router-dom';
// import { addBlog } from '../Redux/Slice/UserBlogSlice';
// import { TextField, Button, Paper, Typography, Box } from '@mui/material';

// const AddBlogs = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title && description) {
//       dispatch(addBlog({ title, description }));
//       navigate('/'); 
//     }
//   };

//   return (
//     <>
//       <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="100vh"
//       bgcolor="#f5f5f5"
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           p: 4,
//           width: '100%',
//           maxWidth: 500,
//           bgcolor: 'white',
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom>
//           Add Blog
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <Box mt={2} display="flex" justifyContent="center">
//             <Button type="submit" variant="contained" color="primary" size="large">
//               Add Blog
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//     </>
    
//   );
// };

// export default AddBlogs;
































// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux'; 
// import { useNavigate } from 'react-router-dom';
// import { addBlog } from '../Redux/Slice/UserBlogSlice';

// const AddBlogs = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Title desc",title)
//     if (title && description) {
//       dispatch(addBlog({ title, description }));
//       navigate('/'); 
//     }

//   };

//   return (
//     <div>
//       <h2>Add Todo</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <button type="submit" >Add Todo</button>
//       </form>
//     </div>
//   );
// };

// export default AddBlogs;

