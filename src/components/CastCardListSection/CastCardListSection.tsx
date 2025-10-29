import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CastCard from '@components/CastCard/CastCard';
import CardList from '@components/CardList/CardList';
import SkeletonList from '@components/SkeletonCardList/SkeletonCardList';
import type { ICast } from '@interfaces/index';
import ErrorBox from '@components/ErrorBox/ErrorBox';
import useFirstLoad from '@hooks/useFirstLoad';

type Props = {
  data: ICast[];
  error: string | null;
};

const CastCardListSection = ({ data = [], error }: Props) => {
  const firstLoad = useFirstLoad();

  const renderedList = useMemo(
    () => (
      <Box sx={{ display: 'flex', minHeight: '320px' }}>
        {firstLoad ? (
          <SkeletonList />
        ) : data.length ? (
          <CardList<ICast>
            items={data}
            renderItem={(data, index) => <CastCard data={data} key={index} />}
            size={10}
            sx={{
              p: (theme) => theme.spacing(1, 0),
            }}
          />
        ) : (
          <ErrorBox error={error} />
        )}
      </Box>
    ),
    [data, firstLoad],
  );

  return (
    <Box
      component="section"
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
        py: 1,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        Top Billed Cast
      </Typography>
      {renderedList}
    </Box>
  );
};

export default CastCardListSection;
