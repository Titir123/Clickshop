import { removeFromWishlist } from '@/toolkit/wishlistSlice';
import {
  Box, Button, Typography, Card, CardContent, CardMedia,
  Grid, Divider
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item.id));
  };

  if (!isClient) return null;

  return (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" gutterBottom>
      Wishlist
    </Typography>

    {wishlistItems.length === 0 ? (
      <Typography variant="h6" color="text.secondary">
        Your wishlist is empty.
      </Typography>
    ) : (
      <Grid container spacing={2}>
        {wishlistItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, objectFit: 'contain', mr: 2 }}
                  image={item.image}
                  alt={item.title}
                />
                <CardContent sx={{ p: 0 }}>
                  <Link href={`/products/${item.id}`} passHref legacyBehavior>
                    <a style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="subtitle1">{item.title}</Typography>
                    </a>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.price.toFixed(2)} | Rating: {item.rating?.rate}
                  </Typography>
                </CardContent>
              </Box>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}

    <Divider sx={{ my: 4 }} />
  </Box>
);

}
