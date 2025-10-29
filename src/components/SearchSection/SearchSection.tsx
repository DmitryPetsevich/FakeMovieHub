import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import backgroundImage from '@assets/header_bg.png';
import Search from '@components/Search/Search';
import SectionWithBackground from '@components/SectionWithBackground/SectionWithBackground';

const SearchSection = () => (
  <SectionWithBackground
    backgroundImage={`url(${backgroundImage})`}
    backgroundColor="rgba(10, 31, 58, 0.75)"
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minHeight: '300px',
        width: {
          xs: '100%',
          md: '70%',
        },
        px: {
          xs: 2,
          md: 0,
        },
        paddingTop: (theme) => theme.spacing(2),
        mx: 'auto',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: '500' }}>
        Welcome.
      </Typography>
      <Typography variant="h4">Millions of movies. Explore now</Typography>
      <Search />
    </Box>
  </SectionWithBackground>
);

export default SearchSection;
