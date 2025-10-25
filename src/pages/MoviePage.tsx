import { useParams } from 'react-router';
import MovieInfoSection from '@components/MovieInfoSection/MovieInfoSection';
import ReviewSection from '@components/ReviewSection/ReviewSection';
import CastCardListSection from '@components/CastCardListSection/CastCardListSection';
import useFetchMovieDetails from '@hooks/useFetchMovieDetails';
import { useMemo } from 'react';

const MoviePage = () => {
  const { id } = useParams();

  const { response } = useFetchMovieDetails(id as string);

  const trailerKey = useMemo(
    () => response?.videos.data.find(({ type }) => type === 'Trailer')?.key || '',
    [response],
  );

  return (
    <>
      <MovieInfoSection {...response.detail} trailerKey={trailerKey} />
      <CastCardListSection {...response.credits} />
      <ReviewSection {...response.reviews} />
    </>
  );
};

export default MoviePage;
