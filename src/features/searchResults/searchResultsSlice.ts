import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tmdbAPI } from '../../services/tmdbAPI';
import { ReduxState } from '../../Types';

const initialState = { searchResults: [], loading: false, fillerMsg: '' };

const searchAll = createAsyncThunk(
  'searchResults/searchAll',
  async (query: string) => {
    const results = await tmdbAPI.search.all(query);
    return results;
  }
);

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchAll.pending, (state) => {
        state.fillerMsg = 'SEARCHING...';
        state.searchResults = [];
        state.loading = true;
      })
      .addCase(searchAll.fulfilled, (state, action) => {
        const results = action.payload;
        if (results.length == 0) {
          state.fillerMsg = 'NOTHING FOUND';
        } else {
          state.searchResults = results;
          state.fillerMsg = '';
        }
        state.loading = false;
      });
  },
});

const getSearchResults = (state: ReduxState) =>
  state.searchResults.searchResults;
const getSearchResultsFiller = (state: ReduxState) =>
  state.searchResults.fillerMsg;
const getLoading = (state: ReduxState) => state.searchResults.loading;

export { searchAll, getSearchResults, getSearchResultsFiller, getLoading };
export default searchResultsSlice.reducer;
