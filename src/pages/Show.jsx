import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Pagination,
  Box,
  Button,
  CardMedia,
  IconButton,
  Stack,
  Tooltip,
  Divider,
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

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = userBlogData.slice(indexOfFirstBlog, indexOfLastBlog);
  const handleChangePage = (e, value) => setCurrentPage(value);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
        Sports Blog
      </Typography>

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
                mb: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: 3,
              }}
            >
              {blog.image && (
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt="Blog"
                  sx={{
                    height: 700,
                    objectFit: 'cover',
                  }}
                />
              )}

              <CardContent>
                <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                  {blog.description}
                </Typography>

                {/* Like & Comment */}
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

                {/* Edit & Delete */}
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



























// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
// import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import CommentIcon from '@mui/icons-material/Comment';
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Pagination,
//   Box,
//   Button,
//   CardMedia,
//   IconButton,
//   Stack,
//   Tooltip,
// } from '@mui/material';

// const Show = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error, userBlogData } = useSelector((state) => state.UserBlog);
//   const userEmail = useSelector((state) => state.auth?.user?.email);

//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 10;
//   const [likes, setLikes] = useState({});

//   useEffect(() => {
//     dispatch(fetchBlog());
//   }, [dispatch]);

//   const handleDelete = (id) => dispatch(deleteBlog(id));

//   const handleLike = (id) => {
//     setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//   };

//   const handleComment = (id) => {
//     alert(`Comment feature for blog ID ${id} is coming soon!`);
//   };

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = userBlogData.slice(indexOfFirstBlog, indexOfLastBlog);
//   const handleChangePage = (e, value) => setCurrentPage(value);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         Sports Blog
//       </Typography>

//       {isLoading ? (
//         <Typography variant="body1" align="center" sx={{ mt: 4 }}>
//           Loading blogs...
//         </Typography>
//       ) : error ? (
//         <Typography variant="body1" align="center" color="error" sx={{ mt: 4 }}>
//           {error}
//         </Typography>
//       ) : (
//         <>
//           <Grid container spacing={3}>
//             {currentBlogs.map((blog) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//                 <Card
//                   sx={{
//                     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//                     borderRadius: 3,
//                     overflow: 'hidden',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                   }}
//                 >
//                   {/* Image */}
//                   {blog.image && (
//                     <CardMedia
//                       component="img"
//                       image={blog.image}
//                       alt="Blog"
//                       sx={{
//                         height: 180,
//                         objectFit: 'cover',
//                       }}
//                     />
//                   )}

//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography variant="body2" color="text.secondary">
//                       {blog.description}
//                     </Typography>

//                     {/* Like and Comment Section */}
//                     <Stack direction="row" spacing={2} alignItems="center" mt={2}>
//                       <Tooltip title="Like">
//                         <IconButton onClick={() => handleLike(blog.id)} color="error">
//                           <FavoriteIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <Typography>{likes[blog.id] || 0}</Typography>

//                       <Tooltip title="Comment">
//                         <IconButton onClick={() => handleComment(blog.id)} color="primary">
//                           <CommentIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </Stack>

//                     {/* Edit/Delete Buttons */}
//                     {userEmail && blog.email === userEmail && (
//                       <Stack direction="row" spacing={1} mt={2} justifyContent="flex-end">
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           size="small"
//                           startIcon={<EditIcon />}
//                           onClick={() => navigate(`/update/${blog.id}`)}
//                           sx={{ textTransform: 'none', borderRadius: 2 }}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           color="error"
//                           size="small"
//                           startIcon={<DeleteIcon />}
//                           onClick={() => handleDelete(blog.id)}
//                           sx={{ textTransform: 'none', borderRadius: 2 }}
//                         >
//                           Delete
//                         </Button>
//                       </Stack>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Pagination */}
//           <Box display="flex" justifyContent="center" mt={4}>
//             <Pagination
//               count={Math.ceil(userBlogData.length / blogsPerPage)}
//               page={currentPage}
//               onChange={handleChangePage}
//               color="primary"
//               shape="rounded"
//             />
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Show;

























// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
// import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Pagination,
//   Box,
//   IconButton,
//   CardMedia,
// } from '@mui/material';

// const Show = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error, userBlogData } = useSelector((state) => state.UserBlog);
//   const userEmail = useSelector((state) => state.auth?.user?.email);

//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 4;

//   useEffect(() => {
//     dispatch(fetchBlog());
//   }, [dispatch]);

