
import React from 'react';
import { Box } from '@mui/material';

// Utilidad para importar imágenes si se pasa string relativa
function getImageSrc(image) {
  if (typeof image === 'string') {
    try {
      // Solo si es una ruta relativa dentro de src/assets
      if (image.startsWith('src/assets/')) {
        return require(`../../${image.replace('src/', '')}`);
      }
      if (image.startsWith('public/')) {
        return `/${image.replace('public/', '')}`;
      }
    } catch (e) {
      return image;
    }
  }
  return image;
}

const TransitionSection = ({ image, height = 150,  backgroundColor = 'transparent' }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        zIndex: 2,
        backgroundColor: backgroundColor,
      }}
    >
      <Box
        component="img"
        src={getImageSrc(image)}
        alt="transition"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </Box>
  );
};

export default TransitionSection;
