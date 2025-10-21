import { useMemo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material';

type Props = {
  score: number;
  size?: number;
  sx?: SxProps<Theme>;
};

const VoteCircle = ({ score, size = 40, sx = {} }: Props) => {
  const value = useMemo(() => Math.round(score * 10), [score]);
  const color = useMemo(
    () => (value >= 70 ? '#21d07a' : value >= 40 ? '#d2d531' : '#db2360'),
    [value],
  );

  return (
    <Box
      height={size}
      width={size}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          borderRadius: '50%',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <Typography variant="caption" component="div">{`${value}%`}</Typography>
      </Box>
      <CircularProgress variant="determinate" size={size - 4} value={value} sx={{ color }} />
    </Box>
  );
};

export default VoteCircle;
