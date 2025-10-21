import type { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material';

type Props = {
  backgroundImage?: string;
  backgroundColor?: string;
  children?: ReactNode;
  sx?: SxProps<Theme>;
};

const SectionWithBackground: FC<Props> = ({
  children,
  backgroundImage = '',
  backgroundColor = '',
  sx = {},
}) => (
  <Box
    component="section"
    sx={{
      position: 'relative',
      backgroundImage,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      color: 'white',
      ':before': {
        display: 'block',
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor,
      },
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default SectionWithBackground;
