

import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

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
              <SportsCricketIcon sx={{ fontSize: 40, color: '#4caf50', mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                CricketZone
              </Typography>
            </Box>
            <Typography variant="body2">
              Dive into the world of cricket! Stay updated with the latest news, match highlights,
              player stats, and more from the thrilling world of cricket.
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="/about" underline="hover" sx={{ color: '#fff', display: 'block', mb: 1 }}>
                About Us
              </Link>
              <Link href="/" underline="hover" sx={{ color: '#fff', display: 'block', mb: 1 }}>
                Blogs
              </Link>
              <Link
                href="/contactus"
                underline="hover"
                sx={{ color: '#fff', display: 'block', mb: 1 }}
              >
                Contact Us
              </Link>
              <Link href="/privacy" underline="hover" sx={{ color: '#fff', display: 'block', mb: 1 }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
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
              © {new Date().getFullYear()} CricketZone. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
