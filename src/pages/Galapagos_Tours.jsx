import tourImg from "../assets/background/Tortuga_Galapagos_Tours.jpg";
import iconPinguino from "../assets/icons/icono-pinguino.svg";
import iconIguana from "../assets/icons/icono-iguana.svg";
import iconPiquero from "../assets/icons/icono-piquero.svg";
import iconofoco from "../assets/icons/icono-foco.svg";
import "./Galapagos_Tours.css";
// Tarjeta dinámica con splash y alternancia de iconos
const iconList = [
  iconPinguino,
  iconIguana,
  iconPiquero,
  iconofoco,
];

function TourCardSplash({ tour, image, iconIdx }) {
  // Tamaños responsivos para imagen y card
  const IMAGE_WIDTH = 340;
  const IMAGE_HEIGHT = 220;
  const CARD_WIDTH = 260;

  // Colores para intercalar
  // Patrón según la imagen:
  // 1. Encabezado naranja, contenido verde
  // 2. Encabezado azul, contenido verde
  // 3. Encabezado verde, contenido naranja
  const colorPairs = [
    { header: '#f47c20', content: '#22b6b0' }, // naranja - verde
    { header: '#1177AE', content: '#158a70' }, // azul - verde
    { header: '#158a70', content: '#f47c20' }, // verde - naranja
  ];
  const pair = colorPairs[iconIdx % colorPairs.length];
  const headerColor = pair.header;
  const contentColor = pair.content;

  // Alto fijo para el encabezado (ajusta según el máximo de líneas que quieras permitir)
  const HEADER_HEIGHT = 100; // px, aprox. 2 líneas
  const HEADER_MAX_WIDTH = '85%'; // más ancho para el título

  return (
    <div style={{ width: '100%', maxWidth: IMAGE_WIDTH, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Splash mucho más grande que la imagen */}
      <div style={{ position: 'relative', width: '100%', maxWidth: IMAGE_WIDTH, height: IMAGE_HEIGHT, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <img src={splashBg} alt="Splash Background" style={{ position: 'absolute', top: '-30px', left: '-30px', width: IMAGE_WIDTH + 80, height: IMAGE_HEIGHT + 60, objectFit: 'contain', zIndex: 1 }} /> */}
        <img src={image || tourImg} alt={tour.title || "Tour"} style={{ position: 'relative', zIndex: 2, width: CARD_WIDTH, height: '180px', objectFit: 'cover', borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }} />
      </div>
      {/* Card con cabecera e intercalado de colores */}
      <div style={{ width: CARD_WIDTH, borderRadius: '0 0 18px 18px', overflow: 'hidden', marginTop: '-10px', background: 'transparent', zIndex: 3, position: 'relative' }}>
        {/* Cabecera con alto fijo y texto multilinea */}
        <div style={{ background: headerColor, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', minHeight: HEADER_HEIGHT, height: HEADER_HEIGHT }}>
          <Typography
            sx={{
              fontSize: '0.93rem', // más pequeño
              fontWeight: 'bold',
              color: '#fff',
              maxWidth: HEADER_MAX_WIDTH,
              overflow: 'hidden',
              display: 'block',
              cursor: 'pointer',
              letterSpacing: 0.5,
              textShadow: '0 1px 6px rgba(0,0,0,0.18)',
              transition: 'color 0.2s',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              lineHeight: 1.2,
              height: 'auto',
              '&:hover': {
                color: '#ffe082',
              },
            }}
          >
            {tour.title || "Tour sin nombre"}
          </Typography>
          <span style={{ fontSize: '1.08rem', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap' }}>{tour.price ? `$${tour.price}` : ""}</span>
        </div>
        {/* Contenido */}
        <div style={{ background: contentColor, padding: '18px 16px 24px 16px', display: 'flex', alignItems: 'center', gap: '16px', flexDirection: 'row', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
          <img src={iconList[iconIdx % iconList.length]} alt="Tour Icon" style={{ width: '54px', height: '54px', flexShrink: 0 }} />
          <div style={{ color: '#fff', fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0, textAlign: 'left' }}>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{tour.activities || "Half Day"}</div>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{tour.destination || "San Cristobal Island"}</div>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{tour.duration || "4 hours"}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent', paddingBottom: '18px' }}>
          <button 
            onClick={() => window.location.href = `/tour/${tour.uuid}`}
            style={{ 
              background: '#1976d2', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '24px', 
              marginTop: '12px', 
              padding: '10px 32px', 
              fontWeight: 'bold', 
              fontSize: '1rem', 
              cursor: 'pointer', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
              transition: 'all 0.2s',
              '&:hover': {
                background: '#1565c0',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            MORE INFO
          </button>
        </div>
      </div>
    </div>
  );
}
import { Box, Typography, Grid, Card, CardMedia, CardContent, FormControl, InputLabel, Select, MenuItem, Tooltip } from "@mui/material";
import { BannerBackground, BannerTitle } from "../components/Banner/Banner_background";
import GreenLine from "../components/Green_Line/Green_line";
import TransitionSection from "../components/Transition/Transition";
import FooterSection from "../components/Footer/FooterSection";
import NavBarComponent from "../components/NavBar/NavBarComponent";

import { useEffect, useState } from "react";
import { getDraftTrips, getDraftTripImages } from "../services/weTravelApi";

export function Galapagos_Tours() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destinationFilter, setDestinationFilter] = useState("");
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    getDraftTrips()
      .then(data => {
        console.log('Respuesta de getDraftTrips:', data);
        const tourList = data.data || [];
        setTours(tourList);
        setLoading(false);

        // Extraer destinos únicos
        const uniqueDestinations = Array.from(
          new Set(tourList.map(t => t.destination || "Unknown"))
        );
        setDestinations(uniqueDestinations);

        // Cargar imágenes para cada tour
        tourList.forEach(tour => {
          getDraftTripImages(tour.uuid).then(imgData => {
            setImages(prev => ({
              ...prev,
              [tour.uuid]: imgData.data // array de imágenes
            }));
          });
        });
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtrar tours por destino seleccionado
  const filteredTours = destinationFilter
    ? tours.filter(t => (t.destination || "Unknown") === destinationFilter)
    : tours;

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', background: "#f6e8d7" }}>
      {/* NavBar */}
      <Box sx={{ position: 'relative', zIndex: 5 }}>
        <NavBarComponent />
      </Box>

      {/* Banner */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 700,
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
          altText="boat Icon"
          titleText="Browse your favorite tour below"
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "300px 1fr" }, // filtro a la izquierda
            gap: 3,
            mt: 3
          }}
        >
          {/* Sidebar de filtros */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'transparent',
              mb: 3
            }}
          >
            <Box sx={{
              width: '100%',
              background: "#1177AE",
              borderRadius: 2,
              p: 3,
              boxShadow: 2,
              mb: 2,
              minHeight: 270, // alargar el filtro visualmente
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
            }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'white', textAlign: 'left' }}>Filter by Destination</Typography>
              <FormControl fullWidth>
                <InputLabel id="destination-filter-label" sx={{ color: 'white', borderColor: 'white' }}>Destination</InputLabel>
                <Select
                  labelId="destination-filter-label"
                  value={destinationFilter}
                  label="Destination"
                  onChange={e => setDestinationFilter(e.target.value)}
                  sx={{
                    backgroundColor: '#f47c20',
                    color: 'white',
                    '& .MuiSelect-select': {
                      backgroundColor: '#f47c20',
                      color: 'white',
                    },
                    '&.Mui-focused .MuiSelect-select': {
                      backgroundColor: '#f47c20',
                      color: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#f47c20',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#f47c20',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#f47c20',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#f47c20',
                        color: 'white',
                        '& .Mui-selected': {
                          backgroundColor: 'white !important',
                          color: '#f47c20',
                        },
                        '& .Mui-selected:hover': {
                          backgroundColor: '#ffe0b2 !important',
                          color: '#f47c20',
                        }
                      }
                    }
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {destinations.map(dest => (
                    <MenuItem key={dest} value={dest}>{dest}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* Pinguino SVG debajo del filtro */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
              <img src={iconPinguino} alt="Pinguino" style={{ width: '80%', maxWidth: 220, height: 'auto', display: 'block' }} />
            </Box>
          </Box>

          {/* Área de tours */}
          <Box>
            {loading && <Typography>Loading tours...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                  gap: 3
                }}
              >
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour, idx) => (
                    <TourCardSplash
                      key={tour.uuid || idx}
                      tour={tour}
                      image={images[tour.uuid] && images[tour.uuid][0] ? images[tour.uuid][0].url : null}
                      iconIdx={idx}
                    />
                  ))
                ) : (
                  <Typography>No tours found.</Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>

      </Box>

      <TransitionSection image="src/assets/background/footer-transition.png" backgroundColor='#f6e8d7' height={230} />
      <FooterSection sx={{ marginTop: '500px' }} />
    </Box>
  );
}