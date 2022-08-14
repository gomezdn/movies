import { useSelector } from 'react-redux';
import { VStack, StackDivider } from '@chakra-ui/react';
import { tmdbAPI } from '../services/tmdbAPI';
import { useState, useEffect } from 'react';
import { MediaObject } from '../Types';
import { MediaCardsDisplay } from './MediaCardsDisplay';
import {
  getWatchlist,
  fetchUserWatchlist,
} from '../features/watchlist/watchlistSlice';
import { getUserData } from '../features/auth/authSlice';
import { useAppDispatch } from '../app/store';

export function TrendingDisplay() {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const watchlist = useSelector(getWatchlist) || ([] as MediaObject[]);
  const { token } = useSelector(getUserData);

  useEffect(() => {
    (async () => {
      if (token && watchlist.length == 0) {
        await dispatch(fetchUserWatchlist(token));
      }

      tmdbAPI.trending.movies().then((res) => {
        const sortedMoviesByPop = res.sort(
          (a: Record<string, number>, b: Record<string, number>) =>
            a.popularity - b.popularity
        );
        setMovies(sortedMoviesByPop);
      });

      tmdbAPI.trending.shows().then((res) => {
        const sortedShowsByPop = res.sort(
          (a: Record<string, number>, b: Record<string, number>) =>
            a.popularity - b.popularity
        );
        setShows(sortedShowsByPop);
      });
    })();
  }, []);

  return (
    <VStack
      divider={
        <StackDivider w="25%" borderColor="darkgray" alignSelf="center" />
      }
      w="100%"
      padding="2em"
      mt={['10em', '3em']}
      spacing="2em"
    >
      <MediaCardsDisplay
        size="230"
        mediaList={movies}
        heading="Trending movies"
      />
      <MediaCardsDisplay
        size="230"
        mediaList={shows}
        heading="Trending shows"
      />
    </VStack>
  );
}
