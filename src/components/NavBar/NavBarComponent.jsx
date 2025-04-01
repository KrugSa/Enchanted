import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';

const pages = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/About_Us' },
    { name: 'GALAPAGOS TOURS', path: '/content' },
    { name: 'DIVING', path: '/help' },
    { name: 'GALAPAGOS CRUISES', path: '/galapagos' },
    { name: 'OUR BLOG', path: '/bloc' },
    { name: 'CONTACT US', path: '/help' }
  ];
function NavBarComponent({ logoWidth = '400px', logoHeight = 'auto' }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const isSmallScreen = useMediaQuery('(max-width:1460px)');

  const handleNavigation = (path) => {
    if (path) navigate(path);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl" sx={{ backgroundColor: 'transparent', px: 4 }}>
        <Toolbar disableGutters>
          <Box
            component="img"
            src="src/assets/logo/logo-horz-color.svg"
            alt="Logo"
            sx={{ width: logoWidth, height: logoHeight, paddingLeft: '16px', paddingTop: '16px' }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => handleNavigation(page.path)}
              sx={{
                my: 2,
                color: page.name === 'CONTACT US' ? 'white' : location.pathname === page.path ? '#EA9B11' : 'white',
                backgroundColor: page.name === 'CONTACT US' ? '#EA9B11' : 'transparent',
                display: 'block',
                fontSize: isSmallScreen ? '14px' : '14px',
                borderRadius: page.name === 'CONTACT US' ? '50px' : '0',
                boxShadow: page.name === 'CONTACT US' ? '0px 4px 10px rgba(0, 0, 0, 0.25)' : 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: page.name === 'CONTACT US' ? '#D48A0F' : 'transparent',
                  boxShadow: page.name === 'CONTACT US' ? '0px 8px 20px rgba(0, 0, 0, 0.4)' : 'none',
                  color: page.name === 'CONTACT US' ? 'white' : '#EA9B11'
                },
                '&::after': {
                  content: page.name === 'CONTACT US' ? 'none' : '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#EA9B11',
                  transform: location.pathname === page.path ? 'translateX(0)' : 'translateX(-100%)',
                  transition: 'transform 0.3s ease-in-out'
                },
                '&:hover::after': {
                  transform: page.name === 'CONTACT US' ? 'none' : 'translateX(0)'
                }
              }}
            >
              {page.name}
            </Button>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBarComponent;
