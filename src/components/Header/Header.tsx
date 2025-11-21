import { Link } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Header = () => (
  <Box
    component="header"
    sx={{
      position: 'sticky',
      top: 0,
      flex: '0 0 auto',
      zIndex: 999,
      bgcolor: 'rgb(3, 37, 65)',
      py: 2,
    }}
  >
    <Box
      component="div"
      sx={{
        width: {
          xs: '100%',
          md: '70%',
        },
        px: {
          xs: 2,
          md: 0,
        },
        mx: 'auto',
      }}
    >
      <Typography
        component={Link}
        to={'/'}
        sx={{
          fontWeight: 500,
          fontSize: '2rem',
          textDecoration: 'none',
          background: 'linear-gradient(90deg, rgb(30, 213, 169), rgb(1, 180, 228))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        FMDB
      </Typography>
    </Box>
  </Box>
);

export default Header;
