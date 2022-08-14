import {
  fetchUserWatchlist,
  removeMovieFromWatchlist,
  addMovieToWatchlist,
} from '../features/watchlist/watchlistSlice';
import { MediaObject } from '../Types';
import { infoAlert } from '../services/alertsService';

async function handleAddOrDeleteMovie(
  added: boolean,
  token: string,
  movieId: string,
  movieObject: MediaObject,
  dispatch: Function
) {
  if (token) {
    if (added) {
      await dispatch(
        removeMovieFromWatchlist({
          movieId,
          token,
        })
      );

      await dispatch(fetchUserWatchlist(token));
    } else {
      await dispatch(
        addMovieToWatchlist({
          movieId,
          token,
          movieObject,
        })
      );

      await dispatch(fetchUserWatchlist(token));
    }
  } else {
    infoAlert('Log in first');
  }
}

export { handleAddOrDeleteMovie };
