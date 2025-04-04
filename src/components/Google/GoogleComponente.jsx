import React from 'react';
import { Button, Box, Typography } from '@mui/material';

const GoogleComponente = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '550px',
        overflow: 'hidden', // Prevent overflow
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start', // Align content to the left
          padding: 3,
          textAlign: 'start',
          gap: '32px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Galapagos Tours
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet consectetur. Sit at lorem ut mi. Maecenas a id ultrices aliquet leo. Dictum sed nulla feugiat tellus mi. Lacus enim nisi non nisl proin nullam. Nunc elit non at iaculis nunc consequat sit et duis. Interdum turpis neque vitae molestie rhoncus.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'orange',
            color: 'white',
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '25px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
            '&:hover': {
              backgroundColor: 'darkorange'
            },
          }}
        >
          Explore our Tours by Activities
        </Button>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f0f0f0', // Optional background color
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden', // Prevent overflow
        }}
      >
        {/* Elfsight Google Maps | Google Maps Enchanted */}
        <script src="https://static.elfsight.com/platform/platform.js" async></script>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <div
            className="elfsight-app-4e46faa0-a8fb-4c63-aefc-f839f515877c"
            data-elfsight-app-lazy
            style={{
              width: '100%',
              height: '100%',
            }}
          ></div>
        </Box>
      </Box>
    </Box>
  );
};

export default GoogleComponente;
