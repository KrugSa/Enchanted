
import React, { useState } from 'react';
import { Box, Typography, Button, Pagination } from '@mui/material';
import NavBarComponent from '../components/NavBar/NavBarComponent';
import { BannerBackground, BannerTitle } from '../components/Banner/Banner_background';
import GreenLine from '../components/Green_Line/Green_line';
import TransitionSection from '../components/Transition/Transition';
import FooterSection from '../components/Footer/FooterSection';
import { newsItems } from '../services/newsData';

export function Our_Blog() {
  const [page, setPage] = useState(1);
  const postsPerPage = 1;
  const totalPages = Math.ceil(newsItems.length / postsPerPage);
  const handleChange = (event, value) => setPage(value);
  const currentNews = newsItems.slice((page - 1) * postsPerPage, page * postsPerPage)[0];

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
        <BannerBackground imageUrl="public/assets/background/our_blog.jpg" alt="Our Blog">
          <BannerTitle title="Our Blog" sx={{ textTransform: 'uppercase' }} />
        </BannerBackground>
      </Box>

      <Box sx={{ paddingTop: '360px' }}>
        <GreenLine
          imageSrc="public/assets/icons/icon-blog.svg"
          altText="Blog Icon"
          titleText="Read our latest news and articles"
        />

        {/* Blog Content - formato blog */}
        <Box sx={{ maxWidth: '800px', margin: '20px auto', padding: '40px 20px', background: '#fff', borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
          {currentNews ? (
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                {currentNews.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                {currentNews.date}
              </Typography>
              {currentNews.imgSrc && (
                <Box sx={{ width: '100%', textAlign: 'center', mb: 3 }}>
                  <img src={currentNews.imgSrc} alt={currentNews.alt} style={{ maxWidth: '100%', borderRadius: 8 }} />
                </Box>
              )}
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
                {currentNews.summary}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" align="center">No hay noticias disponibles.</Typography>
          )}
          {/* Paginación numérica */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
          </Box>
        </Box>
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

export default Our_Blog;