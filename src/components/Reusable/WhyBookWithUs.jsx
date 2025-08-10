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

  return (
    <Box
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '40px 20px', 
        background: 'transparent' 
      }}
    >
      <Box
        ref={ref}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',  
          justifyContent: 'start',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* Título animado */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            marginLeft: '40px',
            color: 'white',
            textAlign: 'left',
            textTransform: 'uppercase',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          Why Book with Us?
        </Typography>

        {/* Caja blanca animada */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            maxWidth: '750px',
            margin: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s',
          }}
        >
          {/* Lista con delay progresivo */}
          <Box>
            <List sx={{ padding: 0 }}>
              {items.map((text, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: 'list-item',
                    listStyleType: 'disc',
                    pl: 2,
                    color: '#333',
                    opacity: show ? 1 : 0,
                    transform: show ? 'translateX(0)' : 'translateX(-25px)',
                    transition: `opacity 0.6s ease ${0.6 + index * 0.15}s, transform 0.6s ease ${0.6 + index * 0.15}s`,
                  }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>

      {/* Imagen */}
      <Box>
        <img src="src/assets/icons/seawolf.svg" alt="Seawolf" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
}
