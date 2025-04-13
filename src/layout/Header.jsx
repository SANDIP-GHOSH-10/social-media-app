
import React, { useState } from "react";
import { Link } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import { useDispatch, useSelector } from "react-redux";  
import {
  AppBar, Toolbar, Typography, IconButton, Menu,
  MenuItem, Box, Button, Container, Stack,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Avatar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logoutUser } from "../Redux/Slice/AuthSlice";  

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false); 
  const user = useSelector((state) => state.auth.user);  
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logoutUser());  
    setOpenModal(false); 
  };
  const handleUserClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "New Post", path: "/post/new" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #2a9d8f 0%, #264653 100%)" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <GroupsIcon sx={{ fontSize: 40, color: "#ffffff", mr: 1 }} />

              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  fontWeight: "bold",
                  color: "inherit",
                  textDecoration: "none",
                  display: { xs: "none", md: "block" },
                }}
              >
                Social Media
              </Typography>
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" onClick={handleMenuOpen} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {navLinks.map((link) => (
                  <MenuItem key={link.name} onClick={handleMenuClose} component={Link} to={link.path} sx={{ fontWeight: 600 }}>
                    {link.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {navLinks.map((link) => (
                <Button key={link.name} component={Link} to={link.path} sx={{ my: 2, color: "white", fontWeight: 600 }}>
                  {link.name}
                </Button>
              ))}
            </Box>

            {/* User Actions */}
            <Stack direction="row" spacing={2} alignItems="center">
              {user ? (
                <>
                  <IconButton onClick={handleUserClick}>
                  {user.profileImage ? (
  <Avatar src={user.profileImage} />

                    ) : (
                      <AccountCircleIcon sx={{ color: "white" }} />
                    )}
                  </IconButton>
                  <Button variant="outlined" color="secondary" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{ backgroundColor: "#f50057", "&:hover": { backgroundColor: "#c51162" } }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Modal for User Info */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#1976d2',
            color: 'white',
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          User Details
        </DialogTitle>
        <DialogContent>
          {user ? (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
             {user.profileImage && (
  <Avatar src={user.profileImage} sx={{ width: 80, height: 80 }} />

              )}
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray' }}>
              No user is logged in.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Close
          </Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;




















