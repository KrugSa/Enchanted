import { Box } from '@mui/material';
import NavBarComponent from '../components/NavBar/NavBarComponent';
import { BannerBackground, BannerTitle } from '../components/Banner/Banner_background';
import GreenLine from '../components/Green_Line/Green_line';
import Reusable_About_Us from '../components/Reusable/Reusable_About_Us';
import FooterSection from '../components/Footer/FooterSection';
import Teammember from '../components/Team/Teammember';
import TransitionSection from '../components/Transition/Transition';

export function About_Us() {
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
        <BannerBackground imageUrl="src/assets/background/Banner_About_Us.png" alt="About Us Banner">
          <BannerTitle title="About Us" />
        </BannerBackground>
      </Box>
      <Box sx={{ paddingTop: '360px' }}>
        <GreenLine
          imageSrc="src/assets/icons/icon-love.svg"
          altText="love icon"
          titleText="We feel passionate about The Galapagos Islands and loved sharing this with you!"
        />
        {/* Resto del contenido */}
      </Box>

      <Reusable_About_Us
        title="Enchanted Islands"
        subtitle="Galapagos & Mainland Tour Operator"
        description="We are more than a tour company that takes you to the usual sightseeing spots; Our itineraries are personalized, unique and focused on discovering the most hidden gems and the most beautiful places of these islands, which not only enchanted Darwin.
                      We create tailor-made programs that make logistical sense for individual passengers, families or groups according to their interests and needs. We translate our deep experience of the corners of this beautiful and enigmatic Archipelago into programs full of surprises and active adventures for curious travelers."
        footertext="Our flagship product is comfortable and enriching travel experiences!"
        buttonText="Learn More"
        imageUrl="src/assets/logo/logo-horz-color_white.png"
        onButtonClick={() => alert('Explorar clicked!')} />
      <Teammember />
      <TransitionSection image="src/assets/background/footer-transition.png" backgroundColor='#f6e8d7' height={230} />
      <FooterSection sx={{ marginTop: '500px' }} />

    </Box>

  );
}