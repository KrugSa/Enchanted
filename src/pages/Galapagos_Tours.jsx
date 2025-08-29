import { Box, Typography, Grid, Card, CardMedia, CardContent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
  const [locationFilter, setLocationFilter] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getDraftTrips()
      .then(data => {
        const tourList = data.data || [];
        setTours(tourList);
        setLoading(false);

        // Extraer locaciones únicas
        const uniqueLocations = Array.from(
          new Set(tourList.map(t => t.location || "Unknown"))
        );
        setLocations(uniqueLocations);

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

  // Filtrar tours por locación seleccionada
  const filteredTours = locationFilter
    ? tours.filter(t => (t.location || "Unknown") === locationFilter)
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
          altText="love icon"
          titleText="Browse your favorite tour below"
        />

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Filtro de locación */}
          <Grid item xs={12} md={3}>
            <Box sx={{ background: "#fff", borderRadius: 2, p: 3, boxShadow: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Filter by Location</Typography>
              <FormControl fullWidth>
                <InputLabel id="location-filter-label">Location</InputLabel>
                <Select
                  labelId="location-filter-label"
                  value={locationFilter}
                  label="Location"
                  onChange={e => setLocationFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {locations.map(loc => (
                    <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Cards de tours */}
          <Grid item xs={12} md={9}>
            {loading && <Typography>Loading tours...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && (
              <Grid container spacing={3}>
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={tour.uuid || idx}>
                      <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%", display: "flex", flexDirection: "column", width: "300px" }}>
                        <Box
                          sx={{
                            width: "100%",
                            height: 220,
                            backgroundColor: "#e0e0e0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                          }}
                        >
                          {images[tour.uuid] && images[tour.uuid][0] ? (
                            <CardMedia
                              component="img"
                              image={images[tour.uuid][0].url}
                              alt={tour.title}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
                              No Image
                            </Box>
                          )}
                        </Box>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {tour.title || "Tour sin nombre"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {tour.location || "Unknown location"}
                          </Typography>
                          {/* Puedes agregar más detalles aquí */}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography>No tours found.</Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>

      <TransitionSection image="src/assets/background/footer-transition.png" backgroundColor='#f6e8d7' height={230} />
      <FooterSection sx={{ marginTop: '500px' }} />
    </Box>
  );
}