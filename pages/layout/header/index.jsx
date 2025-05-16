import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter } from "next/router";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/toolkit/searchSlice';

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);

  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Sync Redux search term to input when it changes
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  // Debounce input before dispatching
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchTerm(inputValue));
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  const handleCategoryChange = (newCategory) => {
    setAnchorEl(null);
    router.push(`/products?category=${encodeURIComponent(newCategory)}`);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        <Link href="/" passHref>
          <Box component="a" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 2 }}>
            <img src="/Images/download (4).png" alt="WebShop Logo" style={{ width: 102, height: 102, marginRight: 8 }} />
          </Box>
        </Link>

        {isSmallScreen ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleCategoryChange('all')}>All Products</MenuItem>
              <MenuItem onClick={() => handleCategoryChange('electronics')}>Electronics</MenuItem>
              <MenuItem onClick={() => handleCategoryChange('jewelery')}>Jewelery</MenuItem>
              <MenuItem onClick={() => handleCategoryChange("men's clothing")}>Men's Clothing</MenuItem>
              <MenuItem onClick={() => handleCategoryChange("women's clothing")}>Women's Clothing</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Button color="inherit" onClick={() => handleCategoryChange('all')}>All Products</Button>
            <Button color="inherit" onClick={() => handleCategoryChange('electronics')}>Electronics</Button>
            <Button color="inherit" onClick={() => handleCategoryChange('jewelery')}>Jewelery</Button>
            <Button color="inherit" onClick={() => handleCategoryChange("men's clothing")}>Men's Clothing</Button>
            <Button color="inherit" onClick={() => handleCategoryChange("women's clothing")}>Women's Clothing</Button>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 2, px: 1, mx: 2 }}>
          <SearchIcon />
          <InputBase
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search…"
            sx={{ ml: 1, flex: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="/wishlist" passHref>
            <IconButton component="a" color="inherit" aria-label="wishlist">
              <FavoriteBorderIcon />
            </IconButton>
          </Link>
          <Link href="/cart" passHref>
            <IconButton component="a" color="inherit" aria-label="cart">
              <ShoppingCartIcon />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

