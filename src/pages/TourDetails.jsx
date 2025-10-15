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
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#009e4f',
                    p: 2.5,
                    borderRadius: '50%',
                    minWidth: 110,
                    minHeight: 110,
                    position: 'relative',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                  }}>
                    {/* Icono tortuga arriba */}
                    <img src="/public/assets/icons/tortuga.svg" alt="Tortuga" style={{ position: 'absolute', top: -90, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, zIndex: 2 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mt: 3, textAlign: 'center', fontSize: 28 }}>
                      ${packages[0].price}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.95, fontWeight: 500, textAlign: 'center', fontSize: 16 }}>
                      per person
                    </Typography>
                  </Box>
                )}
                {packages.length > 0 && packages[0].participants_per_package && (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#00b3c6',
                    p: 2.5,
                    borderRadius: '50%',
                    width: 130,
                    height: 130,
                    minWidth: 130,
                    minHeight: 130,
                    maxWidth: 130,
                    maxHeight: 130,
                    position: 'relative',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                  }}>
                    {/* Icono iguana arriba */}
                    <img src="/public/assets/icons/iguana.svg" alt="Iguana" style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, zIndex: 2 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mt: 3, textAlign: 'center', fontSize: 22 }}>
                      ${packages[0].participants_per_package}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.95, fontWeight: 500, textAlign: 'center', fontSize: 14 }}>
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
      <Box sx={{ width: '100%', paddingTop: '180px' }}>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, p: 3, backgroundImage: 'url(/public/assets/background/fondoagua.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100%', width: '100%', height: '660px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
            <Container maxWidth="sm" sx={{ mb: 8 }}>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  mx: 'auto',
                  background: '#06629B',
                  borderRadius: 3,
                  boxShadow: 4,
                  textAlign: 'center',
                  p: 0,
                  overflow: 'hidden',
                  mb: 4,
                  minHeight: 120,
                }}
              >
                <Box sx={{ p: 2.5, pb: 2 }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 1.5, fontWeight: 400, fontSize: 18 }}>
                    Book now and live an unforgettable experience!
                  </Typography>
                  {packages.length > 0 && packages[0].price && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 0.5 }}>
                      <Typography
                        variant="h2"
                        sx={{
                          color: 'white',
                          fontWeight: 900,
                          fontSize: 44,
                          lineHeight: 1,
                          mb: 0.2
                        }}
                      >
                        ${packages[0].price}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: 'white', fontSize: 15, opacity: 0.95 }}>
                        Tour price
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box sx={{ bgcolor: '#FF8333', py: 1.2, px: 0 }}>
                  <Button
                    variant="text"
                    fullWidth
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 22,
                      letterSpacing: 1,
                      bgcolor: 'transparent',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#e65100', color: 'white' },
                      transition: 'background 0.2s',
                      minHeight: 0,
                      py: 0.5
                    }}
                    onClick={handleBookNow}
                  >
                    BOOK NOW
                  </Button>
                </Box>
              </Box>
            </Container>

            {/* Slider */}
            <Grid item xs={12} md={6}>
              {images.length > 0 && (
                <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto', overflow: 'hidden', borderRadius: 2, p: 2, mt: -12 }}>
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
                maxWidth: 700,
                borderRadius: 16,
                // boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                objectFit: 'cover'
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>


          {/* Detalles */}
          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: '#06629B', padding: 4, margin: 0, border: 'none' }}>
              <Typography variant="h3" sx={{ mb: 3, color: 'white' }}>Tour Overview</Typography>

              {/* Detalles específicos del tour */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{
                    p: 2,
                    bgcolor: '#158a70',
                    color: 'white',
                    width: '300px',
                    height: '100px'
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
                    bgcolor: '#22b6b0',
                    color: 'white',
                    width: '300px',
                    height: '100px'
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
                    bgcolor: '#f47c20',
                    color: 'white',
                    width: '300px',
                    height: '100px'
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
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%', 
                  height: '400px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    pl: 4,
                    width: '30%'
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: { xs: '2rem', md: '2rem' },
                      lineHeight: 1.2,
                      mb: 2
                    }}
                  >
                    About This Tour
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      opacity: 0.9,
                      fontSize: '1.1rem'
                    }}
                  >
                    About this trip
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    right: '-30%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '90%',
                    height: '140%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    overflow: 'visible'
                  }}
                >
                  <img 
                    src="/public/assets/icons/tiburon.svg" 
                    alt="Tiburon" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transform: 'scale(1.5) translateX(5%)',
                      transformOrigin: 'center right'
                    }} 
                  />
                </Box>
              </Box>

            </Box>
            {/* Párrafos y secciones del tour */}
            <Box sx={{ bgcolor: '#22b6b0', p: 4 }}>

              {paragraphs.length > 0 && (
                <>
                  {paragraphs.map((paragraph, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 4,
                        p: 3,
                        bgcolor: '#06629B',
                        borderRadius: 2,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    >
                      {paragraph.title && (
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 2,
                            color: 'white',
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
                          color: 'white'
                        }}
                        dangerouslySetInnerHTML={{ __html: paragraph.text || '' }}
                      />
                    </Box>
                  ))}
                </>
              )}

            </Box>
            <Box sx={{ 
                bgcolor: '#00B3C6', 
                p: 4, 
                color: 'white'
              }}>
                <Typography variant="h4" sx={{ 
                  mb: 4, 
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  WHAT'S INCLUDED
                </Typography>
                <Grid container direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  {includedItems.length > 0 ? (
                    includedItems.map((item) => (
                      <Grid item sx={{ width: { xs: '100%', sm: '50%', md: '33%', lg: '25%' }, p: 1 }} key={item.id}>
                        <Box
                          sx={{
                            p: 3,
                            bgcolor: '#06629B',
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '300px',
                            justifyContent: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                            },
                            '&:hover img': {
                              transform: 'scale(1.15)'
                            }
                          }}
                        >
                          <Box 
                            sx={{
                              position: 'relative',
                              width: '100%',
                              height: '200px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              '&:hover .tooltip': {
                                opacity: 1,
                                visibility: 'visible',
                                transform: 'translateX(-50%) translateY(0)'
                              }
                            }}
                          >
                            <img 
                              src={`/public/assets/tours/${
                                item.title.toLowerCase().includes('almuerzo') ? 'VECTOR ALMUERZO.svg' :
                                item.title.toLowerCase().includes('toalla') ? 'VECTOR TOALLA.svg' :
                                item.title.toLowerCase().includes('snack') ? 'VECTOR SNAKS.svg' :
                                item.title.toLowerCase().includes('agua') ? 'VECTOR AGUA.svg' :
                                item.title.toLowerCase().includes('embarcacion') ? 'VECTOR EMBARQUE.svg' :
                                item.title.toLowerCase().includes('ferry') ? 'VECTOR FERRY3.svg' :
                                item.title.toLowerCase().includes('traje') ? 'VECTOR TRAJE.svg' :
                                'VECTOR AGUA.svg'
                              }`}
                              alt={item.title}
                              style={{ 
                                width: '180px', 
                                height: '180px',
                                objectFit: 'contain',
                                transform: 'scale(1.3)',
                                transition: 'all 0.3s ease'
                              }}
                            />
                            {item.description && (
                              <Box
                                className="tooltip"
                                sx={{
                                  position: 'absolute',
                                  bottom: '120%', // Posiciona el tooltip justo encima de la card
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  backgroundColor: '#f47c20',
                                  color: 'white',
                                  padding: '15px 20px',
                                  borderRadius: '12px',
                                  fontSize: '1rem',
                                  maxWidth: '300px',
                                  width: 'max-content',
                                  textAlign: 'center',
                                  zIndex: 9999, // Z-index más alto para asegurar que esté por encima de todo
                                  opacity: 0,
                                  visibility: 'hidden',
                                  transition: 'all 0.4s ease',
                                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                  fontWeight: '500',
                                  letterSpacing: '0.5px',
                                  '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '98%',
                                    left: '50%',
                                    marginLeft: '-8px',
                                    borderWidth: '8px',
                                    borderStyle: 'solid',
                                    borderColor: '#f47c20 transparent transparent transparent'
                                  }
                                }}
                              >
                                {item.description}
                              </Box>
                            )}
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              textTransform: 'uppercase',
                              mb: item.description ? 2 : 0
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Box
                              sx={{
                                position: 'relative',
                                '&:hover .tooltip': {
                                  opacity: 1,
                                  visibility: 'visible',
                                  transform: 'translateY(0)'
                                }
                              }}
                            >
                              {item.description && (
                                <Box
                                  className="tooltip"
                                  sx={{
                                    position: 'absolute',
                                    bottom: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%) translateY(10px)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    color: 'white',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    maxWidth: '250px',
                                    textAlign: 'center',
                                    zIndex: 1000,
                                    opacity: 0,
                                    visibility: 'hidden',
                                    transition: 'all 0.3s ease',
                                    '&::after': {
                                      content: '""',
                                      position: 'absolute',
                                      top: '100%',
                                      left: '50%',
                                      marginLeft: '-5px',
                                      borderWidth: '5px',
                                      borderStyle: 'solid',
                                      borderColor: 'rgba(0, 0, 0, 0.9) transparent transparent transparent'
                                    }
                                  }}
                                >
                                  {item.description}
                                </Box>
                              )}
                            </Box>
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


        {/* Paquetes del tour */}
        {/* {packages.length > 0 && (
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
        )} */}

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
