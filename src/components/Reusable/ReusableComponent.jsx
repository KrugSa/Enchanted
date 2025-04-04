import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';

const ReusableComponent = ({ title, subtitle, description, description2, footertext, buttonText, imageUrl, onButtonClick }) => {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowText(true);
          setTimeout(() => setShowImage(true), 500); // Delay for image after text
        } else {
          setShowImage(false);
          setShowText(false);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={componentRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px',
        backgroundColor: '#bfdbfe',
        background: 'url("/src/assets/background/land-transition.png") center bottom no-repeat, #00ABA9',
        backgroundSize: 'contain',
        width: '100%',
        gap: '100px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          textAlign: 'left',
          opacity: showText ? 1 : 0,
          transform: showText ? 'translateX(0)' : 'translateX(-50px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease', // Increased duration
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 'bold',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease', // Increased duration
          }}
        >
          {title}
        </Typography>
        <br />
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 'bold',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s', // Increased delay
          }}
        >
          {subtitle}
        </Typography>
        <br />
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            color: 'white',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 1.2s ease 0.8s, transform 1.2s ease 0.8s', // Increased delay
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            color: 'white',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 1.2s ease 1.2s, transform 1.2s ease 1.2s', // Increased delay
          }}
        >
          {description2}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 'bold',
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'opacity 1.2s ease 1.6s, transform 1.2s ease 1.6s', // Increased delay
          }}
        >
          {footertext}
        </Typography>
        <Button variant="contained" sx={{ color: 'white', backgroundColor: '#EA9B11', borderRadius: '25px', boxShadow: ' 0px 8px 20px rgba(0, 0, 0, 0.4)', marginTop: '25px' }} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          textAlign: 'right',
          opacity: showImage ? 1 : 0,
          transform: showImage ? 'translateX(0)' : 'translateX(50px)',
          transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s', // Added delay for image
        }}
      >
        <img src={imageUrl} alt={title} style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
};

export default ReusableComponent;
