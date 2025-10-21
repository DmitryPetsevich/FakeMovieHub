import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@components/Tabs/Tabs';
import CardList from '@components/CardList/CardList';
import SkeletonCardList from '@components/SkeletonCardList/SkeletonCardList';
import MovieCard from '@components/MovieCard/MovieCard';
import useFetchList from '@hooks/useFetchList';
import type { IMovie, ITab } from '@interfaces/index';

type Props = {
  title: string;
  tabs: ITab[];
};

const DELAY = 1000;

const MovieCardListSection = ({ title, tabs }: Props) => {
  const firstLoad = useRef(true);
  const [tab, setTab] = useState(tabs[0]);
  const { response, loading, error } = useFetchList<IMovie>(tab.url, DELAY);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      firstLoad.current = false;
    }, DELAY);

    return () => clearTimeout(timeoutID);
  }, []);

  const handleChangeTab = (value: string) => {
    const newTab = tabs.find((t) => t.value === value) as ITab;

    setTab(newTab);
  };

  const renderedList = useMemo(
    () => (
      <Box sx={{ display: 'flex', minHeight: '240px' }}>
        {loading && firstLoad.current ? (
          <SkeletonCardList />
        ) : response?.results.length ? (
          <CardList<IMovie>
            items={response.results}
            renderItem={(data, index: number) => <MovieCard data={data} key={index} />}
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
            {error ? (
              <>
                <Typography variant="h4" color="error">
                  Oops! {error.message || 'Something went wrong!'}
                </Typography>
                <Typography variant="h5">Try reload the page or turn your VPN on!</Typography>
              </>
            ) : (
              <Typography variant="h5">No results...</Typography>
            )}
          </Box>
        )}
      </Box>
    ),
    [loading, response, error, firstLoad.current],
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
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          px: 4,
          py: 1,
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: '500' }}>
          {title}
        </Typography>
        {tabs.length ? (
          <Tabs tabs={tabs} value={tab.value} onChange={(value) => handleChangeTab(value)} />
        ) : null}
      </Box>
      {renderedList}
    </Box>
  );
};

export default MovieCardListSection;
