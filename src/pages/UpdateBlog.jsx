import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { singleBlog, updateBlog } from "../Redux/Slice/UserBlogSlice";

const UpdateBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, selectedBlog } = useSelector(
    (state) => state.UserBlog
  );
  const userEmail = useSelector((state) => state.auth?.user?.email);

  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(singleBlog(id)).then((res) => {
      const blog = res.payload;
      setImage(blog.image || "");
      setDescription(blog.description || "");
    });
  }, [dispatch, id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image && description && userEmail) {
      dispatch(
        updateBlog({
          id,
          updatedBlog: {
            image,
            description,
            email: userEmail,
          },
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      });
    } else {
      alert("Missing image/description or user not logged in.");
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography variant="h4" color="error">
          {error}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("Asset/update.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
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
      />
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 3,
          position: 'relative',
          zIndex: 2,
          bgcolor: 'rgba(255, 255, 255, 0.5)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1565c0' }}>
          Update Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <Button variant="outlined" component="label" fullWidth sx={{ my: 2 }}>
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>

          {image && (
            <Box sx={{ mt: 2 }}>
              <img src={image} alt="Preview" style={{ width: '100%', borderRadius: 8 }} />
            </Box>
          )}

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Update Blog
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateBlog;



























// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { singleBlog, updateBlog } from "../Redux/Slice/UserBlogSlice";

// const UpdateBlog = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isLoading, error, selectedBlog } = useSelector(
//     (state) => state.UserBlog
//   );
//   const userEmail = useSelector((state) => state.auth?.user?.email);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     dispatch(singleBlog(id)).then((res) => {
//       const blog = res.payload;
//       setTitle(blog.title);
//       setDescription(blog.description);
//     });
//   }, [dispatch, id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (title && description && userEmail) {
//       dispatch(
//         updateBlog({
//           id,
//           updatedBlog: {
//             title,
//             description,
//             email: userEmail,
//           },
//         })
//       ).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           navigate("/");
//         }
//       });
//     } else {
//       alert("Missing title/description or user not logged in.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box textAlign="center" mt={6}>
//         <Typography variant="h4" color="error">
//           {error}
//         </Typography>
//         <Button variant="contained" onClick={() => navigate("/")}>
//           Back
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box component="form" onSubmit={handleSubmit} maxWidth={500} mx="auto" mt={6}>
//       <Typography variant="h4" gutterBottom>
//         Update Blog
//       </Typography>
//       <TextField
//         fullWidth
//         label="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         margin="normal"
//       />
//       <TextField
//         fullWidth
//         label="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         margin="normal"
//         multiline
//         rows={4}
//       />
//       <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//         Update
//       </Button>
//     </Box>
//   );
// };

// export default UpdateBlog;


































// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { singleBlog, updateBlog } from "../Redux/Slice/UserBlogSlice";

// const UpdateBlog = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isLoading, error, selectedBlog } = useSelector(
//     (state) => state.UserBlog
//   );
//   const userEmail = useSelector((state) => state.auth?.user?.email);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     dispatch(singleBlog(id)).then((res) => {
//       const blog = res.payload;
//       setTitle(blog.title);
//       setDescription(blog.description);
//     });
//   }, [dispatch, id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (title && description && userEmail) {
//       dispatch(
//         updateBlog({
//           id,
//           updatedBlog: {
//             title,
//             description,
//             email: userEmail, // ✅ include email here!
//           },
//         })
//       ).then((res) => {
//         if (res.meta.requestStatus === "fulfilled") {
//           navigate("/");
//         }
//       });
//     } else {
//       alert("Missing title/description or user not logged in.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", marginTop: "50px" }}>
//         <Typography variant="h4" color="error">
//           {error}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate("/")}
//         >
//           Back
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ maxWidth: 500, mx: "auto", mt: 6 }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Update Blog
//       </Typography>
//       <TextField
//         fullWidth
//         label="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         margin="normal"
//       />
//       <TextField
//         fullWidth
//         label="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         margin="normal"
//         multiline
//         rows={4}
//       />
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         sx={{ mt: 2 }}
//       >
//         Update
//       </Button>
//     </Box>
//   );
// };

// export default UpdateBlog;


























// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { singleBlog, updateBlog } from "../Redux/Slice/UserBlogSlice";

