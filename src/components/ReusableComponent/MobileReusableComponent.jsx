import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const MobileReusableComponent = ({ title, subtitle, description, buttonText, imageUrl, onButtonClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Always column layout
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#00ABA9',
        gap: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
        {title}
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
        {subtitle}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
        {description}
      </Typography>
      <Button variant="contained" color="primary" onClick={onButtonClick}>
        {buttonText}
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <img src={imageUrl} alt={title} style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
};

export default MobileReusableComponent;
