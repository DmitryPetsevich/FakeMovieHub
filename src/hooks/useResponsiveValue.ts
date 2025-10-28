import { useTheme, useMediaQuery, type Breakpoint } from '@mui/material';

export default function useResponsiveValue<T>(values: Partial<Record<Breakpoint, T>> & { xs: T }) {
  const theme = useTheme();

  const isXL = useMediaQuery(theme.breakpoints.up('xl'));
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  if (values.xl && isXL) return values.xl;
  if (values.lg && isLG) return values.lg;
  if (values.md && isMD) return values.md;
  if (values.sm && isSM) return values.sm;

  return values.xs;
}
