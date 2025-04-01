import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle'; // Import a small circle icon

const WhiteBoxWithList = ({ title, details }) => {
  return (
    <Box
      sx={{
        width: '600px',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        opacity: 0,
        transform: 'translateY(20px)',
        animation: `fadeIn 1.2s ease forwards`, // Apply animation to the entire Box
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'start',
          opacity: 0,
          transform: 'translateY(20px)',
          animation: `fadeIn 1.2s ease 0.3s forwards`, // Staggered animation for title
        }}
      >
        {title}
      </Typography>
      <List sx={{ padding: 0 }}>
        {details.map((detail, index) => (
          <ListItem
            key={index}
            sx={{
              padding: '2px 0',
              alignItems: 'center',
              opacity: 0,
              transform: 'translateY(20px)',
              animation: `fadeIn 1.2s ease ${index * 0.3 + 0.6}s forwards`, // Staggered animation for list items
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: '20px',
                display: 'flex',
                alignItems: 'center', // Center the icon vertically
                justifyContent: 'center', // Center the icon horizontally
              }}
            >
              <CircleIcon sx={{ fontSize: '6px' }} />
            </ListItemIcon>
            <ListItemText primary={detail} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WhiteBoxWithList;
