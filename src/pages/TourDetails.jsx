"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, CircularProgress, Divider } from '@mui/material';
import {
  getTripDetails,
  getTripParagraphs,
  getTripIncludedItems,
  getTripPackages,
  getDraftTripImages
} from '../services/weTravelApi';
import NavBarComponent from '../components/NavBar/NavBarComponent';
import FooterSection from '../components/Footer/FooterSection';
import TransitionSection from '../components/Transition/Transition';

export function TourDetails() {
  const { uuid } = useParams();
  const [tourData, setTourData] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  const [includedItems, setIncludedItems] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true);

        const [detailsRes, imagesRes, paragraphsRes, includedItemsRes, packagesRes] = await Promise.all([
          getTripDetails(uuid),
          getDraftTripImages(uuid),
          getTripParagraphs(uuid),
          getTripIncludedItems(uuid),
          getTripPackages(uuid)
        ]);
        
        console.log('Paragraphs data:', paragraphsRes);

        setTourData(detailsRes?.data || detailsRes);

        // Normalizar imágenes
        const processedImages = (imagesRes?.data || []).map(img => ({
          id: img.id,
          url: img.url,
          alt: img.alt || `Tour image`
        }));
        setImages(processedImages);
        setMainImage(processedImages[0]?.url || null);

        // Normalizar párrafos
        const processedParagraphs = Array.isArray(paragraphsRes?.data) 
          ? paragraphsRes.data
          : Array.isArray(paragraphsRes) 
            ? paragraphsRes 
            : [];
        setParagraphs(processedParagraphs);

        // Normalizar ítems incluidos
        const processedIncludedItems = Array.isArray(includedItemsRes?.data) 
          ? includedItemsRes.data 
          : Array.isArray(includedItemsRes) 
            ? includedItemsRes 
            : [];
        setIncludedItems(processedIncludedItems);

        // Normalizar paquetes
        setPackages(packagesRes?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, [uuid]);

  const handleBookNow = () => {
    window.open(`https://www.wetravel.com/trips/${uuid}`, '_blank');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#f6e8d7' }}>
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
          height: 500,
          zIndex: 1,
          backgroundImage: `url(${mainImage || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            p: 4
          }}
        >
          <Container>
            <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>
              {tourData?.attributes?.title}
            </Typography>
            <Typography variant="h5" sx={{ color: 'white' }}>
              ${tourData?.attributes?.price} per person
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ paddingTop: '320px' }}>
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Grid container spacing={4} alignItems="flex-start">

            {/* Slider */}
            <Grid item xs={12} md={6}>
              {images.length > 0 && (
                <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 2, bgcolor: '#fff', p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 350 }}>
                    <Button
                      onClick={() => setSliderIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      sx={{ position: 'absolute', left: 0, zIndex: 2, minWidth: 40, height: '100%' }}
                    >
                      {'<'}
                    </Button>
                    <img
                      src={images[sliderIndex]?.url}
                      alt={images[sliderIndex]?.alt}
                      style={{ maxHeight: 320, maxWidth: '100%', objectFit: 'contain', borderRadius: 8 }}
                    />
                    <Button
                      onClick={() => setSliderIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      sx={{ position: 'absolute', right: 0, zIndex: 2, minWidth: 40, height: '100%' }}
                    >
                      {'>'}
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>

            {/* Detalles */}
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2 }}>
                <Typography variant="h4" sx={{ mb: 3, color: '#1a365d' }}>Tour Overview</Typography>
                
                {/* Detalles específicos del tour */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: '#f7fafc',
                      borderRadius: 1,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Duration
                      </Typography>
                      <Typography variant="body2">
                        {tourData?.attributes?.duration || 'Contact for details'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: '#f7fafc',
                      borderRadius: 1,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Group Size
                      </Typography>
                      <Typography variant="body2">
                        {tourData?.attributes?.group_size || 'Contact for details'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: '#f7fafc',
                      borderRadius: 1,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Description
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {tourData?.attributes?.description}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Párrafos y secciones del tour */}
                {paragraphs.length > 0 && (
                  <>
                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h5" sx={{ mb: 3 }}>About This Tour</Typography>
                    {paragraphs.map((paragraph, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          mb: 4,
                          p: 3,
                          bgcolor: '#fff',
                          borderRadius: 2,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                      >
                        {paragraph.title && (
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              mb: 2,
                              color: '#2c5282',
                              fontWeight: 600
                            }}
                          >
                            {paragraph.title}
                          </Typography>
                        )}
                        <Typography
                          variant="body1"
                          sx={{ 
                            mb: 2,
                            lineHeight: 1.8,
                            color: '#2d3748'
                          }}
                          dangerouslySetInnerHTML={{ __html: paragraph.text || '' }}
                        />
                      </Box>
                    ))}
                  </>
                )}

                {/* Items incluidos */}
                <Divider sx={{ my: 4 }} />
                <Typography variant="h5" sx={{ mb: 3, color: '#1a365d' }}>What's Included</Typography>
                <Grid container spacing={2}>
                  {includedItems.length > 0 ? (
                    includedItems.map((item) => (
                      <Grid item xs={12} sm={6} key={item.id}>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: '#f7fafc',
                            borderRadius: 2,
                            border: '1px solid #e2e8f0',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 1,
                              color: '#2c5282',
                              fontWeight: 600,
                              fontSize: '1.1rem'
                            }}
                          >
                            {item.title}
                          </Typography>
                          {item.description && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#4a5568',
                                flex: 1
                              }}
                            >
                              {item.description}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography>No included items found.</Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Paquetes del tour */}
        {packages.length > 0 && (
          <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>Available Packages</Typography>
              <Grid container spacing={3}>
                {packages.map((pkg) => (
                  <Grid item xs={12} md={6} key={pkg.id}>
                    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                      <Typography variant="h6">{pkg.attributes?.name}</Typography>
                      <Typography>${pkg.attributes?.price} per person</Typography>
                      {pkg.attributes?.short_description && <Typography sx={{ mt: 1 }}>{pkg.attributes.short_description}</Typography>}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        )}

        {/* Book section */}
        <Container maxWidth="sm" sx={{ mb: 8 }}>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Book This Tour</Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: '#f47c20',
                '&:hover': { bgcolor: '#e65100' }
              }}
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </Box>

      <TransitionSection
        image="src/assets/background/footer-transition.png"
        backgroundColor='#f6e8d7'
        height={230}
      />
      <FooterSection sx={{ marginTop: '500px' }} />
    </Box>
  );
}
