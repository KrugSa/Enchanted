import React, { useEffect, Suspense, lazy } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarMobileComponent from './components/NavBar/NavBarMobileComponent';
import NavBarComponent from './components/NavBar/NavBarComponent';
import ReusableComponent from './components/ReusableComponent/ReusableComponent';
import MobileReusableComponent from './components/ReusableComponent/MobileReusableComponent'; // Import MobileReusableComponent
// import {Content } from './pages/Content';
import { About_Us } from './pages/About_Us';
import ReusableComponentLeft from './components/ReusableComponent/ReusableComponentLeft';
import Footer from './components/Footer/Footer';
// import {Help } from './pages/Help';




const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Pantallas pequeñas
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Pantallas tipo tablet
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // Pantallas grandes

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
    

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Box sx={{ position: 'relative', backgroundColor: '#D8D8D8', height: '100vh', overflow: 'auto', '::-webkit-scrollbar': { display: 'none' }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <div className="elfsight-app-9b462d53-7c1d-4344-9f95-66cee5ba4825" data-elfsight-app-lazy />
            </div>
            {isMobile ? <NavBarMobileComponent scrollToSection={scrollToSection} /> : <NavBarComponent scrollToSection={scrollToSection} />}
            <Suspense fallback={<div>Loading...</div>}>
              {isMobile ? (
                <>
                  {/* Render MobileReusableComponent below the slider */}
                  <Box sx={{ marginTop: '310px' }}>
                    <MobileReusableComponent
                      title="Enchanted Islands"
                      subtitle="Galapagos & Mainland Tour Operator"
                      description="We are more than a tour company that takes you to the usual sightseeing spots; Our itineraries are personalized, unique and focused on discovering the 
                      most hidden gems and the most beautiful places of these islands, which not only enchanted Darwin.We create tailor-made programs that make logistical sense for individual passengers, families or groups according to their interests and needs. We translate our deep experience of the corners of this beautiful and enigmatic Archipelago into 
                      programs full of surprises and active adventures for curious travelers."
                      buttonText="Learn More"
                      imageUrl="/src/assets/img/col_rigth.png"
                      onButtonClick={() => alert('Explorar clicked!')}
                    />
                  </Box>
                </>
              ) : isTablet ? (
                <>
                  {/* Render ReusableComponent for tablet screens */}
                  <Box sx={{ marginTop: '490px' }}>
                    <ReusableComponent
                      title="Enchanted Islands"
                      subtitle="Galapagos & Mainland Tour Operator"
                      description="We are more than a tour company that takes you to the usual sightseeing spots; Our itineraries are personalized, unique and focused on discovering the most hidden gems and the most beautiful places of these islands, which not only enchanted Darwin.
                      We create tailor-made programs that make logistical sense for individual passengers, families or groups according to their interests and needs. We translate our deep experience of the corners of this beautiful and enigmatic Archipelago into programs full of surprises and active adventures for curious travelers."
                      description2="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                      footertext="Our flagship product is comfortable and enriching travel experiences!"
                      buttonText="Learn More"
                      imageUrl="/src/assets/img/col_rigth.png"
                      onButtonClick={() => alert('Explorar clicked!')}
                    />
                  </Box>
                  <Box sx={{ height: '100vh', backgroundColor: '#D8D8D8' }}>
                    <ReusableComponentLeft
                      title="It will be a pleasure to welcome you in our homeland"
                      description="The Galápagos Islands may just inspire you to think differently about the world. The creatures that call the islands home, many found nowhere else in the world, act as if humans are nothing more than slightly annoying paparazzi."
                      buttonText="Learn More"
                      imageUrl="/src/assets/img/col_left.png"
                      onButtonClick={() => alert('Explorar clicked!')}
                    />
                  </Box>
                </>
              ) : (
                <>
                  {/* Render ReusableComponent for desktop screens */}
                  <Box sx={{ marginTop: '497px' }}>
                    <ReusableComponent
                      title="Enchanted Islands"
                      subtitle="Galapagos & Mainland Tour Operator"
                      description="We are more than a tour company that takes you to the usual sightseeing spots; Our itineraries are personalized, unique and focused on discovering the most hidden gems and the most beautiful places of these islands, which not only enchanted Darwin."
                      description2="We create tailor-made programs that make logistical sense for individual passengers, families or groups according to their interests and needs. We translate our deep experience of the corners of this beautiful and enigmatic Archipelago into programs full of surprises and active adventures for curious travelers."
                      footertext="Our flagship product is comfortable and enriching travel experiences!"
                      buttonText="Learn More"
                      imageUrl="/src/assets/img/col_rigth.png"
                      onButtonClick={() => alert('Explorar clicked!')}
                    />
                  </Box>
                  <Box sx={{ height: '100vh', backgroundColor: '#D8D8D8' }}>
                    <ReusableComponentLeft
                      title="It will be a pleasure to welcome you in our homeland"
                      description="The Galápagos Islands may just inspire you to think differently about the world. The creatures that call the islands home, many found nowhere else in the world, act as if humans are nothing more than slightly annoying paparazzi."
                      imageUrl="/src/assets/img/col_left.png"
                      listDetails={[
                        "Pre-packaged tours",
                        "Make you feel like if you are alone in the Enchanted Islands.",
                        "Even though the group is made up of travellers who booked through different agencies, you won’t feel like you’re wasting time picking up people.",
                        "Anxiety associated with travel abroad, we arranged belingual guides to meet you and escort you through every transition point: airport, meeting the cruise people, etc.",
                      ]} // Pass listDetails to ReusableComponentLeft
                      onButtonClick={() => alert('Explorar clicked!')}
                    />
                    {/* Elfsight Google Maps | Google Maps Enchanted */}
                    {/* <script src="https://static.elfsight.com/platform/platform.js" async></script>
                    <div className="elfsight-app-4e46faa0-a8fb-4c63-aefc-f839f515877c" data-elfsight-app-lazy></div> */}
                    {/* <!-- Elfsight Google Reviews | Enchanted Google Reviews --> */}
                    <Box
                      sx={{
                        backgroundImage: 'url(/src/assets/background/Testimonios.png)', // Replace with your image path
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                        height: 'auto',
                        padding: '20px', // Optional padding
                      }}
                    >
                      <div className="elfsight-app-bbe628f3-d5c2-4856-870a-217c267a3cdb" data-elfsight-app-lazy></div>
                    </Box>
                    <Box sx={{height:'729px'}}>
                       <div className="elfsight-app-217791fa-8b93-4793-904c-6cfc03b48f0d" data-elfsight-app-lazy></div>
                    </Box>
                   
                    <div className="elfsight-app-2046cf87-be90-407c-81e8-6fad00a7b6a9" data-elfsight-app-lazy></div>
                      <Footer/>
                  </Box>
                </>
              )}
            </Suspense>
          </Box>
        } />
        <Route path="/About_Us" element={<About_Us />} />
        {/* <Route path="/Content" element={<Content/>} /> */}
        {/* <Route path="/Help" element={<Help/>} /> */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
