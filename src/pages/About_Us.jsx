import React from 'react';
import { Box } from '@mui/material';
import NavBarComponent from '../components/NavBar/NavBarComponent';
import  {BannerBackground, BannerTitle } from '../components/Banner/Banner_background';
import GreenLine from '../components/Green_Line/Green_line';


export function About_Us() {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* NavBar con zIndex menor */}
      <Box sx={{ position: 'relative', zIndex: 5 }}>
        <NavBarComponent />
      </Box>

      {/* Banner en posición absoluta para superponerse */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 700, // ajusta altura
          zIndex: 1,
        }}
      >
        <BannerBackground imageUrl="src/assets/background/Banner_About_Us.png" alt="About Us Banner">
          <BannerTitle title="About Us" />
        </BannerBackground>
      </Box>
      <Box sx={{ paddingTop: '360px' }}>
        <GreenLine
          imageSrc="src/assets/icons/icon-love.svg"
          altText="love icon"
          titleText="We feel passionate about The Galapagos Islands and loved sharing this with you!"
        />
        {/* Resto del contenido */}
      </Box>

      {/* Contenido principal con padding para no quedar debajo del banner */}
      <Box sx={{ paddingTop: '420px', paddingX: 3 }}>
        <h1>About Us</h1>
        <p>Welcome to our company! We are dedicated to providing the best services to our customers.</p>
      </Box>
    </Box>
  );
}