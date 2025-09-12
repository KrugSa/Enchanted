import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsItems } from '../services/newsData';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Removed MUI carousel import

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsItems[Number(id)];

  if (!news) {
    return <Box p={4}><Typography variant="h5">Noticia no encontrada</Typography></Box>;
  }

  // Custom carousel logic
  const [current, setCurrent] = React.useState(0);
  const images = news.images || [];
  const handlePrev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const handleNext = () => setCurrent(current === images.length - 1 ? 0 : current + 1);

  return (
    <Box sx={{ maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 4, boxShadow: 3, p: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Volver</Button>
      <Typography variant="h4" gutterBottom>{news.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>{news.date}</Typography>
      {/* Imagen principal o carrusel si hay varias */}
      {news.images && news.images.length > 0 ? (
        <Box sx={{ position: 'relative', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', borderRadius: 2, mb: 2 }}>
          <Button onClick={handlePrev} sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', minWidth: 0, p: 1, zIndex: 2 }}>&lt;</Button>
          <img src={news.images[current]} alt={`img-${current}`} style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 8 }} />
          <Button onClick={handleNext} sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', minWidth: 0, p: 1, zIndex: 2 }}>&gt;</Button>
        </Box>
      ) : (
        <Box sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', borderRadius: 2, mb: 2 }}>
          <img src={news.imgSrc} alt={news.alt} style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 8 }} />
        </Box>
      )}
      <Typography variant="body1" sx={{ mt: 3 }}>{news.summary}</Typography>
    </Box>
  );
};

export default Details;
