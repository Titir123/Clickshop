import React, { useEffect, useMemo, useState } from 'react';
import  useProductList  from '../../customHooks/hooks.query';
import { Box, Button, Card, CardContent, CardMedia, Container, MenuItem, Select, Grid, Typography, TextField, AppBar, Toolbar, IconButton, Menu, MenuItem as NavItem, useMediaQuery, InputBase, Rating } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '@/toolkit/cartSlice';
import { useRouter } from 'next/router';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToWishlist } from '@/toolkit/wishlistSlice';

export default function Index() {
  const { data, isError, isLoading } = useProductList();

  const [sortCriteria, setSortCriteria] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [category, setCategory] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [quantityInputs, setQuantityInputs] = useState({});

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const router = useRouter();
  const { category: queryCategory } = router.query;
  const searchTerm = useSelector((state) => state.search.term);
  const dispatch = useDispatch();
  
  // Update category if URL query changes
  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory);
    }
  }, [queryCategory]);


  const handleCart = (item, quantity) => {
    if (quantity <= 0) return;
    dispatch(
      addCart({
        image: item.image,
        id: item.id,
        title: item.title,
        price: item.price,
        rating: item.rating,
        quantity,
      })
    );
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setAnchorEl(null);
    router.push(`/?category=${encodeURIComponent(newCategory)}`);
  };

  const handleQuantityChange = (id, value) => {
    setQuantityInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

const [hasMounted, setHasMounted] = useState(false);

useEffect(() => {
  setHasMounted(true);
}, []);

const filteredAndSorted = useMemo(() => {
  if (!hasMounted || !data) return [];

  const minPrice = Number(priceRange.min);
  const maxPrice = Number(priceRange.max);
  const normalizedSearch = (searchTerm || "").toLowerCase();

  return data
    .filter((item) => {
      const matchesCategory =
        category === "all" ||
        item.category?.toLowerCase().trim() === category?.toLowerCase().trim();

      const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
      const matchesSearch = item.title?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortCriteria === "priceAsc") return a.price - b.price;
      if (sortCriteria === "priceDesc") return b.price - a.price;
      if (sortCriteria === "rating") return b.rating.rate - a.rating.rate;
      return 0;
    });
}, [hasMounted, data, category, priceRange, searchTerm, sortCriteria]);


  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error</h3>;

  const handleAddToWishlist = (item) => {
  dispatch(
    addToWishlist({
      image: item.image,
      id: item.id,
      title: item.title,
      price: item.price,
      rating: item.rating,
    })
  );
};
if (!hasMounted) return null; // or a loader/spinner if you want

  return (
    <>
      <Container>
        <br />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography>Sort By:</Typography>
            <Select value={sortCriteria} onChange={handleSortChange} displayEmpty>
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <TextField
            label="Min Price"
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Max Price"
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
            variant="outlined"
            size="small"
          />
        </Box>
        <br />

        <h2>Nice to see you</h2>
        <br />
        <Grid container spacing={4}>
  {filteredAndSorted.map((item) => (
    <Grid item key={item.id} xs={12} sm={6} lg={4} xl={3}>
      <Card
        sx={{
          position: 'relative',
          width: '100%',
          height: 450,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            backgroundColor: '#f5f5f5',
          },
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        {/* Link wraps image + content */}
        <Link href={`/products/${item.id}`} passHref legacyBehavior>
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <CardMedia
              component="img"
              height="200"
              image={item.image}
              alt={item.title}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {item.title}
              </Typography>
              <Typography variant="h6" component="div">
                Price: ${item.price}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Rating:
                </Typography>
                <Rating value={item.rating.rate} readOnly />
              </Box>
            </CardContent>
          </a>
        </Link>

        {/* Wishlist button at bottom center on hover */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              opacity: 1,
            },
            '.MuiCard-root:hover &': {
              opacity: 1,
            },
            zIndex: 2,
          }}
        >
          <IconButton
            aria-label="add to wishlist"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToWishlist(item);
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
          <Typography variant="body2" sx={{ color: 'secondary.main' }}>
            Wishlist
          </Typography>
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>

</Container>
      <br />
      <br />
    </>
  );
}






