import React from 'react';
import { Box, Typography } from '@mui/material';

const BannerBackground = ({ imageUrl, alt = 'Banner', children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 700, // ajusta la altura que necesites
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
        textAlign: 'left',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'flex-end', // alinea verticalmente abajo
        justifyContent: 'flex-start', // alinea horizontalmente a la izquierda
        px: 6, // padding horizontal aumentado
        pb: 6, // padding abajo aumentado
      }}
      aria-label={alt}
    >
      {children}
    </Box>
  );
};

const BannerTitle = ({ title, subtitle }) => {
  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{ fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.7)', textTransform: 'uppercase' }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h5"
          component="h2"
          sx={{ mt: 1, textShadow: '1px 1px 6px rgba(0,0,0,0.5)' }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export { BannerBackground, BannerTitle };