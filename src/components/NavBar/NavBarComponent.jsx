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
  { name: 'GALAPAGOS TOURS', path: '/content' },
  { name: 'DIVING', path: '/help' },
  { name: 'GALAPAGOS CRUISES', path: '/galapagos' },
  { name: 'OUR BLOG', path: '/bloc' },
];

const contactPage = { name: 'CONTACT US', path: '/help' };

function NavBarComponent({ logoWidth = '200px', logoHeight = 'auto' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:960px)');
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleNavigation = (path) => {
    if (path) navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          paddingY: '10px',
          minHeight: '100px',
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="src/assets/logo/Logo_New.png"
            alt="Logo"
            sx={{
              width: logoWidth,
              height: logoHeight,
              cursor: 'pointer',
              zIndex: 1300,
            }}
            onClick={() => navigate('/')}
          />

          {/* Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Fondo degradado para las páginas */}
              <Toolbar
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 20px',
                  background: 'linear-gradient(90deg, #158a70 0%, #bcdc22 50%)',
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
                        color: '#EA9B11',
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

              {/* Contact Us independiente */}
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
            <IconButton size="large" edge="end" color="inherit" onClick={() => setMenuOpen(true)}>
              <MenuIcon
                sx={{
                  backgroundColor: '#EA9B11',
                  borderRadius: 3,
                  width: '45px',
                  height: '45px',
                  color: 'white',
                }}
              />
            </IconButton>
          )}
        </Container>
      </AppBar>

      {/* Mobile Slide Menu */}
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
            p: 2,
          }}
        >
          <Box
            component="img"
            src="src/assets/logo/Logo_New.png"
            alt="Logo"
            sx={{ marginBottom: 4, width: '200px', cursor: 'pointer' }}
            onClick={() => handleNavigation('/')}
          />

          {pages.map((page) => (
            <Typography
              key={page.name}
              variant="h5"
              onClick={() => handleNavigation(page.path)}
              sx={{
                color: 'white',
                marginY: 1.5,
                cursor: 'pointer',
                fontWeight: 'bold',
                userSelect: 'none',
              }}
            >
              {page.name}
            </Typography>
          ))}

          {/* Contact Us separado en mobile */}
          <Button
            onClick={() => handleNavigation(contactPage.path)}
            sx={{
              mt: 3,
              backgroundColor: 'white',
              color: '#EA9B11',
              borderRadius: '50px',
              px: 4,
              py: 1,
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.25)',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            {contactPage.name}
          </Button>
        </Box>
      </Slide>
    </>
  );
}

export default NavBarComponent;
