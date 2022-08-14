import { useSelector } from 'react-redux';
import { VStack, StackDivider, Progress } from '@chakra-ui/react';
import { tmdbAPI } from '../services/tmdbAPI';
import { useState, useEffect } from 'react';
import { MediaCardsDisplay } from './MediaCardsDisplay';
import { Filler } from './Filler';
import { fetchUserWatchlist } from '../features/watchlist/watchlistSlice';
import { getUserData } from '../features/auth/authSlice';
import { useAppDispatch } from '../app/store';

export function TrendingDisplay() {
  const dispatch = useAppDispatch();
  const [fetching, setFetching] = useState(false);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const { token } = useSelector(getUserData);

  useEffect(() => {
    (async () => {
      setFetching(true);

      if (token) {
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

  return fetching ? (
    <VStack mb={['5em', '15em']}>
      <Filler marginBottom="2em" fillerMsg="GETTING TRENDING TITLES..." />
      <Progress
        width={['300px', '800px']}
        height="20px"
        colorScheme="yellow"
        hasStripe
        isIndeterminate
      />
    </VStack>
  ) : (
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
