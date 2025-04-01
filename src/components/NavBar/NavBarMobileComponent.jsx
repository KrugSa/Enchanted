import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import { Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const pages = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT US', path: '/find' },
  { name: 'GALAPAGOS TOURS', path: '/content' },
  { name: 'DIVING', path: '/help' },
  { name: 'GALAPAGOS CRUISES', path: '/galapagos' },
  { name: 'OUR BLOG', path: '/bloc' },
  { name: 'CONTACT US', path: '/help' },
  { name: 'X', path: null },
];

function NavBarMobileComponent() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = () => setMenuOpen(true);
  const handleCloseMenu = () => setMenuOpen(false);

  const handleMenuClick = (path) => {
    if (path) navigate(path);
    handleCloseMenu();
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl" sx={{ backgroundColor: 'white', px: 4 }}>
          <Toolbar disableGutters>
            <img
              src="src/assets/logo/logo-horz-color.svg"
              alt="Logo Test"
              style={{ width: '300px', padding: '16px' }} // Fixed inline style
            />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenMenu}
            >
              <MenuIcon
                sx={{
                  backgroundColor: '#EA9B11',
                  borderRadius: 3,
                  width: '45px', // Ensure width is a string with units
                  height: '45px', // Ensure height is a string with units
                }}
              />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Slide direction="left" in={menuOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#EA9B11',
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="src/assets/logo/logo-horz-color.svg"
            alt="Logo"
            style={{ marginBottom: '20px', width: '200px' }} // Added width for consistency
          />
          {pages.map((page) => (
            <Box
              key={page.name}
              onClick={() => handleMenuClick(page.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: 2,
                cursor: 'pointer',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white' }}>
                {page.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Slide>
    </>
  );
}

export default NavBarMobileComponent;
