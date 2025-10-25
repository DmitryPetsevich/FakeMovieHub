import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material';

type Props = {
  error?: string | null;
  sx?: SxProps<Theme>;
};

const ErrorBox = ({ error = '', sx = {} }: Props) => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.11)',
      ...sx,
    }}
  >
    <Typography variant="h4" color="error">
      {error || 'Oops! Something went wrong!'}
    </Typography>
    <Typography variant="h5">Try reload the page or turn your VPN on!</Typography>
  </Box>
);

export default ErrorBox;
