import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '@/toolkit/cartSlice';
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography, Rating } from '@mui/material';
import axios from 'axios';

export default function ProductDetails() {
  const router = useRouter();
  const { slug } = router.query; // Get the product slug from the URL
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details based on the slug
  useEffect(() => {

    async function f(){
    if (slug) {
      // Assuming you have a function to fetch product data by slug
      const res = await axios.get(`https://fakestoreapi.com/products/${slug}`)
      setProduct(res.data)
        }
    }
    f();
   
  }, [slug]);

  const handleAddToCart = () => {
    if (quantity <= 0) return;
    dispatch(
      addCart({
        image: product.image,
        id: product.id,
        title: product.title,
        price: product.price,
        rating: product.rating,
        quantity,
      })
    );
    router.push('/cart'); // Redirect to the cart page
  };

  if (!product) return <h3>Loading...</h3>;

  return (
<>
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia component="img" height="300" image={product.image} alt={product.title} />
        <CardContent>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Price: ${product.price}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Rating:
            </Typography>
            <Rating value={product.rating.rate} readOnly />
          </Box>

          {/* Quantity Input */}
          <TextField
            type="number"
            size="small"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            sx={{ mt: 2 }}
          />
        </CardContent>
        <Button onClick={handleAddToCart} variant="contained" color="primary" sx={{ m: 2 }}>
          Add to Cart
        </Button>
      </Card>
    </Box>
    </>
  );
}