//   const handleDelete = (id) => dispatch(deleteBlog(id));

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = userBlogData.slice(indexOfFirstBlog, indexOfLastBlog);
//   const handleChangePage = (e, value) => setCurrentPage(value);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         Sports Blog
//       </Typography>

//       {isLoading ? (
//         <Typography variant="body1" align="center" sx={{ mt: 4 }}>
//           Loading blogs...
//         </Typography>
//       ) : error ? (
//         <Typography variant="body1" align="center" color="error" sx={{ mt: 4 }}>
//           {error}
//         </Typography>
//       ) : (
//         <>
//           <Grid container spacing={3}>
//             {currentBlogs.map((blog) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//                 <Card
//                   sx={{
//                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//                     borderRadius: 2,
//                     overflow: 'hidden',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                   }}
//                 >
//                   {/* Display Image */}
//                   {blog.image && (
//                     <CardMedia
//                       component="img"
//                       image={blog.image}
//                       alt="Blog Cover"
//                       sx={{
//                         height: 180,
//                         objectFit: 'cover',
//                       }}
//                     />
//                   )}

//                   <CardContent sx={{ flexGrow: 1 }}>
//                     {/* Description */}
//                     <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                       {blog.description}
//                     </Typography>

//                     {/* Edit/Delete Buttons */}
//                     {userEmail && blog.email === userEmail && (
//                       <Box display="flex" justifyContent="space-between" mt={2}>
//                         <IconButton onClick={() => handleDelete(blog.id)}>
//                           <DeleteIcon />
//                         </IconButton>
//                         <IconButton onClick={() => navigate(`/update/${blog.id}`)}>
//                           <EditIcon />
//                         </IconButton>
//                       </Box>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           <Box display="flex" justifyContent="center" mt={4}>
//             <Pagination
//               count={Math.ceil(userBlogData.length / blogsPerPage)}
//               page={currentPage}
//               onChange={handleChangePage}
//             />
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Show;



































// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
// import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Pagination,
//   Box,
//   IconButton,
// } from '@mui/material';

// const Show = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error, userBlogData } = useSelector((state) => state.UserBlog);
//   const userEmail = useSelector((state) => state.auth?.user?.email); // Logged-in user email

//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 4;

//   useEffect(() => {
//     dispatch(fetchBlog());
//   }, [dispatch]);

//   const handleDelete = (id) => dispatch(deleteBlog(id));

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = userBlogData.slice(indexOfFirstBlog, indexOfLastBlog);
//   const handleChangePage = (e, value) => setCurrentPage(value);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         Sports Blog
//       </Typography>

//       {isLoading ? (
//         <Typography variant="body1" align="center" sx={{ mt: 4 }}>
//           Loading blogs...
//         </Typography>
//       ) : error ? (
//         <Typography variant="body1" align="center" color="error" sx={{ mt: 4 }}>
//           {error}
//         </Typography>
//       ) : (
//         <>
//           <Grid container spacing={3}>
//             {currentBlogs.map((blog) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//                 <Card
//                   sx={{
//                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//                     borderRadius: 2,
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//                       {blog.title}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {blog.description}
//                     </Typography>

//                     {userEmail && blog.email === userEmail && (
//                       <Box display="flex" justifyContent="space-between" mt={2}>
//                         <IconButton onClick={() => handleDelete(blog.id)}>
//                           <DeleteIcon />
//                         </IconButton>
//                         <IconButton onClick={() => navigate(`/update/${blog.id}`)}>
//                           <EditIcon />
//                         </IconButton>
//                       </Box>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           <Box display="flex" justifyContent="center" mt={4}>
//             <Pagination
//               count={Math.ceil(userBlogData.length / blogsPerPage)}
//               page={currentPage}
//               onChange={handleChangePage}
//             />
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Show;




















// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
// import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { Container, Typography, Card, CardContent, Grid, Pagination, Box, IconButton } from '@mui/material';

// const Show = () => {
//   const dispatch = useDispatch();
//   const { isLoading, error, userBlogData } = useSelector((state) => state.UserBlog);
//   const userEmail = useSelector(state => state.auth?.user?.email); // <-- get logged-in user email
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 4;

//   useEffect(() => {
//     dispatch(fetchBlog());
//   }, [dispatch]);

