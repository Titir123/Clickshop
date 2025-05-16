import Link from "next/link";
import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Stack
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone
} from '@mui/icons-material';

const Footer = () => {
  return (
    <footer>
      <Box sx={{ bgcolor: '#1e1e2f', color: 'white', pt: 6, pb: 4 }} component="footer">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Brand + Newsletter */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" color="skyblue" gutterBottom>
                ClickShop
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Your one-stop shop for everything you need. Sign up for exclusive offers!
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder="Email address"
                  variant="outlined"
                  sx={{ bgcolor: 'white', borderRadius: 1, flexGrow: 1 }}
                />
                <Button variant="contained" color="primary">
                  Subscribe
                </Button>
              </Stack>
            </Grid>

            {/* Customer Service */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" color="skyblue" gutterBottom>
                Customer Service
              </Typography>
              <Link href="#" passHref>
                <Typography component="a" sx={{ color: 'white', textDecoration: 'none', display: 'block', mb: 1 }}>
                  Help Center
                </Typography>
              </Link>
              <Link href="#" passHref>
                <Typography component="a" sx={{ color: 'white', textDecoration: 'none', display: 'block', mb: 1 }}>
                  Returns
                </Typography>
              </Link>
              <Link href="#" passHref>
                <Typography component="a" sx={{ color: 'white', textDecoration: 'none', display: 'block' }}>
                  Track Order
                </Typography>
              </Link>
                 <Link href="#" passHref>
                <Typography component="a" sx={{ color: 'white', textDecoration: 'none', display: 'block' }}>
                  Wishlist
                </Typography>
              </Link>
            </Grid>

            {/* My Account */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" color="skyblue" gutterBottom>
                Online Shopping
              </Typography>
              <Link href="#" passHref>
                <Typography component="a" sx={{ color: 'white', textDecoration: 'none', display: 'block', mb: 1 }}>
                  Men
                </Typography>
              </Link>
              <Link href="#" passHref>
                <Typography component="a" sx={{ color: 'white', textDecoration: 'none', display: 'block', mb: 1 }}>
                  Women
                </Typography>
              </Link>
              <Link href="#" passHref>
                <Typography component="a" sx={{ color: 'white', textDecoration: 'none', display: 'block' }}>
                  Jewellery
                </Typography>
              </Link>
               <Link href="#" passHref>
                <Typography component="a" sx={{ color: 'white', textDecoration: 'none', display: 'block' }}>
                  Electronics
                </Typography>
              </Link>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={2}>
              <Typography variant="h6" color="skyblue" gutterBottom>
                Contact Us
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Phone fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">+1 800 123 4567</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Email fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">support@clickshop.com</Typography>
              </Box>
            </Grid>

            {/* Socials */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" color="skyblue" gutterBottom>
                Follow Us
              </Typography>
              <Box>
                <IconButton href="#" color="inherit"><Facebook /></IconButton>
                <IconButton href="#" color="inherit"><Twitter /></IconButton>
                <IconButton href="#" color="inherit"><Instagram /></IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box textAlign="center" mt={4} pt={3} borderTop="1px solid rgba(255,255,255,0.1)">
          <Typography variant="body2" color="white">
            &copy; {new Date().getFullYear()} ClickShop. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
