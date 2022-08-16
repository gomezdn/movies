import {
  fetchUserWatchlist,
  removeMovieFromWatchlist,
  addMovieToWatchlist,
} from '../features/watchlist/watchlistSlice';
import { MediaObject } from '../Types';
import { infoAlert } from '../services/alertsService';

async function addOrDelete(
  added: boolean,
  dispatch: Function,
  movieId: string,
  token: string,
  movieObject: MediaObject
) {
  if (added) {
    await dispatch(
      removeMovieFromWatchlist({
        movieId,
        token,
      })
    );
  } else {
    await dispatch(
      addMovieToWatchlist({
        movieId,
        token,
        movieObject,
      })
    );
  }
}
async function handleAddOrDeleteMovie(
  added: boolean,
  token: string,
  movieId: string,
  movieObject: MediaObject,
  dispatch: Function,
  idBeingUpdated: string
) {
  if (!token) {
    infoAlert('Log in first');
  } else if (!idBeingUpdated) {
    await addOrDelete(added, dispatch, movieId, token, movieObject);
    await dispatch(fetchUserWatchlist(token));
  }
}
export { handleAddOrDeleteMovie };