// const UpdateBlog = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isLoading, error, selectedBlog } = useSelector(
//     (state) => state.UserBlog
//   );

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     dispatch(singleBlog(id)).then((res) => {
//       setTitle(res.payload.title);
//       setDescription(res.payload.description);
//     });
//   }, [dispatch, id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedBlog = {
//       title,
//       description,
//       updatedAt: new Date().toISOString(), // Add updatedAt field
//     };

//     dispatch(updateBlog({ id, updatedBlog }));
//     navigate("/");
//   };

//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", marginTop: "50px" }}>
//         <Typography variant="h4" color="error">
//           {error}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate("/")}
//         >
//           Back
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "auto", mt: 6 }}>
//       <Typography variant="h4" gutterBottom>Edit Blog</Typography>
//       <TextField
//         fullWidth
//         label="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         margin="normal"
//         required
//       />
//       <TextField
//         fullWidth
//         label="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         margin="normal"
//         multiline
//         rows={4}
//         required
//       />
//       <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//         Update
//       </Button>
//     </Box>
//   );
// };

// export default UpdateBlog;




















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { singleBlog, updateBlog } from "../Redux/Slice/UserBlogSlice";

// const UpdateBlog = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isLoading, error, selectedBlog } = useSelector(
//     (state) => state.UserBlog
//   );

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     dispatch(singleBlog(id)).then((res) => {
//       setTitle(res.payload.title);
//       setDescription(res.payload.description);
//     });
//   }, [dispatch, id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedBlog = {
//       title,
//       description,
//       updatedAt: new Date().toISOString(), // Add updatedAt field
//     };

//     dispatch(updateBlog({ id, updatedBlog }));
//     navigate("/");
//   };

//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", marginTop: "50px" }}>
//         <Typography variant="h4" color="error">
//           {error}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate("/")}
//         >
//           Back
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "auto", mt: 6 }}>
//       <Typography variant="h4" gutterBottom>Edit Blog</Typography>
//       <TextField
//         fullWidth
//         label="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         margin="normal"
//         required
//       />
//       <TextField
//         fullWidth
//         label="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         margin="normal"
//         multiline
//         rows={4}
//         required
//       />
//       <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//         Update
//       </Button>
//     </Box>
//   );
// };

// export default UpdateBlog;


















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button, TextField, Box, Typography, CircularProgress } from "@mui/material";
// import { singleBlog, updateBlog } from "../Redux/Slice/UserBlogSlice";

// const UpdateBlog = () => {
//     const { id } = useParams();
//     // console.log("Id", id);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     let { isLoading, error, todovalue } = useSelector((state) => {
//         console.log("state value", state.UserBlog);
//         return state.UserBlog
//     });


//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");


//     useEffect(() => {
//         dispatch(singleBlog(id)).then(res => {
//             // console.log("Res", res);
//             setTitle(res.payload.title);
//             setDescription(res.payload.description);

//         }).catch(err => {


//         });
//     }, [dispatch]);

    


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // let formdata = {
//         //     id, title, description
//         // }
//         // dispatch(updateTodo(formdata))
//         // console.log("Res data:", title, description);

//         if (title && description) {
//             dispatch(updateBlog({ id,title, description }));
//             navigate('/'); 
//            console.log("Res data:", title, description);
//           }
//     };

//     // Render a loading spinner if data is being fetched
//     if (isLoading) {
//         return (
//             <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     // Render an error message if the item is not found
//     if (error) {
//         return (
//             <Box sx={{ textAlign: "center", marginTop: "50px" }}>
//                 <Typography variant="h4" color="error">
//                     {error}
//                 </Typography>
//                 <Button variant="contained" color="primary" onClick={() => navigate("/todo-page")}>
//                     Back to Todo Page
//                 </Button>
//             </Box>
//         );
//     }

//     return (

//         <>
//             <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "auto", marginTop: "50px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Edit Item
//             </Typography>
//             <TextField
//                 fullWidth
//                 label="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 margin="normal"
//             />
//             <TextField
//                 fullWidth
//                 label="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 margin="normal"
//                 multiline
//                 rows={4}
//             />
//             <Button type="submit" variant="contained" color="primary" sx={{ marginTop: "20px" }}>
//                 Update
//             </Button>
//         </Box>
//         </>
        
//     );
// };

// export default UpdateBlog;
