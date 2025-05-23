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








