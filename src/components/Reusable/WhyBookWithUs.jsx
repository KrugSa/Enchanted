import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function WhyBookWithUs() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShow(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    "Personal touch makes all the difference to fit your needs and desires, whose result will be the most personalized itinerary.",
    "In-depth experience versus checklist place-hopping",
    "We have created unique experiences making each passenger's trip a dream come true, that's our main goal.",
    "Our operation is socially responsible as it includes activities that involve different local families throughout the Islands, this contribution improves the family economy and overcomes the unemployment gap.",
    "The visits we will make are itineraries respectful of the environment and the fragile ecosystem of the Galapagos Islands. We promote sustainable trips for our clients developing and creating experiences that leaves a positive impact in the visited places!",
    "We have a multidisciplinary team that will assist you 24/7 in case of emergencies. Our experience at your service is also our family heritage. We are a company, legacy of 30 years, our parents sowed in us the passion for these islands, and now we promote our home with love and respect, to the highest standard of quality that you deserve."
  ];

  // Colores inspirados en las cards de Galapagos_Tours
  const headerColor = '#22b6b0';
  const contentColor = '#158a70';
  const CARD_WIDTH = 600;
  const HEADER_HEIGHT = 70;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: '40px 20px',
        background: 'transparent',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: { xs: 4, md: 0 },
      }}
    >
      {/* Card completamente a la izquierda */}
      <Box
        ref={ref}
        sx={{
          width: { xs: '100%', md: CARD_WIDTH },
          maxWidth: CARD_WIDTH,
          minWidth: { md: CARD_WIDTH },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
          borderRadius: '16px',
          background: 'transparent',
          alignSelf: 'flex-start',
          marginRight: { md: 'auto' },
        }}
      >
        {/* Cabecera animada */}
        <Box
          sx={{
            background: headerColor,
            minHeight: HEADER_HEIGHT,
            height: HEADER_HEIGHT,
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            px: 5,
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'left',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: { xs: '1.3rem', md: '2rem' },
            }}
          >
            Why Book with Us?
          </Typography>
        </Box>

        {/* Contenido animado */}
        <Box
          sx={{
            background: contentColor,
            padding: { xs: '24px', md: '40px' },
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s',
          }}
        >
          <List sx={{ padding: 0 }}>
            {items.map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'list-item',
                  listStyleType: 'disc',
                  pl: 2,
                  color: '#fff',
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateX(0)' : 'translateX(-25px)',
                  transition: `opacity 0.6s ease ${0.6 + index * 0.15}s, transform 0.6s ease ${0.6 + index * 0.15}s`,
                  fontSize: { xs: '0.89rem', md: '0.95rem' },
                  lineHeight: 1.18,
                  mb: 0.1,
                  py: 0,
                }}
              >
                <ListItemText
                  primary={
                    <span style={{ textAlign: 'justify', display: 'block' }}>{text}</span>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Imagen completamente a la derecha */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-end' },
          minWidth: { xs: 180, md: 400 },
          flex: 1,
          pl: { xs: 0, md: 6 },
          pr: { xs: 0, md: 2 },
          height: '500px',
        }}
      >
        <img src="src/assets/icons/seawolf.svg" alt="Seawolf" style={{ width: '100%', maxWidth: 400, height: 'auto' }} />
      </Box>
    </Box>
  );
}
