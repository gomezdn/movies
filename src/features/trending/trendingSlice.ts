import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTrendingTitles } from '../../services/getTrendingTitles';
import { MediaObject, TrendingState, ReduxState } from '../../Types';

const initialState: TrendingState = {
  trendingMovies: [],
  trendingShows: [],
  loading: false,
};

const fetchTrending = createAsyncThunk('trending/fetchTrending', async () => {
  return await getTrendingTitles();
});

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTrending.fulfilled,
        (state, { payload: { movies, shows } }) => {
          if (movies && shows) {
            state.trendingMovies = movies as MediaObject[];
            state.trendingShows = shows as MediaObject[];
          }
          state.loading = false;
        }
      );
  },
});

const getTrendingLoading = (state: ReduxState) => state.trending.loading;
const getTrendingMovies = (state: ReduxState) => state.trending.trendingMovies;
const getTrendingShows = (state: ReduxState) => state.trending.trendingShows;

export {
  fetchTrending,
  getTrendingLoading,
  getTrendingMovies,
  getTrendingShows,
};
export default trendingSlice.reducer;
