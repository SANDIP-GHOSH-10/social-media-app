import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GroupIcon from '@mui/icons-material/Group'; // Changed from SportsCricketIcon

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        color: '#fff',
        py: 4,
        mt: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <GroupIcon sx={{ fontSize: 40, color: '#2a9d8f', mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                SocialMedia
              </Typography>
            </Box>
            <Typography variant="body2">
              Connect. Share. Engage. SocialMedia lets you stay in touch with your friends, discover new content, and build your online presence in a vibrant community.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="/about" underline="hover" sx={{ color: '#fff', display: 'block', mb: 1 }}>
                About Us
              </Link>
              <Link href="/blog" underline="hover" sx={{ color: '#fff', display: 'block', mb: 1 }}>
                Blog
              </Link>
              <Link href="/contactus" underline="hover" sx={{ color: '#fff', display: 'block', mb: 1 }}>
                Contact Us
              </Link>
              <Link href="/privacy" underline="hover" sx={{ color: '#fff', display: 'block', mb: 1 }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <YouTubeIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              © {new Date().getFullYear()} SocialMedia. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;









