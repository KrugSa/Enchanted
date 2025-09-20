import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const pages = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT US', path: '/About_Us' },
  { name: 'GALAPAGOS TOURS', path: '/galapagos_tours' },
  { name: 'OUR BLOG', path: '/blog' },
];

const contactPage = { name: 'CONTACT US', path: '/Contact_Us' };

function NavBarComponent({ logoWidth = '200px', logoHeight = 'auto' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleNavigation = (path) => {
    if (path) navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
  <AppBar position="static" sx={{ backgroundColor: isMobile ? 'transparent' : 'transparent', boxShadow: 'none', paddingY: isMobile ? 0 : '10px', minHeight: isMobile ? '48px' : '100px', position: isMobile ? 'relative' : 'static' }}>
  <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: isMobile ? 2 : undefined, position: 'relative', minHeight: isMobile ? '48px' : undefined }}>
          {/* Logo */}
          <Box
            component="img"
            src="src/assets/logo/Logo_New.png"
            alt="Logo"
            sx={{
              width: isMobile ? '140px' : logoWidth,
              height: isMobile ? 'auto' : logoHeight,
              cursor: 'pointer',
              zIndex: 1300,
              position: isMobile ? 'absolute' : 'static',
              top: isMobile ? '2px' : undefined,
              left: isMobile ? '8px' : undefined,
              marginTop: isMobile ? 0 : undefined
            }}
            onClick={() => navigate('/')}
          />
          {/* Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Toolbar
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 20px',
                  background: 'linear-gradient(90deg, #158a70 0%, #bcdc22 100%)',
                  borderRadius: '50px',
                  marginTop: '-200px',
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => handleNavigation(page.path)}
                    sx={{
                      color:
                        location.pathname === page.path
                          ? '#EA9B11'
                          : 'white',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        color: '#1177AE',
                        backgroundColor: 'transparent',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#EA9B11',
                        transform:
                          location.pathname === page.path
                            ? 'translateX(0)'
                            : 'translateX(-100%)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        transform: 'translateX(0)',
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Toolbar>
              <Button
                onClick={() => handleNavigation(contactPage.path)}
                sx={{
                  background: 'linear-gradient(90deg, #ff7f18 0%, #ffdd46 50%, #ffdd46 100%)',
                  color: 'white',
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                  fontSize: '14px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                  marginTop: '-200px',
                  height: '64px',
                  '&:hover': {
                    backgroundColor: '#D48A0F',
                    boxShadow: '0px 8px 20px rgba(0,0,0,0.4)',
                  },
                }}
              >
                {contactPage.name}
              </Button>
            </Box>
          )}
          {/* Mobile */}
          {isMobile && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setMenuOpen(true)}
              sx={{
                position: 'absolute',
                top: '2px',
                right: '8px',
                zIndex: 1400
              }}
            >
              <MenuIcon sx={{ backgroundColor: '#EA9B11', borderRadius: 3, width: '36px', height: '36px', color: 'white' }} />
            </IconButton>
          )}
        </Container>
      </AppBar>
      {/* Mobile Slide Menu adaptado */}
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
            style={{ marginBottom: '20px', width: '200px' }}
            onClick={() => handleNavigation('/')}
          />
          {pages.map((page) => (
            <Box
              key={page.name}
              onClick={() => handleNavigation(page.path)}
              sx={{ display: 'flex', alignItems: 'center', margin: 2, cursor: 'pointer' }}
            >
              <Typography variant="h6" sx={{ color: 'white' }}>
                {page.name}
              </Typography>
            </Box>
          ))}
          <Button
            onClick={() => handleNavigation(contactPage.path)}
            sx={{ mt: 3, backgroundColor: 'white', color: '#EA9B11', borderRadius: '50px', px: 4, py: 1, fontWeight: 'bold', fontSize: '16px', boxShadow: '0px 4px 10px rgba(0,0,0,0.25)', '&:hover': { backgroundColor: '#f5f5f5' } }}
          >
            {contactPage.name}
          </Button>
        </Box>
      </Slide>
    </>
  );
}

export default NavBarComponent;