//   const handleDelete = (id) => dispatch(deleteBlog(id));

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = userBlogData.slice(indexOfFirstBlog, indexOfLastBlog);
//   const handleChangePage = (e, value) => setCurrentPage(value);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Sports Blog</Typography>
//       <Grid container spacing={3}>
//         {currentBlogs.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//             <Card sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{blog.title}</Typography>
//                 <Typography variant="body2" color="textSecondary">{blog.description}</Typography>
//                 {blog.email === userEmail && ( // <-- show buttons only if current user is the blog owner
//                   <Box display="flex" justifyContent="space-between" mt={2}>
//                     <IconButton onClick={() => handleDelete(blog.id)}><DeleteIcon /></IconButton>
//                     <IconButton onClick={() => navigate(`/update/${blog.id}`)}><EditIcon /></IconButton>
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Box display="flex" justifyContent="center" mt={4}>
//         <Pagination
//           count={Math.ceil(userBlogData.length / blogsPerPage)}
//           page={currentPage}
//           onChange={handleChangePage}
//         />
//       </Box>
//     </Container>
//   );
// };

// export default Show;

























// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
// import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Pagination,
//   Box,
//   IconButton,
// } from '@mui/material';

// const Show = () => {
//   const dispatch = useDispatch();
//   const { isLoading, error, userBlogData } = useSelector((state) => state.UserBlog);
//   const navigate = useNavigate();

//   const [currentPage, setCurrentPage] = useState(1); // Pagination state
//   const blogsPerPage = 4; // Number of blogs per page

//   useEffect(() => {
//     dispatch(fetchBlog());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteBlog(id));
//   };

//   // Pagination logic
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = userBlogData.slice(indexOfFirstBlog, indexOfLastBlog);

//   const handleChangePage = (event, value) => {
//     setCurrentPage(value);
//   };

//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography variant="h6" color="textSecondary">
//           Loading...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography variant="h6" color="error">
//           Error: {error}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: 'center',
//           marginBottom: 4,
//           fontWeight: 'bold',
//           color: '#004d40',
//           textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
//         }}
//       >
//         Sports Blog
//       </Typography>

//       <Grid container spacing={3}>
//         {currentBlogs.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={blog.id}>
//             <Card
//               sx={{
//                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//                 borderRadius: 2,
//                 transition: 'transform 0.3s ease-in-out',
//                 '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)' },
//               }}
//             >
//               <CardContent>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   sx={{ fontWeight: 'bold', color: '#004d40' }}
//                 >
//                   {blog.title}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//                   {blog.description}
//                 </Typography>
//                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                   <IconButton
//                     variant="outlined"
//                     color="error"
//                     // startIcon={<DeleteIcon />}
//                     onClick={() => handleDelete(blog.id)}
//                     sx={{ fontSize: '1.5rem', padding: '6px' }} // Icon only with size adjustment
//                   ><DeleteIcon /></IconButton>
//                   <IconButton
//                     variant="contained"
//                     color="primary"
//                     onClick={() => navigate(`/update/${blog.id}`)}
//                     sx={{ fontSize: '1.5rem', padding: '6px' }} // Icon only with size adjustment
//                   >
//                     <EditIcon />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Pagination */}
//       <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
//         <Pagination
//           count={Math.ceil(userBlogData.length / blogsPerPage)}
//           page={currentPage}
//           onChange={handleChangePage}
//           color="primary"
//           sx={{
//             '& .MuiPaginationItem-root': {
//               fontSize: '1rem',
//             },
//           }}
//         />
//       </Box>
//     </Container>
//   );
// };

// export default Show;







































// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
// import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Button,
//   Pagination,
//   Box,
// } from '@mui/material';

// const Show = () => {
//   const dispatch = useDispatch();
//   const { isLoading, error, userBlogData } = useSelector((state) => state.UserBlog);
//   const navigate = useNavigate();

//   const [currentPage, setCurrentPage] = useState(1); // Pagination state
//   const blogsPerPage = 4; // Number of blogs per page

//   useEffect(() => {
//     dispatch(fetchBlog());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteBlog(id));
//   };

//   // Pagination logic
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = userBlogData.slice(indexOfFirstBlog, indexOfLastBlog);

