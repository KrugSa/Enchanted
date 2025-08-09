import React from 'react';
import { Box } from '@mui/material';

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
        src={image}
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
