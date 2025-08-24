import { Box } from "@mui/material";
import { BannerBackground, BannerTitle } from "../components/Banner/Banner_background";
import GreenLine from "../components/Green_Line/Green_line";
import TransitionSection from "../components/Transition/Transition";
import FooterSection from "../components/Footer/FooterSection";
import NavBarComponent from "../components/NavBar/NavBarComponent";

export function Galapagos_Tours() {
  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      {/* NavBar con zIndex menor */}
      <Box sx={{ position: 'relative', zIndex: 5 }}>
        <NavBarComponent />
      </Box>

      {/* Banner en posición absoluta para superponerse */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 700, // ajusta altura
          zIndex: 1,
        }}
      >
        <BannerBackground imageUrl="public/assets/background/Tortuga_Galapagos_Tours.jpg" alt="Galapagos Tours">
          <BannerTitle title="Galapagos Tours" sx={{ textTransform: 'uppercase' }} />
        </BannerBackground>
      </Box>
      <Box sx={{ paddingTop: '360px' }}>
        <GreenLine
          imageSrc="public/assets/icons/icon-boat.svg"
          altText="love icon"
          titleText="Browse your favorite tour below"
        />
        {/* Resto del contenido */}
      </Box>

      <TransitionSection image="src/assets/background/footer-transition.png" backgroundColor='#f6e8d7' height={230} />
      <FooterSection sx={{ marginTop: '500px' }} />

    </Box>

  );
}
