import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from 'sweetalert2';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Pagination,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';

const Show = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, userBlogData } = useSelector((state) => state.UserBlog);
  const userEmail = useSelector((state) => state.auth?.user?.email);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;
  const [likes, setLikes] = useState({});

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  const handleDelete = (id) => dispatch(deleteBlog(id));

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleComment = (id) => {
    alert(`Comment feature for blog ID ${id} coming soon!`);
  };

  const handlePostClick = () => {
    if (userEmail) {
      navigate('/post/new');
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to create a post.',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/login');
      });
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = userBlogData.slice(indexOfFirstBlog, indexOfLastBlog);
  const handleChangePage = (e, value) => setCurrentPage(value);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header with Post Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Post Feed
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePostClick}
          sx={{ borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
        >
          Post
        </Button>
      </Box>

      {/* Blog Content */}
      {isLoading ? (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          Loading blogs...
        </Typography>
      ) : error ? (
        <Typography variant="body1" align="center" color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <>
          {currentBlogs.map((blog) => (
            <Card
              key={blog.id}
              sx={{
                mb: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <CardContent>
                {/* Email and Description Section */}
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <AccountCircleIcon color="primary" />
                    <Typography variant="subtitle2" fontWeight={600}>
                      {blog.email}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      backgroundColor: '#f5f5f5',
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      textAlign: 'left',
                      fontSize: '1rem',
                    }}
                  >
                    {blog.description}
                  </Typography>
                </Box>
              </CardContent>

              {/* Blog Image with improved styling */}
              {blog.image && (
                <Box
                  sx={{
                    width: '100%',
                    maxHeight: 500,
                    overflow: 'hidden',
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <img
                    src={blog.image}
                    alt="Blog"
                    style={{
                      width: '100%',
                      height: '150%',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '8px',
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/fallback-image.jpg'; // Optional fallback
                    }}
                  />
                </Box>
              )}

              <CardContent>
                {/* Like & Comment Section */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Tooltip title="Like">
                    <IconButton onClick={() => handleLike(blog.id)} color="error">
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                  <Typography>{likes[blog.id] || 0}</Typography>

                  <Tooltip title="Comment">
                    <IconButton onClick={() => handleComment(blog.id)} color="primary">
                      <CommentIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>

                {/* Edit & Delete Buttons */}
                {userEmail && blog.email === userEmail && (
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/update/${blog.id}`)}
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        px: 3,
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(blog.id)}
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        px: 3,
                        fontWeight: 'bold',
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(userBlogData.length / blogsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Show;



