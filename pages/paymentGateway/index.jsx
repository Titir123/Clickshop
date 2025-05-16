import { useDispatch } from 'react-redux';
import { clearCart } from '@/toolkit/cartSlice'; // adjust the import path
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

export default function PaymentGateway() {
  const [status, setStatus] = useState('processing');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const res = await fetch('/api/payment');
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          dispatch(clearCart()); // ✅ Clear cart on payment success
        } else {
          setStatus('failure');
          setErrorMsg(data.message || 'Something went wrong.');
        }
      } catch (err) {
        setStatus('failure');
        setErrorMsg('Network error. Please try again.');
      }
    };

    initiatePayment();
  }, [dispatch]);

  const renderContent = () => {
    if (status === 'processing') {
      return (
        <>
          <CircularProgress />
          <Typography variant="h6" mt={2}>Processing your payment...</Typography>
        </>
      );
    } else if (status === 'success') {
      return (
        <>
          <Typography variant="h4" color="success.main" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" mb={3}>
            Thank you for your purchase. Your order has been placed.
          </Typography>
          <Button variant="contained" onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="h4" color="error.main" gutterBottom>
            Payment Failed!
          </Typography>
          <Typography variant="body1" mb={3}>
            {errorMsg}
          </Typography>
          <Button variant="contained" onClick={() => router.push('/')}>
            Try Again / Back to Cart
          </Button>
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      {renderContent()}
    </Box>
  );
}

