import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';
import searchResultsReducer from '../features/searchResults/searchResultsSlice';
import trendingReducer from '../features/trending/trendingSlice';

type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlist: watchlistReducer,
    searchResults: searchResultsReducer,
    trending: trendingReducer,
  },
});

export { store, useAppDispatch };
