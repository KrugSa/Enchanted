import { Box, Typography } from '@mui/material';
import Footer from './Footer';
import TransitionSection from '../Transition/Transition';

function FooterSection() {
  return (
    <>
      {/* Logo principal */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#b1e2ee',
          height: '200px',
        }}
      >
        <img src="src/assets/logo/logo-icon.png" alt="Logo" />
      </Box>

      {/* Información de contacto */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          justifyContent: 'space-around',
          padding: '0 20px',
          background:
            'url(/themes/custom/galapagos/images/footer/xwater,P20transition,P20bot.png.pagespeed.ic.6A3psLPuQJ.webp) center bottom no-repeat, #b1e2ee',
          backgroundSize: 'contain',
          height: '250px',
          alignContent: 'center',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        {/* Dirección */}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '25px' }}>
          <img
            src="src/assets/icons/localization-icon.svg"
            alt="Localización"
            style={{ width: '50px', height: '50px' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
              Galápagos, Ecuador.
            </Typography>
            <Typography variant="h6" sx={{ color: '#000' }}>
              Santa Cruz, Cucuve e Islas Plaza
            </Typography>
          </Box>
        </Box>

        {/* Contacto */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            gap: '25px',
            alignItems: 'center',
          }}
        >
          <img
            src="src/assets/icons/phone.svg"
            alt="Teléfono"
            style={{ width: '50px', height: '50px' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
              sales@enchantedislandsec.com
            </Typography>
            <Typography variant="h6" sx={{ color: '#000' }}>
              operations@enchantedislandsec.com
            </Typography>
            <Typography variant="h6" sx={{ color: '#000' }}>
              +593 99 919 7218
            </Typography>
          </Box>
        </Box>

        {/* Redes sociales */}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '25px' }}>
          <img src="src/assets/icons/facebook.svg" alt="Facebook" style={{ width: '50px', height: '50px' }} />
          <img src="src/assets/icons/instagram.svg" alt="Instagram" style={{ width: '50px', height: '50px' }} />
          <img src="src/assets/icons/tiktok.svg" alt="TikTok" style={{ width: '50px', height: '50px' }} />
        </Box>
      </Box>

      {/* Widget Elfsight */}
      <div className="elfsight-app-2046cf87-be90-407c-81e8-6fad00a7b6a9" data-elfsight-app-lazy></div>

      {/* Transición */}
      <TransitionSection
        image="src/assets/background/water_transition_bot.svg"
        backgroundColor="#b1e2ee"
        height={80}
      />

      {/* Partners */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0076B0',
          height: '200px',
        }}
      >
        <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold' }}>
          PARTNERS
        </Typography>
      </Box>

      {/* Footer principal */}
      <Footer />

      {/* Copyright */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#003c6a',
          height: '83px',
          padding: '0 40px',
        }}
      >
        <Typography variant="body2" sx={{ color: 'white' }}>
          Enchanted Islands Tour Operator SAS © 2025. Todos los Derechos Reservados
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Contact |
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Frequent Questions |
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Support
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default FooterSection;
