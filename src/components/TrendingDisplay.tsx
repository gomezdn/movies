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
  const [fetching, setFetching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const watchlist = useSelector(getWatchlist) || ([] as MediaObject[]);
  const { token } = useSelector(getUserData);

  useEffect(() => {
    setFetching(true);

    (async () => {
      if (token && watchlist.length == 0) {
        await dispatch(fetchUserWatchlist(token));
      }

      const movies = await tmdbAPI.trending.movies();
      const sortedMoviesByPop = movies.sort(
        (a: Record<string, number>, b: Record<string, number>) =>
          a.popularity - b.popularity
      );
      setMovies(sortedMoviesByPop);

      const shows = await tmdbAPI.trending.shows();
      const sortedShowsByPop = shows.sort(
        (a: Record<string, number>, b: Record<string, number>) =>
          a.popularity - b.popularity
      );
      setShows(sortedShowsByPop);

      setFetching(false);
    })();
  }, []);

  return (
    <VStack
      visibility={fetching ? 'hidden' : 'visible'}
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
