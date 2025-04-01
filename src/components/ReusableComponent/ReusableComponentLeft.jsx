import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import WhiteBoxWithList from '../Box/WhiteBoxWithList'; // Import WhiteBoxWithList

function ReusableComponentLeft({ title, subtitle, description, description2, footertext, imageUrl, listDetails }) {
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
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px', backgroundColor: '#EDC7A2', gap: '100px', overflow: 'hidden' }}
    >
      {/* Image on the left */}
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
          opacity: showImage ? 1 : 0,
          transform: showImage ? 'translateX(0)' : 'translateX(-50px)',
          transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s', // Added delay for image
        }}
      >
        <img src={imageUrl} alt={title} style={{ maxWidth: '100%', borderRadius: '8px' }} />
      </Box>
      {/* Text and WhiteBoxWithList on the right */}
      <Box
        sx={{
          flex: 1,
          paddingLeft: '20px',
          opacity: showText ? 1 : 0,
          transform: showText ? 'translateX(0)' : 'translateX(50px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease', // Increased duration
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(50px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease', // Increased duration
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(50px)',
            transition: 'opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s', // Increased delay
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            opacity: showText ? 1 : 0,
            transform: showText ? 'translateX(0)' : 'translateX(50px)',
            transition: 'opacity 1.2s ease 0.8s, transform 1.2s ease 0.8s', // Increased delay
          }}
        >
          {description}
        </Typography>
        {description2 && (
          <Typography
            variant="body1"
            paragraph
            sx={{
              opacity: showText ? 1 : 0,
              transform: showText ? 'translateX(0)' : 'translateX(50px)',
              transition: 'opacity 1.2s ease 1.2s, transform 1.2s ease 1.2s', // Increased delay
            }}
          >
            {description2}
          </Typography>
        )}
        {footertext && (
          <Typography
            variant="body2"
            color="textSecondary"
            paragraph
            sx={{
              opacity: showText ? 1 : 0,
              transform: showText ? 'translateX(0)' : 'translateX(50px)',
              transition: 'opacity 1.2s ease 1.6s, transform 1.2s ease 1.6s', // Increased delay
            }}
          >
            {footertext}
          </Typography>
        )}
        {listDetails && (
          <Box
            sx={{
              opacity: showText ? 1 : 0,
              transform: showText ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1.2s ease 2s, transform 1.2s ease 2s', // Added animation for WhiteBoxWithList
            }}
          >
            <WhiteBoxWithList title="We don't offer you:  " details={listDetails} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ReusableComponentLeft;