//   const handleChangePage = (event, value) => {
//     setCurrentPage(value);
//   };

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: "center",
//           marginBottom: "33px",
//           fontWeight: "bold",
//           color: "#004d40",
//           textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//         }}
//       >
//           Sports Blog
//         </Typography>
//         <Grid container spacing={2} >
//           {currentBlogs.map((blog) => (
//             <Grid item xs={12} sm={6} md={3} key={blog.id}>
//               <Card
//                 sx={{
//                   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//                   borderRadius: 2,
//                   transition: 'transform 0.3s ease-in-out',
//                   '&:hover': { transform: 'scale(1.03)' },
//                 }}
//               >
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     gutterBottom
//                     sx={{ fontWeight: 'bold' }}
//                   >
//                     {blog.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {blog.description}
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => handleDelete(blog.id)}
//                     sx={{ mt: 1, mr: 1 }}
//                   >
//                   </Button>
//                   <Button
//                     variant="contained"
//                     onClick={() => navigate(`/update/${blog.id}`)}
//                     sx={{ mt: 1 }}
//                   >
//                     Edit
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         {/* Pagination */}
//         <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
//           <Pagination
//             count={Math.ceil(userBlogData.length / blogsPerPage)}
//             page={currentPage}
//             onChange={handleChangePage}
//             color="primary"
//           />
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default Show;
















// // import React, { useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
// // import { useNavigate } from 'react-router-dom';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import {
// //   Container,
// //   Typography,
// //   Card,
// //   CardContent,
// //   Grid,
// //   Button,
  
// // } from '@mui/material';
// // const Show = () => {
// //   const dispatch = useDispatch(); 
// //   const {isLoading,error,userBlogData} = useSelector((state) => {
// //     console.log("State value",state.UserBlog.userBlogData
// // );
    
// //     return state.UserBlog
// // }); 
// //   // console.log("State in show",state)
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     dispatch(fetchBlog());
// //   }, [dispatch]);

// //   const handleDelete = (id) => {
// //     dispatch(deleteBlog(id));
// //   };

// //   if (isLoading) {
// //     return <p>Loading...</p>
// //   }

// //   if (error) {
// //     return <p>Error: {error}</p>
// //   }

// //   return (
// //     <div>
// //     <Container maxWidth="md" sx={{ py: 4 }}>
// //       <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
// //         Sports Blog
// //       </Typography>
// //       <Grid container spacing={3}>
// //         {userBlogData.map((blog) => (
// //           <Grid item xs={12} sm={6} md={4} key={blog.id}>
// //             <Card
// //               sx={{
// //                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
// //                 borderRadius: 2,
// //                 transition: 'transform 0.3s ease-in-out',
// //                 '&:hover': { transform: 'scale(1.03)' },
// //               }}
// //             >
// //               <CardContent>
// //                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
// //                   {blog.title}
// //                 </Typography>
// //                 <Typography variant="body2" color="textSecondary">
// //                   {blog.description}
// //                 </Typography>
// //                 <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(blog.id)}>
// //                   Delete
// //                 </Button>
// //                 <Button variant="contained" onClick={() => navigate(`/update/${blog.id}`)}>
// //                   Edit
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
      
// //     </Container>
        
// //     </div>
// //   );
// // };

// // export default Show;













































// // import React, { useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { fetchBlog, deleteBlog } from '../Redux/Slice/UserBlogSlice';
// // import { useNavigate } from 'react-router-dom';
// // import { Container } from '@mui/material';

// // const Show = () => {
// //   const dispatch = useDispatch();
// //   // const { userBlogData, isLoading, error } = useSelector((state) => console.log("State for show user blog",state.UserBlog)); 
// //   const {isLoading,error,userBlogData} = useSelector((state) => {
// //     console.log("State value",state.UserBlog.userBlogData
// // );
    
// //     return state.UserBlog
// // }); 
// //   // console.log("State in show",state)
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     dispatch(fetchBlog());
// //   }, [dispatch]);

// //   const handleDelete = (id) => {
// //     dispatch(deleteBlog(id));
// //   };

// //   if (isLoading) {
// //     return <p>Loading...</p>
// //   }

// //   if (error) {
// //     return <p>Error: {error}</p>
// //   }

// //   return (
// //     <div>
// //     <Container>
// //       <h2>Todo List</h2>
// //       <button onClick={() => navigate('/add')}>Add New Todo</button>
// //       <table border="1">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Title</th>
// //             <th>Description</th>
// //             <th>Operations</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {userBlogData.length > 0 ? (
// //             userBlogData.map((todo) => (
// //               <tr key={todo.id}>
// //                 <td>{todo.id}</td>
// //                 <td>{todo.title}</td>
// //                 <td>{todo.description}</td>
// //                 <td>
// //                   <button onClick={() => navigate(`/update/${todo.id}`)}>Edit</button>
// //                   <button onClick={() => handleDelete(todo.id)}>Delete</button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="4">No todos available</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table> 
// //     </Container>
        
// //     </div>
// //   );
// // };

// // export default Show;
