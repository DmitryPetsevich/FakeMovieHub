import type { IUrl } from '@interfaces/index';
import { API_BASE_URL } from '.';

export const QUERIES: {
  [key: string]: (path?: string, params?: Record<string, string | number>) => IUrl;
} = {
  movie_list_trending_day: (path = '', params = {}) => ({
    base: API_BASE_URL,
    path: path || 'trending/movie/day',
    params: {
      ...params,
    },
  }),
  movie_list_trending_week: (path = '', params = {}) => ({
    base: API_BASE_URL,
    path: path || 'trending/movie/week',
    params: {
      ...params,
    },
  }),
  movie_list_popular_streaming: (path = '', params = {}) => ({
    base: API_BASE_URL,
    path: path || 'discover/movie',
    params: {
      sort_by: 'popularity.desc',
      with_watch_monetization_types: 'flatrate',
      language: 'en-US',
      watch_region: 'US',
      ...params,
    },
  }),
  movie_list_popular_rent: (path = '', params = {}) => ({
    base: API_BASE_URL,
    path: path || 'discover/movie',
    params: {
      sort_by: 'popularity.desc',
      with_watch_monetization_types: 'rent',
      language: 'en-US',
      watch_region: 'US',
      ...params,
    },
  }),
  movie_list_popular_theaters: (path = '', params = {}) => ({
    base: API_BASE_URL,
    path: path || 'movie/now_playing',
    params: {
      region: 'US',
      ...params,
    },
  }),
  movie_list_free: (path = '', params = {}) => ({
    base: API_BASE_URL,
    path: path || 'discover/movie',
    params: {
      sort_by: 'popularity.desc',
      with_watch_monetization_types: 'free',
      watch_region: 'US',
      ...params,
    },
  }),
  movie_detail: (path = '', params = {}) => ({
    base: API_BASE_URL,
    path,
    params: {
      append_to_response: 'credits,reviews,videos',
      ...params,
    },
  }),
};
