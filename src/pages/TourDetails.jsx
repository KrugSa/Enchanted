"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, CircularProgress, Divider, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
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
import footerTransition from '../assets/background/footer-transition.png';

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
        const processedPackages = Array.isArray(packagesRes?.data)
          ? packagesRes.data
          : Array.isArray(packagesRes)
            ? packagesRes
            : [];
        console.log('Paquetes procesados:', processedPackages);
        setPackages(processedPackages);
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Typography variant="h2" sx={{ color: 'white', mb: 2, flex: 1, minWidth: 200 }}>

              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {packages.length > 0 && packages[0].price && (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    p: 2,
                    borderRadius: 2,
                    backdropFilter: 'blur(5px)'
                  }}>
                    <Typography variant="h4" sx={{ color: '#f47c20', fontWeight: 'bold' }}>
                      ${packages[0].price}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.9 }}>
                      per person
                    </Typography>
                  </Box>
                )}
                {packages.length > 0 && packages[0].participants_per_package && (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    p: 2,
                    borderRadius: 2,
                    backdropFilter: 'blur(5px)'
                  }}>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {packages[0].participants_per_package}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.9 }}>
                      max participants
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ paddingTop: '320px' }}>
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.07)',  p: 3, borderRadius: 2, backgroundImage: 'url(/public/assets/background/right_col.svg)', backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <Container maxWidth="sm" sx={{ mb: 8 }}>
                <Box sx={{ backgroundImage: 'url(/public/assets/background/right_col.svg)', p: 4, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>Book now and live an unforgettable experience!</Typography>
                  <Typography>
                    {packages.length > 0 && packages[0].price && (
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // bgcolor: 'rgba(255,255,255,0.1)',
                        p: 2,
                        borderRadius: 2,
                        // backdropFilter: 'blur(5px)'
                      }}>
                        <Typography variant="h4" sx={{ color: '#f47c20', fontWeight: 'bold' }}>
                          ${packages[0].price}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.9 }}>
                          Tour price
                        </Typography>
                      </Box>
                    )}
                  </Typography>
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

              {/* Slider */}
              <Grid item xs={12} md={6}>
                {images.length > 0 && (
                  <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 2, p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 350 }}>
                      {images.length > 1 && (
                        <IconButton
                          onClick={() => setSliderIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                          sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            width: 48,
                            height: 48,
                            bgcolor: 'rgba(255,255,255,0.85)',
                            border: '2px solid #e0e0e0',
                            boxShadow: 1,
                            color: '#1a365d',
                            '&:hover': { bgcolor: '#f6e8d7' }
                          }}
                          aria-label="previous image"
                        >
                          <ArrowBackIosNewIcon fontSize="medium" />
                        </IconButton>
                      )}
                      <img
                        src={images[sliderIndex]?.url}
                        alt={images[sliderIndex]?.alt}
                        style={{ maxHeight: 320, maxWidth: '100%', objectFit: 'contain', borderRadius: 8 }}
                      />
                      {images.length > 1 && (
                        <IconButton
                          onClick={() => setSliderIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                          sx={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            width: 48,
                            height: 48,
                            bgcolor: 'rgba(255,255,255,0.85)',
                            border: '2px solid #e0e0e0',
                            boxShadow: 1,
                            color: '#1a365d',
                            '&:hover': { bgcolor: '#f6e8d7' }
                          }}
                          aria-label="next image"
                        >
                          <ArrowForwardIosIcon fontSize="medium" />
                        </IconButton>
                      )}
                    </Box>
                    {/* Galería de miniaturas */}
                    {images.length > 1 && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                        {images.map((img, idx) => (
                          <Box key={img.id} sx={{ position: 'relative' }}>
                            <img
                              src={img.url}
                              alt={img.alt}
                              style={{
                                width: 60,
                                height: 40,
                                objectFit: 'cover',
                                borderRadius: 4,
                                border: idx === sliderIndex ? '2px solid #f47c20' : '2px solid #eee',
                                cursor: 'pointer',
                                opacity: idx === sliderIndex ? 1 : 0.7
                              }}
                              onClick={() => setSliderIndex(idx)}
                            />
                            {idx === sliderIndex && (
                              <PhotoLibraryIcon sx={{ position: 'absolute', top: 2, right: 2, color: '#f47c20', fontSize: 18, bgcolor: 'white', borderRadius: '50%' }} />
                            )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                )}
              </Grid>

            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/public/assets/icons/ferry1.svg"
                alt="Boat"
                style={{
                  width: '100%',
                  maxWidth: 500,
                  borderRadius: 16,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>


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
          </Box>
        </Container>

        {/* Paquetes del tour */}
        {packages.length > 0 && (
          <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <Typography variant="h5" sx={{ mb: 3, color: '#1a365d' }}>Available Packages</Typography>
              <Grid container spacing={3}>
                {packages.map((pkg) => (
                  <Grid item xs={12} md={6} key={pkg.id}>
                    <Box sx={{
                      p: 3,
                      border: '1px solid #e2e8f0',
                      borderRadius: 2,
                      bgcolor: '#f7fafc',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#2c5282',
                          mb: 2,
                          fontWeight: 600
                        }}
                      >
                        {pkg.name}
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: '#4a5568', mb: 0.5 }}>
                              Price per person
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#2d3748', fontWeight: 600 }}>
                              ${pkg.price}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: '#4a5568', mb: 0.5 }}>
                              Group Size
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#2d3748' }}>
                              {pkg.participants_per_package ? `Up to ${pkg.participants_per_package}` : 'Contact us'}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {pkg.description && (
                        <Typography
                          sx={{
                            mt: 'auto',
                            color: '#4a5568',
                            fontSize: '0.95rem',
                            lineHeight: 1.6
                          }}
                          dangerouslySetInnerHTML={{ __html: pkg.description }}
                        />
                      )}

                      {pkg.deposit > 0 && (
                        <Typography
                          sx={{
                            mt: 2,
                            color: '#718096',
                            fontSize: '0.9rem'
                          }}
                        >
                          Required deposit: ${pkg.deposit}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        )}

        {/* Book section */}

      </Box>

      <TransitionSection
        image={footerTransition}
        backgroundColor='#f6e8d7'
        height={230}
      />
      <FooterSection sx={{ marginTop: '500px' }} />
    </Box>
  );
}
