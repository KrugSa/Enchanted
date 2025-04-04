import React from 'react';
import { Box, Typography, Container } from '@mui/material';
const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: '#0076B0',
            padding: '60px 0',
            overflowX: 'hidden', // Ocultar el desbordamiento horizontal
            whiteSpace: 'nowrap', // Asegurar que los elementos no se envuelvan
            '@keyframes slide': {
                from: { transform: 'translateX(0)' },
                to: { transform: 'translateX(-100%)' }
            },
            '&:hover': {
                animationPlayState: 'paused'
            }
        }}>
            <Box sx={{ display: 'inline-block', animation: '30s slide infinite linear' }}>
                <img src="/src/assets/logo_banner/Capa_1.svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group (1).svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group (2).svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group.svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/pincel_encantado-logo.svg" alt="" style={{ margin: '0 40px' }} />
            </Box>
            <Box sx={{ display: 'inline-block', animation: '30s slide infinite linear' }}>
                <img src="/src/assets/logo_banner/Capa_1.svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group (1).svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group (2).svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group.svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/pincel_encantado-logo.svg" alt="" style={{ margin: '0 40px' }} />
            </Box>
            <Box sx={{ display: 'inline-block', animation: '30s slide infinite linear' }}>
                <img src="/src/assets/logo_banner/Capa_1.svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group (1).svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group (2).svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/Group.svg" alt="" style={{ margin: '0 40px' }} />
                <img src="/src/assets/logo_banner/pincel_encantado-logo.svg" alt="" style={{ margin: '0 40px' }} />
            </Box>

        </Box>
    );
};
export default Footer;