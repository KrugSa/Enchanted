import { Box, Typography } from '@mui/material';

const GreenLine = ({ imageSrc, altText, titleText }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#00aba9', // verde similar a "green-line"
        padding: '10px 20px',
        gap: 2,
        borderRadius: '4px',
        marginTop: 2,
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={altText}
        width={70}
        height={70}
        loading="lazy"
        sx={{ flexShrink: 0 }}
      />
      <Typography
        variant="h6"
        component="p"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          margin: 0,
        }}
      >
        {titleText}
      </Typography>
    </Box>
  );
};

export default GreenLine;