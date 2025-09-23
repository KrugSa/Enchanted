import { useEffect, Suspense } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarComponent from './components/NavBar/NavBarComponent';
import ReusableComponent from './components/Reusable/ReusableComponent';
import { About_Us } from './pages/About_Us';
import ReusableComponentLeft from './components/Reusable/ReusableComponentLeft';
import GoogleComponente from './components/Google/GoogleComponente';
import TransitionSection from './components/Transition/Transition';
import FooterSection from './components/Footer/FooterSection';
import NewsSection from './components/Blog/NewsSection';
import { Galapagos_Tours } from './pages/Galapagos_Tours';
import { Contact_Us } from './pages/Contact_Us';
import Details from './pages/Details';
import { TourDetails } from './pages/TourDetails';
import { Our_Blog } from './pages/Our_Blog';
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
  const theme = useTheme();
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
          <Box sx={{ position: 'relative', backgroundColor: '#D8D8D8', height: '100vh', overflow: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <div className="elfsight-app-9b462d53-7c1d-4344-9f95-66cee5ba4825" data-elfsight-app-lazy />
            </div>
            <NavBarComponent scrollToSection={scrollToSection} />
            <Suspense fallback={<div>Loading...</div>}>
              <Box sx={{ marginTop: '300px', paddingTop: '50px' }}>
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
                  buttonText="Learn More"
                  imageUrl="/src/assets/img/col_left.png"
                  listDetails={[
                    "Pre-packaged tours",
                    "Make you feel like if you are alone in the Enchanted Islands.",
                    "Even though the group is made up of travellers who booked through different agencies, you won’t feel like you’re wasting time picking up people.",
                    "Anxiety associated with travel abroad, we arranged belingual guides to meet you and escort you through every transition point: airport, meeting the cruise people, etc.",
                  ]}
                  onButtonClick={() => alert('Explorar clicked!')}
                />
                <GoogleComponente />
                <Box
                  sx={{
                    backgroundImage: 'url(/src/assets/background/Testimonios.png)', // Replace with your image path
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    // backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    height: 'auto',
                    padding: '20px',
                  }}
                >
                  <div className="elfsight-app-bbe628f3-d5c2-4856-870a-217c267a3cdb" data-elfsight-app-lazy></div>
                </Box>
                <NewsSection />
                {/* Instagram testimonies */}
                <Box sx={{ height: '850px' }}>
                  <div className="elfsight-app-217791fa-8b93-4793-904c-6cfc03b48f0d" data-elfsight-app-lazy></div>
                </Box>
                <TransitionSection image="src/assets/background/footer-transition.png" backgroundColor='#f6e8d7' height={230} />
                <FooterSection sx={{ marginTop: '500px' }} />
              </Box>
            </Suspense>
          </Box>
        } />
        <Route path="/About_Us" element={<About_Us />} />
        <Route path="/Galapagos_Tours" element={<Galapagos_Tours />} />
        <Route path="/Contact_Us" element={<Contact_Us />} />
        <Route path="/tour/:uuid" element={<TourDetails />} />
        <Route path="/blog" element={<Our_Blog />} />
        {/* <Route path="/Help" element={<Help/>} /> */}
        {/* Add other routes here */}
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router >
  );
}

export default App;
