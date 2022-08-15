import { useSelector } from 'react-redux';
import { VStack, StackDivider, Progress } from '@chakra-ui/react';
import { useEffect } from 'react';
import { MediaCardsDisplay } from './MediaCardsDisplay';
import { Filler } from './Filler';
import { getUserData } from '../features/auth/authSlice';
import {
  fetchTrending,
  getTrendingLoading,
  getTrendingMovies,
  getTrendingShows,
} from '../features/trending/trendingSlice';
import {
  getWatchlist,
  fetchUserWatchlist,
} from '../features/watchlist/watchlistSlice';
import { useAppDispatch } from '../app/store';

export function TrendingDisplay() {
  const dispatch = useAppDispatch();
  const movies = useSelector(getTrendingMovies);
  const shows = useSelector(getTrendingShows);
  const fetching = useSelector(getTrendingLoading);

  const { token } = useSelector(getUserData);
  const watchlist = useSelector(getWatchlist);

  useEffect(() => {
    (async () => {
      if (token && !watchlist[0]) {
        await dispatch(fetchUserWatchlist(token));
      }
      dispatch(fetchTrending());
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
