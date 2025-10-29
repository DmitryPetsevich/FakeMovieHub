import type { ITab } from '@interfaces/index';
import { QUERIES } from '@constants/queries';

export const sections: Array<{
  title: string;
  tabs: ITab[];
}> = [
  {
    title: 'Trending',
    tabs: [
      {
        value: 'today',
        label: 'Today',
        url: QUERIES.movie_list_trending_day(),
      },
      {
        value: 'week',
        label: 'This Week',
        url: QUERIES.movie_list_trending_week(),
      },
    ],
  },
  {
    title: `What's popular`,
    tabs: [
      {
        value: 'streaming',
        label: 'Streaming',
        url: QUERIES.movie_list_popular_streaming(),
      },
      {
        value: 'rent',
        label: 'For Rent',
        url: QUERIES.movie_list_popular_rent(),
      },
      {
        value: 'in_theaters',
        label: 'In Theaters',
        url: QUERIES.movie_list_popular_theaters(),
      },
    ],
  },
  {
    title: 'Free to watch',
    tabs: [
      {
        value: 'movies',
        label: 'Movies',
        url: QUERIES.movie_list_free(),
      },
    ],
  },
];
