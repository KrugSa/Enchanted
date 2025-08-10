import React from 'react';
import { Box, Typography } from '@mui/material';

const teamMembers = [
  {
    name: 'Andrea Hinojosa',
    imgSrc: 'src/assets/img/Daniela.png',
    alt: 'team-1',
    description: `My name is Andrea, and i really have the best job in the world; I make
      dreams come true and bring experiences to life. Thanks to my
      experience as travel designer and extensive traveling on my own, I
      know Ecuador better than the back of my hand. My favorite place in the
      world is Galapagos Islands and I can't wait to introduce you to the
      most beautiful and hidden places of my home, which of course, are
      included in our Galapagos Island Hopping Tours. Ecuador is a pretty
      unknown destination and a lot of people don´t know much about it, but
      the people who come to Ecuador are amazed by its beauty and diversity.
      So put Ecuador & The Enchanted Islands on your bucket list as it has
      so much to offer!!'`
  },
  {
    name: 'Daniela GomezJurado Zamora',
    imgSrc: 'src/assets/img/Daniela.png',
    alt: 'team-2',
    description: `I am a passionate professional in Graphic Design and Art. I have a
      solid academic background in Business Graphic Design Engineering,
      complemented by a Master’s degree in Training in Drawing and Fine Arts
      for Secondary Education. My technical and creative training allows me
      to approach design projects with a unique perspective, combining
      technical skills with a deep artistic understanding. My passion for
      art is reflected in every project I undertake. Designing is not just
      my career — it is my true passion. I love helping companies project an
      image that is not only visually appealing but also authentic and
      distinctive. My goal is to create design solutions that are memorable
      and truly resonate with each company's identity and values. As a
      person, I would describe myself as creative, dedicated, and
      enthusiastic. I enjoy the challenges involved in transforming ideas
      into effective and original visual solutions. My approach is always
      innovative, constantly seeking ways to stand out in a competitive and
      dynamic market.`
  },
  {
    name: 'Lorem ipsum dolor sit amet consectetur. Lacus nunc.',
    imgSrc: 'src/assets/img/Daniela.png',
    alt: 'team-3',
    description: `Soy una profesional apasionada por el Diseño Gráfico y el Arte. Cuento
      con una sólida formación académica en Ingeniería en Diseño Gráfico
      Empresarial, complementada con una Maestría en Formación en Dibujo y
      Artes Plásticas en Educación Secundaria. Mi formación técnica y
      creativa me permite abordar proyectos de diseño con una perspectiva
      única, integrando habilidades técnicas con un profundo conocimiento
      artístico.`
  },
  {
    name: 'Lorem ipsum dolor sit amet consectetur. Lacus nunc.',
    imgSrc: 'src/assets/img/Daniela.png',
    alt: 'team-4',
    description: `Soy una profesional apasionada por el Diseño Gráfico y el Arte. Cuento
      con una sólida formación académica en Ingeniería en Diseño Gráfico
      Empresarial, complementada con una Maestría en Formación en Dibujo y
      Artes Plásticas en Educación Secundaria. Mi formación técnica y
      creativa me permite abordar proyectos de diseño con una perspectiva
      única, integrando habilidades técnicas con un profundo conocimiento
      artístico.`
  }
];
export default function OurTeam() {
  if (teamMembers.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        No hay blogs disponibles.
      </Typography>
    );
  }

  return (
    <Box
      className="us-section"
      sx={{
        py: 8,           // Más padding vertical para mayor espacio arriba y abajo
        px: { xs: 2, md: 6 }, // Padding horizontal mayor en pantallas grandes
        maxWidth: '100%', // Ocupa el 100% del ancho de la ventana para más espacio
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
        Our Team
      </Typography>

      <Box
        className="us-grid"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',  // Siempre 4 columnas en pantallas medianas y arriba
          },
          gap: 6,  // Más espacio entre columnas y filas
        }}
      >
        {teamMembers.map(({ name, imgSrc, alt, description }, index) => (
          <Box
            key={index}
            className="us-item"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              px: 3,
              py: 4,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: 3,
              backgroundColor: '#00aba9',
            //   minHeight: 100,
              height: '600px',
               boxSizing: 'border-box',
            }}
          >
            <Box
              component="img"
              src={imgSrc}
              alt={alt}
              loading="lazy"
              sx={{
                width: '100%',   // Imagen más grande y adaptativa
                maxWidth: 250,
                height: 250,
                borderRadius: 3,
                mb: 3,
                objectFit: 'cover',
              }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = '/themes/custom/galapagos/images/about/team-photo.png';
              }}
            />
            <Typography
              variant="h6"
              component="h3"
              className="us-title"
              sx={{ fontWeight: 'bold', mb: 2 ,width: '100%', backgroundColor: '#e86d1a', color: 'white', borderRadius: '8px', padding: '10px' }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              className="us-about"
              sx={{ whiteSpace: 'pre-line', fontSize: 14, color: 'white', overflowY: 'auto', textAlign: 'justify' }}
            >
              {description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
