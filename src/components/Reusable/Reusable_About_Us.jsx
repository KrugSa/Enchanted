import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import WhyBookWithUs from './WhyBookWithUs';

function ReusableComponentLeft({
  title,
  subtitle,
  description,
  description2,
  footertext,
  imageUrl,
}) {
  const [show, setShow] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={componentRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'url("src/assets/background/backgroundAbout.png") center bottom no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Imagen + texto */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          gap: '100px',
          padding: '20px',
          width: '100%',
        }}
      >
        {/* Imagen */}
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            opacity: show ? 1 : 0,
            transform: show ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            height: '300px',
            marginTop: '10px',
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            style={{ maxWidth: '100%', borderRadius: '8px', height: '100%' }}
          />
        </Box>

        {/* Texto */}
        <Box
          sx={{
            flex: 1,
            paddingLeft: '20px',
            opacity: show ? 1 : 0,
            transform: show ? 'translateX(0)' : 'translateX(50px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
            {subtitle}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: 'white' }}>
            {description}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: 'white' }}>
            {description2}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
            {footertext}
          </Typography>
        </Box>
      </Box>

      {/* Lista */}
      <Box
        sx={{
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s',
          width: '100%',
        }}
      >
        <WhyBookWithUs />
      </Box>
    </Box>
  );
}

export default ReusableComponentLeft;
