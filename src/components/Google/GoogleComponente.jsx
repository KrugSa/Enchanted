import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

const GoogleComponente = () => {
  const [mapInteractive, setMapInteractive] = useState(false);

  const enableMap = () => {
    setMapInteractive(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '490px',
        overflow: 'hidden',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          width: '50%',
          backgroundImage: 'url("src/assets/background/Barco_Fondo.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 3,
          textAlign: 'start',
          gap: '35px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
          Galapagos Tours
        </Typography>
        <Box sx={{marginTop: '10px', marginBottom: '90px' }}>
          <Typography variant="body1" gutterBottom sx={{ color: 'white' }}>
            We are passionate about the Galapagos Islands and we love sharing it with you. 
            We are more than a tour company that takes you to the common sightseeing spots; 
            Enchanted Island Tour Operator provides impeccable, first class itineraries and 
            real action-packed experiences focused on discovering the most hidden gems and 
            the most beautiful places of these islands that not only enchanted Darwin.
          </Typography>
        </Box>
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
              backgroundColor: 'darkorange',
            },
          }}
        >
          Explore our Tours by Activities
        </Button>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: '50%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src="public/assets/background/Mapa.jpg"
          alt="Mapa"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* <script src="https://static.elfsight.com/platform/platform.js" async></script>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            pointerEvents: mapInteractive ? 'auto' : 'none', // Solo interactúa si activamos
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
         */}

        {/* Overlay */}
        {/* {!mapInteractive && (
          <Box
            onClick={enableMap}
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backdropFilter: 'blur(2px)',
              transition: '0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
            }}
          >
            Click to interact with the map
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default GoogleComponente;
