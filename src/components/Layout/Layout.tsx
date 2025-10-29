import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

const Layout = () => (
  <ErrorBoundary>
    <Header />
    <Box component="main" sx={{ flex: 1 }}>
      <Outlet />
    </Box>
    <Footer />
  </ErrorBoundary>
);

export default Layout;
