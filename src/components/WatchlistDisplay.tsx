import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Progress, VStack } from '@chakra-ui/react';
import { MediaResultsDisplay } from './MediaResultsDisplay';
import { Filler } from './Filler';
import { getUserData } from '../features/auth/authSlice';
import {
  getWatchlist,
  getIsFetchingWatchlist,
  fetchUserWatchlist,
} from '../features/watchlist/watchlistSlice';
import { useAppDispatch } from '../app/store';
import { MediaObject } from '../Types';

function WatchlistDisplay() {
  const dispatch = useAppDispatch();
  const { token } = useSelector(getUserData);
  const watchlist = useSelector(getWatchlist) || ([] as MediaObject[]);
  const fetching = useSelector(getIsFetchingWatchlist);

  useEffect(() => {
    if (token && watchlist.length == 0) {
      dispatch(fetchUserWatchlist(token));
    }
  }, []);

  const fillerContent = useMemo(() => {
    let msg = '';
    if (fetching) {
      msg = 'GETTING WATCHLIST...';
    } else if (token) {
      msg = "YOU HAVEN'T SAVED ANY TITLE YET";
    } else {
      msg = 'SIGN IN TO START SAVING TITLES';
    }

    return msg;
  }, [fetching, token]);

  return watchlist[0] ? (
    <MediaResultsDisplay resultsToDisplay={watchlist} />
  ) : (
    <VStack mb="15em">
      <Filler marginBottom="3em" fillerMsg={fillerContent} />
      <Progress
        display={fetching ? 'auto' : 'none'}
        width={['300px', '800px']}
        height="20px"
        colorScheme="orange"
        hasStripe
        isIndeterminate
      />
    </VStack>
  );
}

export { WatchlistDisplay };
