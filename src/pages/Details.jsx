import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsItems } from '../services/newsData';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsItems[Number(id)];

  if (!news) {
    return (
      <Box p={4}>
        <Typography variant="h5">Noticia no encontrada</Typography>
      </Box>
    );
  }

  // Custom carousel logic
  const [current, setCurrent] = React.useState(0);
  const images = news.images || [];
  const handlePrev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const handleNext = () => setCurrent(current === images.length - 1 ? 0 : current + 1);

  // Split summary into paragraphs for better readability
  const summaryParagraphs = news.summary
    ? news.summary.split('\n').filter(Boolean)
    : [];

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        maxWidth: '100%',
        margin: 'auto',
        backgroundImage: 'url(src/assets/background/background-tours.png)',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ maxWidth: 900, margin: '0 auto', background: 'rgba(255,255,255,0.97)', borderRadius: 5, boxShadow: '0 8px 32px rgba(60,60,60,0.10)', p: { xs: 2, sm: 5 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            color: '#444',
            fontWeight: 600,
            textTransform: 'none',
            background: '#fff',
            borderRadius: '8px',
            px: 2.5,
            py: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            '&:hover': { background: '#f0f0f0' },
          }}
          variant="outlined"
        >
          Volver
        </Button>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: 1,
            color: '#1177AE',
            letterSpacing: '-1px',
            fontFamily: 'inherit',
            background: '#e3e3e3',
            borderRadius: 2,
            px: 2,
            py: 1,
            display: 'inline-block',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          {news.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              background: '#f47c20',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 16,
              fontWeight: 500,
              color: '#fff',
              mr: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {news.date}
          </Box>
          <Divider sx={{ flexGrow: 1, borderColor: '#e0e0e0' }} />
        </Box>

        {/* Imagen principal o carrusel si hay varias */}
        {news.images && news.images.length > 0 ? (
          <Box
            sx={{
              position: 'relative',
              height: { xs: 220, sm: 350 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#e3e3e3',
              borderRadius: 3,
              mb: 4,
              overflow: 'hidden',
            }}
          >
            <Button
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                minWidth: 0,
                p: 1.2,
                zIndex: 2,
                background: '#fff',
                borderRadius: '50%',
                boxShadow: 2,
                color: '#444',
                '&:hover': { background: '#ececec' },
              }}
            >
              &lt;
            </Button>
            <img
              src={news.images[current]}
              alt={`img-${current}`}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                borderRadius: 12,
                objectFit: 'cover',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                transition: 'all 0.3s',
              }}
            />
            <Button
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                minWidth: 0,
                p: 1.2,
                zIndex: 2,
                background: '#fff',
                borderRadius: '50%',
                boxShadow: 2,
                color: '#444',
                '&:hover': { background: '#ececec' },
              }}
            >
              &gt;
            </Button>
            {/* Indicadores de carrusel */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
              }}
            >
              {images.map((_, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: idx === current ? '#1177AE' : '#bbb',
                    opacity: idx === current ? 0.9 : 0.5,
                    transition: 'background 0.2s',
                  }}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: { xs: 220, sm: 350 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#e3e3e3',
              borderRadius: 3,
              mb: 4,
              overflow: 'hidden',
            }}
          >
            <img
              src={news.imgSrc}
              alt={news.alt}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                borderRadius: 12,
                objectFit: 'cover',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              }}
            />
          </Box>
        )}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 4 },
            background: '#fff',
            borderLeft: '5px solid #1177AE',
            borderRadius: 3,
            mt: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          {summaryParagraphs.length > 0 ? (
            summaryParagraphs.map((p, idx) => (
              <Typography
                key={idx}
                variant="body1"
                sx={{
                  mb: 2.5,
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: '#222',
                  fontFamily: 'inherit',
                  letterSpacing: '0.01em',
                  textAlign: 'justify',
                }}
              >
                {p}
              </Typography>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontSize: 18,
                lineHeight: 1.8,
                color: '#222',
                fontFamily: 'inherit',
                letterSpacing: '0.01em',
                textAlign: 'justify',
              }}
            >
              {news.summary}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Details;
