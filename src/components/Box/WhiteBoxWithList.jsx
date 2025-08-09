import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle'; // Import a small circle icon

const WhiteBoxWithList = ({ title, details }) => {
  return (
    <Box
      sx={{
        width: '700px',
        backgroundColor: 'transparent', 
        borderRadius: '8px',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        opacity: 0,
        transform: 'translateY(20px)',
        animation: `fadeIn 1.2s ease forwards`, 
      }}
    >
      <Box
        sx={{
          backgroundColor: '#06aab0',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '25px',
          fontSize: '18px',
          fontWeight: 600,
          cursor: 'default',
          boxShadow: '0 4px 8px rgba(0, 123, 255, .4)',
          userSelect: 'text',
          width: '100%',
          textAlign: 'center',
        }}
      >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
    </Box>
      {/* <Typography
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
      </Typography> */}
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
    </Box >
  );
};

export default WhiteBoxWithList;
