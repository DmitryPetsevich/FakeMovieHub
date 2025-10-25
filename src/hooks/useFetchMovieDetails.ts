import { useEffect, useState } from 'react';
import { QUERIES } from '@constants/queries';
import { fetchJSON } from '@utils/index';
import type { ICast, IMovie, IReview, IVideo } from '@interfaces/index';

export default function useFetchMovieDetails(id: string, delay = 1000) {
  const [response, setResponse] = useState<{
    detail: {
      data: IMovie | null;
      error: string | null;
    };
    videos: {
      data: IVideo[];
      error: string | null;
    };
    reviews: {
      data: IReview[];
      error: string | null;
    };
    credits: {
      data: ICast[];
      error: string | null;
    };
  }>({
    detail: {
      data: null,
      error: null,
    },
    videos: {
      data: [],
      error: null,
    },
    reviews: {
      data: [],
      error: null,
    },
    credits: {
      data: [],
      error: null,
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const requests: [
      Promise<IMovie>,
      Promise<{ id: number; results: IVideo[] }>,
      Promise<{ id: number; results: IReview[] }>,
      Promise<{ id: number; cast: ICast[] }>,
    ] = [
      fetchJSON(QUERIES.movie_detail(`movie/${id}`)),
      fetchJSON(QUERIES.movie_detail(`movie/${id}/videos`)),
      fetchJSON(QUERIES.movie_detail(`movie/${id}/reviews`)),
      fetchJSON(QUERIES.movie_detail(`movie/${id}/credits`)),
    ];

    let timerID: ReturnType<typeof setTimeout>;

    Promise.allSettled(requests)
      .then((response) => {
        const [detailResponse, videosResponse, reviewsResponse, creditsResponse] = response;

        setResponse({
          detail:
            detailResponse.status === 'fulfilled'
              ? { data: detailResponse.value, error: null }
              : { data: null, error: String(detailResponse.reason) },
          videos:
            videosResponse.status === 'fulfilled'
              ? { data: videosResponse.value.results, error: null }
              : { data: [], error: String(videosResponse.reason) },
          reviews:
            reviewsResponse.status === 'fulfilled'
              ? { data: reviewsResponse.value.results, error: null }
              : { data: [], error: String(reviewsResponse.reason) },
          credits:
            creditsResponse.status === 'fulfilled'
              ? { data: creditsResponse.value.cast, error: null }
              : { data: [], error: String(creditsResponse.reason) },
        });
      })
      .finally(() => {
        timerID = setInterval(() => {
          setLoading(false);
        }, delay);
      });

    return () => clearTimeout(timerID);
  }, [id, delay]);

  return { loading, response };
}
