import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@components/Tabs/Tabs';
import CardList from '@components/CardList/CardList';
import SkeletonCardList from '@components/SkeletonCardList/SkeletonCardList';
import MovieCard from '@components/MovieCard/MovieCard';
import useFetchList from '@hooks/useFetchList';
import type { IMovie, ITab } from '@interfaces/index';
import ErrorBox from '@components/ErrorBox/ErrorBox';
import useFirstLoad from '@hooks/useFirstLoad';

type Props = {
  title: string;
  tabs: ITab[];
};

const DELAY = 1000;

const MovieCardListSection = ({ title, tabs }: Props) => {
  const firstLoad = useFirstLoad(DELAY);
  const [tab, setTab] = useState(tabs[0]);
  const { response, loading, error } = useFetchList<IMovie>(tab.url, DELAY);

  const handleChangeTab = (value: string) => {
    const newTab = tabs.find((t) => t.value === value) as ITab;

    setTab(newTab);
  };

  const renderedList = useMemo(
    () => (
      <Box sx={{ display: 'flex', minHeight: '240px' }}>
        {loading && firstLoad ? (
          <SkeletonCardList />
        ) : response?.results.length ? (
          <CardList<IMovie>
            items={response.results}
            renderItem={(data, index: number) => <MovieCard data={data} key={index} />}
          />
        ) : (
          <ErrorBox error={error?.message} />
        )}
      </Box>
    ),
    [loading, response, error, firstLoad],
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
