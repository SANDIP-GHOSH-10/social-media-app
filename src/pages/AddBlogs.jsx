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









