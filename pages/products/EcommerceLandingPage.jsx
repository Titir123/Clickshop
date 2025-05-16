import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, CardContent, CardMedia, Typography, Grid, AppBar, Toolbar, IconButton, useMediaQuery, Box, Button, Menu, NavItem, InputBase} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  { id: 1, name: "Stylish Jacket", image: "/Images/download (2).jpeg", price: "$49" },
  { id: 2, name: "Elegant Watch", image: "/Images/shopping.webp", price: "$99" },
  { id: 3, name: "Running Shoes", image: "/Images/-473Wx593H-469685692-orange-MODEL.avif", price: "$79" },
  { id: 4, name: "Exclusive jewellery", image: "/Images/download (3).jpeg", price: "$79" },
];

const brandData = [
  { id: 1, name: "Nike", image: "/Images/download.png" },
  { id: 2, name: "Adidas", image: "/Images/download (1).png" },
  { id: 3, name: "Puma", image: "/Images/download.jpeg" },
  { id: 4, name: "Reebok", image: "/Images/download (2).png" },
  { id: 5, name: "Gucci", image: "/Images/download.png" },
  { id: 6, name: "Louis Vuitton", image: "/Images/download (1).jpeg" },
  { id: 7, name: "Zara", image: "/Images/download (3).png" },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const EcommerceLandingPage = () => {

  const router = useRouter(); // Add this inside component


    useEffect(() => {
        AOS.init({ duration: 3000 });
      }, []);
     

      const handleCategoryChange = (newCategory) => {
        setAnchorEl(null);
        router.push(`/products?category=${encodeURIComponent(newCategory)}`);
      };

        const [category, setCategory] = useState('all');
  return (

    <Box
    sx={{
      background: 'linear-gradient(to bottom right,rgb(241, 238, 239),, #757575)',
      minHeight: '100vh',
      width: '100%',
    }}
  >
    <div className="min-h-screen flex flex-col">
    
  

      {/* Banner Slider */}
      <section className="overflow-hidden w-full h-">
        <Carousel autoPlay infiniteLoop showThumbs={false} interval={5000} showStatus={false}>
          <div>
            <img src="/Images/composition-with-smartphone-used-digital-shopping-online-ordering_23-2151380452.avif" alt="Garments" className="w-full h-[400px] object-cover" />
          </div>
          <div>
            <img src="/Images/online-fashion-shopping-with-computer_23-2150400628.avif" alt="Accessories" className="w-full h-[400px] object-cover" />
          </div>
          <div>
            <img src="/Images/cropped-image-woman-inputting-card-information-key-phone-laptop-while-shopping-online_1423-68.avif" alt="Products" className="w-full h-[400px] object-cover" />
          </div>
        </Carousel>
      </section>
     
  
      {/* Featured Products */}
      <section style={{ padding: "2rem" }}>
      <Typography variant="h3" align="center" gutterBottom fontStyle={"normal"} fontFamily={"Roboto Helvetica sans-serif"} color="#1A1A1A">
        Featured Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
                     <div data-aos="flip-right">
            <Card sx={{ maxWidth: 320, borderRadius: "15px", boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)" }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                style={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {product.price}
                </Typography>
              </CardContent>
            </Card>
            </div>
          </Grid>
        ))}
      </Grid>
    </section>
    <section style={{ padding: "3rem 1rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Global Brands
      </Typography>
      <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
        <Slider {...sliderSettings}>
          {brandData.map((brand) => (
            <div key={brand.id}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{
                    width: "150px",
                    height: "100px",
                    objectFit: "contain",
                    margin: "0 auto",
                  }}
                />
               
              </Box>
            </div>
          ))}
        </Slider>
      </Box>
      
    </section>
    
    
    </div>
    </Box>
  );
};

export default EcommerceLandingPage;
