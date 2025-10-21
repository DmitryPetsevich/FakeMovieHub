import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { type SxProps, type Theme } from '@mui/material';

type Props = {
  sx?: SxProps<Theme>;
};

const SkeletonCard = ({ sx = {} }: Props) => (
  <Box
    sx={{
      flex: '0 0 150px',
      minHeight: '300px',
      mx: 1,
      ...sx,
    }}
  >
    <Skeleton variant="rectangular" height="225px" sx={{ mb: 1 }} />
    <Skeleton variant="rectangular" height="16px" sx={{ mb: 1 }} />
    <Skeleton variant="rectangular" height="16px" width="75%" />
  </Box>
);

export default SkeletonCard;
