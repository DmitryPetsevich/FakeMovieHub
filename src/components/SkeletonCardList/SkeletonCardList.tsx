import { Stack, type SxProps, type Theme } from '@mui/material';
import SkeletonCard from '@components/SkeletonCard/SkeletonCard';

type Props = {
  size?: number;
  sx?: SxProps<Theme>;
};

const SkeletonCardList = ({ size = 10, sx = {} }: Props) => (
  <Stack
    direction="row"
    sx={{
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'thin',
      ...sx,
    }}
  >
    {[...Array(size)].map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </Stack>
);

export default SkeletonCardList;
