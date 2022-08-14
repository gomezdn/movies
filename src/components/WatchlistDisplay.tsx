import { useSelector } from 'react-redux';
import { Filler } from './Filler';
import { MediaResultsDisplay } from './MediaResultsDisplay';
import { useEffect } from 'react';
import { getUserData } from '../features/auth/authSlice';
import {
  getWatchlist,
  fetchUserWatchlist,
} from '../features/watchlist/watchlistSlice';
import { useAppDispatch } from '../app/store';
import { MediaObject } from '../Types';

function WatchlistDisplay() {
  const dispatch = useAppDispatch();

  const { token } = useSelector(getUserData);
  const watchlist = useSelector(getWatchlist) || ([] as MediaObject[]);

  useEffect(() => {
    if (token && watchlist.length == 0) {
      dispatch(fetchUserWatchlist(token));
    }
  }, []);

  function content(fillerMsg: string) {
    return watchlist[0] ? (
      <MediaResultsDisplay resultsToDisplay={watchlist} />
    ) : (
      <Filler fillerMsg={fillerMsg} />
    );
  }

  return content(
    token ? "YOU HAVEN'T SAVED ANY TITLE YET" : 'SIGN IN TO START SAVING TITLES'
  );
}

export { WatchlistDisplay };
