import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import VoteCircle from '@components/VoteCircle/VoteCircle';
import SectionWithBackground from '@components/SectionWithBackground/SectionWithBackground';
import { formatNumberWithCommas, normalizeMovieGenres, normalizeMovieRuntime } from '@utils/index';
import type { IMovie } from '@interfaces/index';
import { IMAGE_BASE_URL } from '@constants/index';
import { IMAGE_SIZES } from '@constants/imageSizes';

type Props = {
  data: IMovie | null;
};

const MovieInfoSection = ({ data }: Props) => {
  const [posterReady, setPosterReady] = useState(false);

  return (
    <SectionWithBackground
      backgroundImage={
        data ? `url(${IMAGE_BASE_URL}${IMAGE_SIZES.background}${data?.backdrop_path})` : ''
      }
      backgroundColor="rgba(10, 31, 58, 0.75)"
      sx={{
        py: 4,
      }}
    >
      <Stack
        sx={{
          position: 'relative',
          flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row',
            lg: 'row',
            xl: 'row',
          },
          width: {
            xs: '100%',
            sm: '100%',
            md: '70%',
            lg: '70%',
            xl: '70%',
          },
          margin: 'auto',
          zIndex: 1,
          gap: 2,
        }}
      >
        {data ? (
          <>
            <Box
              sx={{
                height: '450px',
                width: '300px',
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={`${IMAGE_BASE_URL}w780${data.poster_path}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  opacity: posterReady ? 1 : 0,
                  transition: 'all .2s',
                }}
                onLoad={() => setPosterReady(true)}
              />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{`${
                data.original_title
              } (${new Date(data.release_date).getFullYear()})`}</Typography>
              <Typography variant="body2">
                {normalizeMovieGenres(data.genres) + ' | ' + normalizeMovieRuntime(data.runtime)}
              </Typography>
              <Stack direction="row" gap={1} alignItems="center" my={2}>
                <VoteCircle score={data.vote_average} size={60} />
                <Typography>
                  User <br /> Score
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ fontStyle: 'italic ' }}>
                {data.tagline}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, my: 1 }}>
                Overview
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {data.overview}
              </Typography>
              <Typography variant="body1">Status: {data.status}</Typography>
              <Typography>Budget: {`${formatNumberWithCommas(data.budget)}`} $</Typography>
              <Typography>Revenue: {`${formatNumberWithCommas(data.revenue)}`} $</Typography>
            </Box>
          </>
        ) : (
          <>
            <Skeleton variant="rectangular" width="300px" height="450px" />
            <Box>
              <Skeleton variant="rectangular" width="300px" height="16px" />
              <Skeleton variant="rectangular" width="300px" height="16px" sx={{ my: 2 }} />
              <Skeleton variant="rectangular" width="600px" height="120px" sx={{ my: 2 }} />
            </Box>
          </>
        )}
      </Stack>
    </SectionWithBackground>
  );
};

export default MovieInfoSection;
