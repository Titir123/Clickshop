import { deleteCart } from '@/toolkit/cartSlice';
import {
  Box, Button, Typography, Card, CardContent, CardMedia,
  Grid, Divider, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'; 

export default function ShoppingCart() {
  const cartItems = useSelector((state) => state.cart.Shoppingcart);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = (item) => {
    dispatch(deleteCart(item.id));
  };

 

  const router = useRouter();
  
  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    alert(`Redirecting to payment gateway with "${paymentMethod}"...`);
    router.push('/paymentGateway');
  };

  const price = cartItems.reduce((accu, cart) => accu + cart.price * cart.quantity, 0);

  if (!isClient) return null;

 return (
  <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
    <Typography variant="h4" gutterBottom>
      Shopping Cart
    </Typography>

    {cartItems.length === 0 ? (
      <Typography variant="h6" color="text.secondary">
        Your cart is empty.
      </Typography>
    ) : (
      <>
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={item.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'flex-start',
                  height: '100%',
                  p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: '100%', sm: 100 },
                    height: 100,
                    objectFit: 'contain',
                    mb: { xs: 2, sm: 0 },
                    mr: { sm: 2 },
                    borderRadius: 1,
                  }}
                  image={item.image}
                  alt={item.title}
                />
                <Box sx={{ flex: 1 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography
  variant="subtitle1"
  sx={{
    wordBreak: 'break-word',       // Ensures long words wrap
    whiteSpace: 'normal',          // Allows multi-line wrapping
    overflowWrap: 'anywhere',      // Breaks long unbreakable strings
  }}
>
  {item.title}
</Typography>

                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.price.toFixed(2)} | Qty: {item.quantity} | Rating: {item.rating}
                    </Typography>
                  </CardContent>
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ maxWidth: 400, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              value={paymentMethod}
              label="Payment Method"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Net Banking">Net Banking</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" mb={2}>
            Total Price: ${price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            disabled={cartItems.length === 0}
          >
            Make Payment
          </Button>
        </Box>
      </>
    )}
  </Box>
);


}


