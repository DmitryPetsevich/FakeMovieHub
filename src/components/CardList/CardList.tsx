import type { ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Stack, type SxProps, type Theme } from '@mui/material';

type Props<T> = {
  items: T[];
  renderItem: (data: T, index: number) => ReactElement;
  size?: number;
  sx?: SxProps<Theme>;
};

const CardList = <T,>({ items, renderItem, sx = {}, size = items.length }: Props<T>) => (
  <Stack
    direction="row"
    sx={{
      alignItems: 'stretch',
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'thin',
      ...sx,
    }}
  >
    <AnimatePresence>
      {items.slice(0, size).map((card, index) => renderItem(card, index))}
    </AnimatePresence>
  </Stack>
);

export default CardList;
