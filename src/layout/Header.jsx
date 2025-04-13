
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










































// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";  
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Stack from "@mui/material/Stack";
// import SportsCricketIcon from "@mui/icons-material/SportsCricket";
// import { logoutUser } from "../Redux/Slice/AuthSlice";  
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// const Header = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openModal, setOpenModal] = useState(false); 
//   const user = useSelector((state) => state.auth.user);  
//   const dispatch = useDispatch();

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());  
//     setOpenModal(false); 
//   };

//   const handleUserClick = () => {
//     setOpenModal(true);  
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false); 
//   };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About Us", path: "/about" },
//     { name: "Players", path: "/players" },
//     { name: "Add Blogs", path: "/add-blog" },
//     { name: "Contact", path: "/contactus" },
//   ];

//   return (
//     <>
//       <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #2a9d8f 0%, #264653 100%)" }}>
//         <Container maxWidth="lg">
//           <Toolbar disableGutters>
//             <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
//               <SportsCricketIcon sx={{ fontSize: 40, color: "#4caf50", mr: 1 }} />
//               <Typography
//                 variant="h5"
//                 component={Link}
//                 to="/"
//                 sx={{
//                   fontWeight: "bold",
//                   color: "inherit",
//                   textDecoration: "none",
//                   display: { xs: "none", md: "block" },
//                 }}
//               >
//                 CricketZone
//               </Typography>
//             </Box>

//             {/* Mobile Menu Icon */}
//             <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//               <IconButton size="large" aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenuOpen} color="inherit">
//                 <MenuIcon />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 sx={{
//                   display: { xs: "block", md: "none" },
//                 }}
//               >
//                 {navLinks.map((link) => (
//                   <MenuItem key={link.name} onClick={handleMenuClose} component={Link} to={link.path} sx={{ fontWeight: 600 }}>
//                     {link.name}
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>

//             {/* Navigation Links (Desktop) */}
//             <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//               {navLinks.map((link) => (
//                 <Button key={link.name} component={Link} to={link.path} sx={{ my: 2, color: "white", fontWeight: 600, "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } }}>
//                   {link.name}
//                 </Button>
//               ))}
//             </Box>

//             {/* Conditional Rendering of Login/Register or User Info */}
//             <Stack direction="row" spacing={2}>
//               {user ? (
//                 <>
//                   {/* <Button variant="outlined" color="secondary" onClick={handleUserClick}>
//                     User
//                   </Button> */}
//                   <IconButton color="inherit" onClick={handleUserClick}>
//                  <AccountCircleIcon />
//               </IconButton>
//                   <Button variant="outlined" color="secondary" onClick={handleLogout}>
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     component={Link}
//                     to="/login"
//                     variant="outlined"
//                     sx={{
//                       color: "white",
//                       borderColor: "white",
//                       "&:hover": {
//                         backgroundColor: "rgba(255, 255, 255, 0.2)",
//                         borderColor: "white",
//                       },
//                     }}
//                   >
//                     Login
//                   </Button>
//                   <Button
//                     component={Link}
//                     to="/register"
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#f50057",
//                       "&:hover": { backgroundColor: "#c51162" },
//                     }}
//                   >
//                     Register
//                   </Button>
//                 </>
//               )}
//             </Stack>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Modal for User Details */}
//       <Dialog 
//   open={openModal} 
//   onClose={handleCloseModal} 
//   sx={{
//     '& .MuiDialog-paper': {
//       borderRadius: 3,
//       padding: 3,
//       backgroundColor: '#f8f9fa', 
//       boxShadow: 24,
//     }
//   }}
// >
//   <DialogTitle 
//     sx={{
//       fontWeight: 'bold',
//       textAlign: 'center',
//       backgroundColor: '#1976d2',
//       color: 'white',
//       padding: 2,
//       borderTopLeftRadius: 12,
//       borderTopRightRadius: 12,
//     }}
//   >
//     User Details
//   </DialogTitle>
//   <DialogContent>
//     {user ? (
//       <Box 
//         sx={{
//           padding: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 1,
//         }}
//       >
        
//         <Typography variant="body1">
//           <strong>Email:</strong> {user.email}
//         </Typography>
//       </Box>
//     ) : (
//       <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray' }}>
//         No user is logged in.
//       </Typography>
//     )}
//   </DialogContent>
//   <DialogActions 
//     sx={{
//       justifyContent: 'center',
//       padding: 2,
//       gap: 2,
//     }}
//   >
//     <Button 
//       onClick={handleCloseModal} 
//       variant="contained" 
//       color="primary"
//       sx={{ borderRadius: 8, paddingX: 3 }}
//     >
//       Close
//     </Button>
//     <Button 
//       onClick={handleLogout} 
//       variant="contained" 
//       color="error"
//       sx={{ borderRadius: 8, paddingX: 3 }}
//     >
//       Logout
//     </Button>
//   </DialogActions>
// </Dialog>

//     </>
//   );
// };

// export default Header;


