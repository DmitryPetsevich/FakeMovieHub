import { useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CastCard from '@components/CastCard/CastCard';
import CardList from '@components/CardList/CardList';
import SkeletonList from '@components/SkeletonCardList/SkeletonCardList';
import type { ICast } from '@interfaces/index';

type Props = {
  loading: boolean;
  data?: ICast[];
};

const CastCardListSection = ({ loading, data = [] }: Props) => {
  const firstLoad = useRef(true);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      firstLoad.current = false;
    }, 1000);

    return () => clearTimeout(timeoutID);
  }, []);

  const renderedList = useMemo(
    () => (
      <Box sx={{ display: 'flex', minHeight: '320px' }}>
        {loading && firstLoad.current ? (
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
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'lightgrey',
            }}
          >
            <Typography variant="h4" color="error">
              Oops! Something went wrong!
            </Typography>
            <Typography variant="h5">Try reload the page or turn your VPN on!</Typography>
          </Box>
        )}
      </Box>
    ),
    [data, loading],
  );

  return (
    <Box
      component="section"
      sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: '70%',
          lg: '70%',
          xl: '70%',
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
