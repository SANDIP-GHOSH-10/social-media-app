import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    Box, Card, CardContent, CardMedia, Typography,
    Grid, Container, CircularProgress, Avatar, Divider, Stack
} from '@mui/material';
import { fetchAllPlayers } from '../Redux/Slice/PlayersSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState("");

    const loggedInUser = useSelector((state) => state.auth.user);
    const { isLoading, error, Allplayers } = useSelector((state) => state.players);

    useEffect(() => {
        if (!loggedInUser) {
            Swal.fire({
                icon: 'warning',
                title: 'Unauthorized',
                text: 'Please log in to view your profile.',
                confirmButtonText: 'OK',
            }).then(() => navigate("/login"));
        }
    }, [loggedInUser, navigate]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get("search") || "";
        setSearchQuery(query);
    }, [location.search]);

    useEffect(() => {
        dispatch(fetchAllPlayers());
    }, [dispatch]);

    if (!loggedInUser) return null;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress size={80} thickness={4} />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    const userPosts = Allplayers.filter((player) => player.email === loggedInUser.email);

    return (
        <Container sx={{ mt: 5, mb: 5 }}>
            {/* Profile Header */}
            <Stack direction="row" spacing={3} alignItems="center" mb={4}>
                <Avatar
                    alt={loggedInUser.name}
                    src={loggedInUser.profileImage}
                    sx={{ width: 100, height: 100, fontSize: 36, bgcolor: "primary.main" }}
                >
                    {loggedInUser.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <Box>
                    <Typography variant="h4" fontWeight={600}>
                        {loggedInUser.name || "User"}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {loggedInUser.email}
                    </Typography>
                </Box>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            {/* User's Posts */}
            <Typography variant="h5" fontWeight={500} gutterBottom>
                Your Posts
            </Typography>

            {userPosts.length === 0 ? (
                <Typography color="text.secondary">No posts found.</Typography>
            ) : (
                <Grid container spacing={4}>
                    {userPosts.map((player) => (
                        <Grid item xs={12} sm={6} md={4} key={player.id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={player.image || "https://via.placeholder.com/180"}
                                    alt={player.playerName}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent>
                                    
                                    <Typography variant="body2" color="text.secondary" mt={1}>
                                        {player.description || "No description provided."}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}






























// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//     Box, Card, CardActions, CardContent, CardMedia, Button, Typography,
//     Grid, Container, CircularProgress, Avatar
// } from '@mui/material';
// import { fetchAllPlayers } from '../Redux/Slice/PlayersSlice';

// export default function Profile() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [searchQuery, setSearchQuery] = useState("");

//     // Get logged-in user from Redux
//     const loggedInUser = useSelector((state) => state.auth.user);
//     const { isLoading, error, Allplayers } = useSelector((state) => state.players);

//     // Redirect if not logged in
//     useEffect(() => {
//         if (!loggedInUser) {
//             alert("Please log in to view your profile.");
//             navigate("/login");
//         }
//     }, [loggedInUser, navigate]);

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const query = queryParams.get("search") || "";
//         setSearchQuery(query);
//     }, [location.search]);

//     useEffect(() => {
//         dispatch(fetchAllPlayers());
//     }, [dispatch]);

//     if (!loggedInUser) {
//         return null; // Wait until redirect
//     }

//     if (isLoading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                 <CircularProgress size={80} thickness={4} />
//             </Box>
//         );
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     // Filter posts by logged-in user's email
//     const userPosts = Allplayers.filter((player) => player.email === loggedInUser.email);

//     return (
//         <Container sx={{ mt: 4 }}>
//             {/* Profile Info with Image */}
//             <Box mb={5} display="flex" alignItems="center" gap={3}>
//                 {loggedInUser.profileImage ? (
//                     <Avatar
//                         alt={loggedInUser.name}
//                         src={loggedInUser.profileImage}
//                         sx={{ width: 90, height: 90 }}
//                     />
//                 ) : (
//                     <Avatar sx={{ width: 90, height: 90, bgcolor: "primary.main" }}>
//                         {loggedInUser.name?.charAt(0).toUpperCase() || "U"}
//                     </Avatar>
//                 )}

//                 <Box>
//                     <Typography variant="h5" fontWeight={600}>
//                         {loggedInUser.name || "User"}
//                     </Typography>
//                     <Typography color="text.secondary">{loggedInUser.email}</Typography>
//                 </Box>
//             </Box>

//             {/* User's Posts */}
//             <Typography variant="h6" gutterBottom>
//                 Your Posts
//             </Typography>

//             {userPosts.length === 0 ? (
//                 <Typography>No posts found.</Typography>
//             ) : (
//                 <Grid container spacing={3}>
//                     {userPosts.map((player) => (
//                         <Grid item xs={12} sm={6} md={4} key={player.id}>
//                             <Card>
//                                 <CardMedia
//                                     component="img"
//                                     height="140"
//                                     image={player.image || "https://via.placeholder.com/140"}
//                                     alt={player.playerName}
//                                 />
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h6">
//                                         {player.playerName}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {player.description}
//                                     </Typography>
//                                 </CardContent>
                                
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </Container>
//     );
// }




































// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//     Box, Card, CardActions, CardContent, CardMedia, Button, Typography,
//     Grid, Container, CircularProgress, Avatar, Stack
// } from '@mui/material';
// import { fetchAllPlayers } from '../Redux/Slice/PlayersSlice';

// export default function Profile() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [searchQuery, setSearchQuery] = useState("");

//     // Auth user from Redux
//     const loggedInUser = useSelector((state) => state.auth.user);
//     const { isLoading, error, Allplayers } = useSelector((state) => state.players);

//     // Redirect if not logged in
//     useEffect(() => {
//         if (!loggedInUser) {
//             alert("Please log in to view your profile.");
//             navigate("/login");
//         }
//     }, [loggedInUser, navigate]);

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const query = queryParams.get("search") || "";
//         setSearchQuery(query);
//     }, [location.search]);

//     useEffect(() => {
//         dispatch(fetchAllPlayers());
//     }, [dispatch]);

//     if (!loggedInUser) {
//         return null; // Prevents rendering until redirect completes
//     }

//     if (isLoading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//                 <CircularProgress size={80} thickness={4} />
//             </Box>
//         );
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     // Filter posts by logged-in user email
//     const userPosts = Allplayers.filter((player) => player.email === loggedInUser.email);

//     return (
//         <Container sx={{ mt: 4 }}>
//             {/* Profile Info */}
//             <Box mb={5} display="flex" alignItems="center" gap={3}>
//                 <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
//                     {loggedInUser.name?.charAt(0).toUpperCase() || "U"}
//                 </Avatar>
//                 <Box>
//                     <Typography variant="h5" fontWeight={600}>{loggedInUser.name || "User"}</Typography>
//                     <Typography color="text.secondary">{loggedInUser.email}</Typography>
//                 </Box>
//             </Box>

//             {/* User's Posts */}
//             <Typography variant="h6" gutterBottom>
//                 Your Posts
//             </Typography>

//             {userPosts.length === 0 ? (
//                 <Typography>No posts found.</Typography>
//             ) : (
//                 <Grid container spacing={3}>
//                     {userPosts.map((player) => (
//                         <Grid item xs={12} sm={6} md={4} key={player.id}>
//                             <Card>
//                                 <CardMedia
//                                     component="img"
//                                     height="140"
//                                     image={player.image || "https://via.placeholder.com/140"}
//                                     alt={player.playerName}
//                                 />
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h6">
//                                         {player.playerName}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {player.description}
//                                     </Typography>
//                                 </CardContent>
//                                 <CardActions>
//                                     <Button size="small">Edit</Button>
//                                     <Button size="small">Delete</Button>
//                                 </CardActions>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </Container>
//     );
// }

























// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import { Box, CircularProgress, Container } from '@mui/material';
// import { fetchAllPlayers } from '../Redux/Slice/PlayersSlice';
// import Rating from '@mui/material/Rating';

// export default function Profile() {
//     const dispatch = useDispatch();
    
//     // Redux: Assuming auth slice has user object with email
//     const loggedInUser = useSelector((state) => state.auth.user); 
//     const { isLoading, error, Allplayers } = useSelector((state) => state.players);

//     const location = useLocation();
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const query = queryParams.get("search") || "";
//         setSearchQuery(query);
//     }, [location.search]);

//     useEffect(() => {
//         dispatch(fetchAllPlayers());
//     }, [dispatch]);

//     if (isLoading) {
//         return (
//             <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" >
//                 <CircularProgress color="primary" size={80} thickness={5} sx={{ mb: 2 }} />
//                 <Typography variant="h6" color="textSecondary">
//                     Loading, please wait...
//                 </Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     // Filter posts by logged-in user email
//     const userPosts = Allplayers.filter(
//         (player) => player.email === loggedInUser?.email
//     );

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Your Profile
//             </Typography>

//             {userPosts.length === 0 ? (
//                 <Typography variant="body1">No posts found.</Typography>
//             ) : (
//                 <Grid container spacing={3}>
//                     {userPosts.map((player) => (
//                         <Grid item xs={12} sm={6} md={4} key={player.id}>
//                             <Card>
//                                 <CardMedia
//                                     component="img"
//                                     height="140"
//                                     image={player.image}
//                                     alt={player.playerName}
//                                 />
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h5" component="div">
//                                         {player.playerName}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {player.description}
//                                     </Typography>
//                                 </CardContent>
                                
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </Container>
//     );
// }
