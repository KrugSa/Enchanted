import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const colors = ['#1177AE', '#E89A2B', '#19ABA8', '#14936F'];

const iconUrls = [
  'src/assets/icons/icono-piquero.svg',
  'src/assets/icons/icono-iguana.svg',
  'src/assets/icons/icono-foco.svg',
  'src/assets/icons/icono-pinguino.svg',
];

import { newsItems } from '../../services/newsData';

import { useNavigate } from 'react-router-dom';

function NewsItem({ id, title, summary, imgSrc, alt, newsUrl, color, iconSrc, images }) {
  const navigate = useNavigate();
  const hasCarousel = images && images.length > 1;
  const [current, setCurrent] = React.useState(0);
  const displayImg = hasCarousel ? images[current] : imgSrc;
  const handlePrev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const handleNext = () => setCurrent(current === images.length - 1 ? 0 : current + 1);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
        py: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: 3,
        backgroundColor: color,
        color: 'white',
        height: 600,
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        sx={{ fontWeight: 'bold', mb: 2, width: '100%', textAlign: 'left' }}
      >
        {title}
      </Typography>
      {/* Contenedor imagen + Read more pegado abajo izquierda */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 250,
          height: 250,
          mb: 4,
          borderRadius: 3,
          overflow: 'hidden',
          textAlign: 'left',
        }}
      >
        <Box
          component="img"
          src={displayImg}
          alt={alt}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 3,
          }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = 'src/assets/blog/default.png';
          }}
        />
        {hasCarousel && (
          <>
            <Button onClick={handlePrev} sx={{ position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)', minWidth: 0, p: 1, zIndex: 2, color: 'white', background: 'rgba(0,0,0,0.2)' }}>&lt;</Button>
            <Button onClick={handleNext} sx={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', minWidth: 0, p: 1, zIndex: 2, color: 'white', background: 'rgba(0,0,0,0.2)' }}>&gt;</Button>
          </>
        )}
        <Link
          href={`/details/${id}`}
          underline="hover"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            color: '#fff',
            fontWeight: 'bold',
            bgcolor: 'rgba(0,0,0,0.4)',
            px: 1,
            py: 0.5,
            borderBottomLeftRadius: 8,
            borderTopRightRadius: 8,
            cursor: 'pointer',
          }}
        >
          Read more
        </Link>
      </Box>
      {/* Contenedor texto + Read more */}
      <Box sx={{ width: '100%', textAlign: 'left', mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'pre-line',
            fontSize: 14,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {summary}
        </Typography>
        <Link
          href={`/details/${id}`}
          underline="hover"
          sx={{ color: '#fff', fontWeight: 'bold', cursor: 'pointer', mt: 1, display: 'inline-block' }}
        >
          Read more
        </Link>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2,
          mt: 'auto',
          pt: 2,
        }}
      >
        <Box
          component="img"
          src={iconSrc}
          alt="icono noticia"
          sx={{
            width: 60,
            height: 60,
            objectFit: 'contain',
            mr: 2,
            display: 'block',
          }}
        />
        <Button
          component="a"
          href={`/details/${id}`}
          variant="contained"
          sx={{
            backgroundColor: '#fff',
            color: color,
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: 13,
            px: 2,
            py: 0.5,
            borderRadius: '8px',
            width: 'auto',
            minWidth: 80,
            ml: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          startIcon={<ArrowForwardIcon sx={{ color: color }} />}
        >
          Leer más
        </Button>
      </Box>
    </Box>
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
        py: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: 3,
        backgroundColor: color,
        color: 'white',
        height: 600,
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        sx={{ fontWeight: 'bold', mb: 2, width: '100%', textAlign: 'left' }}
      >
        {title}
      </Typography>

      {/* Contenedor imagen + Read more pegado abajo izquierda */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 250,
          height: 250,
          mb: 4,
          borderRadius: 3,
          overflow: 'hidden',
          textAlign: 'left',
        }}
      >
        <Box
          component="img"
          src={imgSrc}
          alt={alt}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 3,
          }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = 'src/assets/blog/default.png';
          }}
        />
        <Link
          href={newsUrl}
          underline="hover"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            color: '#fff',
            fontWeight: 'bold',
            bgcolor: 'rgba(0,0,0,0.4)',
            px: 1,
            py: 0.5,
            borderBottomLeftRadius: 8,
            borderTopRightRadius: 8,
            cursor: 'pointer',
          }}
        >
          Read more
        </Link>
      </Box>

      {/* Contenedor texto + Read more */}
      <Box sx={{ width: '100%', textAlign: 'left', mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'pre-line',
            fontSize: 14,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {summary}
        </Typography>
        <Link
          href={newsUrl}
          underline="hover"
          sx={{ color: '#fff', fontWeight: 'bold', cursor: 'pointer', mt: 1, display: 'inline-block' }}
        >
          Read more
        </Link>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto',
          pt: 2,
        }}
      >
        <Box
          component="img"
          src={iconSrc}
          alt="icono noticia"
          sx={{ width: 70, height: 70 }}
        />

        <Button
          component="a"
          href={newsUrl}
          variant="contained"
          sx={{
            backgroundColor: '#fff',
            color: color,
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: 16,
            px: 3,
            py: 1,
            borderRadius: '8px',
            width: '100%',
            ml: 2,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          startIcon={<ArrowForwardIcon sx={{ color: color }} />}
        >
          Leer más
        </Button>
      </Box>
    </Box>
  );
}



export default function NewsSection() {
  if (newsItems.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        No hay noticias disponibles.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        maxWidth: '100%',
        margin: 'auto',
        backgroundImage: 'url(src/assets/background/background-tours.png)',
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ mb: 6, fontWeight: 'bold' }}
      >
        Recent Posts
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 6,
        }}
      >
        {newsItems.map((news, index) => (
          <NewsItem
            key={index}
            id={index}
            title={news.title}
            summary={news.summary || news.description}
            imgSrc={news.imgSrc || (news.images && news.images[0])}
            alt={news.alt || news.title}
            newsUrl={news.newsUrl || `/details/${index}`}
            date={news.date}
            color={colors[index % colors.length]}
            iconSrc={iconUrls[index % iconUrls.length]}
            images={news.images}
          />
        ))}
      </Box>
    </Box>
  );
}
