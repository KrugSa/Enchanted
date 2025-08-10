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

const newsItems = [
  {
    title: 'Nueva ruta de turismo sostenible en Galápagos',
    imgSrc: 'src/assets/blog/Santa_Cruz.png',
    alt: 'news-1',
    summary: `The Galapagos Archipelago is made up of 13 major islands and numerous smaller islands, islets and rocks.
The four main inhabited islands in the Galapagos are Santa Cruz, San Cristobal, Isabela, and Floreana. These islands have permanent settlements and are home to the majority of the Galapagos' population.`,
    date: '2025-07-01',
    newsUrl: '/news/sostenible-galapagos',
  },
  {
    title: 'Campaña de limpieza en playas de Santa Cruz',
    imgSrc: 'src/assets/blog/pre-arrival.png',
    alt: 'news-2',
    summary: `Voluntarios y organizaciones se unen en una campaña para limpiar las playas más visitadas de Santa Cruz, mejorando así el entorno natural y la experiencia de los visitantes.`,
    date: '2025-06-15',
    newsUrl: '/news/limpieza-santa-cruz',
  },
  {
    title: 'Innovación en transporte ecológico para tours',
    imgSrc: 'src/assets/blog/cueva.jpg',
    alt: 'news-3',
    summary: `Las compañías de tours en Galápagos están adoptando vehículos eléctricos y embarcaciones solares para reducir la huella de carbono y proteger el ecosistema.`,
    date: '2025-05-20',
    newsUrl: '/news/transporte-ecologico',
  },
  {
    title: 'Nueva exhibición en el museo de ciencias naturales',
    imgSrc: 'src/assets/blog/playa.jpg',
    alt: 'news-4',
    summary: `El Museo de Ciencias Naturales de Galápagos inaugura una exposición interactiva sobre la evolución de las especies en las islas.`,
    date: '2025-04-10',
    newsUrl: '/news/exhibicion-museo',
  },
];

function NewsItem({ title, imgSrc, alt, summary, date, newsUrl, color, iconSrc }) {
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
            {...news}
            color={colors[index % colors.length]}
            iconSrc={iconUrls[index % iconUrls.length]}
          />
        ))}
      </Box>
    </Box>
  );
}
