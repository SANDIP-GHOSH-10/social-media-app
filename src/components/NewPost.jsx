import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';

const NewPost = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to create a new post.',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } else {
      navigate('/post/new');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handlePostClick}
        sx={{
          borderRadius: '30px',
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 'bold',
          boxShadow: 3,
        }}
      >
        Post
      </Button>
    </div>
  );
};

export default NewPost;
