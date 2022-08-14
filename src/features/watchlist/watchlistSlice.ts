import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { watchlistAPI } from '../../services/watchlistAPI';
import { MediaObject, ReduxState } from '../../Types';

const initialState = {
  userWatchlist: [],
  message: '',
  fetching: false,
  updatingId: '',
};

const fetchUserWatchlist = createAsyncThunk(
  'watchlist/fetchUserWatchlist',
  async (token: string) => {
    return await watchlistAPI.getWatchlist(token);
  }
);

const addMovieToWatchlist = createAsyncThunk(
  'watchlist/addMovieToWatchlist',
  async (data: {
    movieId: string;
    token: string;
    movieObject: MediaObject;
  }) => {
    return await watchlistAPI.addMovieToWatchlist(
      data.movieId,
      data.token,
      data.movieObject
    );
  }
);

const removeMovieFromWatchlist = createAsyncThunk(
  'watchlist/removeMovieFromWatchlist',
  async (data: { movieId: string; token: string }) => {
    return await watchlistAPI.removeMovieFromWatchlist(
      data.movieId,
      data.token
    );
  }
);

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearWatchlist: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserWatchlist.pending, (state) => {
        state.fetching = true;
      })
      .addCase(
        fetchUserWatchlist.fulfilled,
        (state, { payload: { userWatchlist, error } }) => {
          state.fetching = false;
          state.updatingId = '';
          if (error) {
            state.message = error;
          } else {
            const newestFirst = userWatchlist.sort(
              (
                movie1: { historicalPosition: number },
                movie2: { historicalPosition: number }
              ) => {
                return movie2.historicalPosition - movie1.historicalPosition;
              }
            );
            state.userWatchlist = newestFirst;
          }
        }
      )
      .addCase(addMovieToWatchlist.pending, (state, action) => {
        state.updatingId = action.meta.arg.movieId;
      })
      .addCase(
        addMovieToWatchlist.fulfilled,
        (state, { payload: { error, message } }) => {
          state.fetching = false;
          state.message = error || message;
        }
      )
      .addCase(removeMovieFromWatchlist.pending, (state, action) => {
        state.updatingId = action.meta.arg.movieId;
      })
      .addCase(
        removeMovieFromWatchlist.fulfilled,
        (state, { payload: { error, message } }) => {
          state.fetching = false;
          state.message = error || message;
        }
      );
  },
});

const getWatchlist = (state: ReduxState) => state.watchlist.userWatchlist;
const getIsFetchingWatchlist = (state: ReduxState) => state.watchlist.fetching;
const getIdBeingUpdated = (state: ReduxState) => state.watchlist.updatingId;

const { clearWatchlist } = watchlistSlice.actions;

export {
  clearWatchlist,
  fetchUserWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  getWatchlist,
  getIsFetchingWatchlist,
  getIdBeingUpdated,
};
export default watchlistSlice.reducer;
