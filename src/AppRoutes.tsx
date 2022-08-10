import { Heading } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TrendingDisplay } from './components/TrendingDisplay';
import { MediaObject, ReduxState } from './Types';
import { SearchDisplay } from './components/SearchDisplay';
import { WatchlistDisplay } from './components/WatchlistDisplay';
import { InfoDisplayPage } from './components/InfoDisplayPage';
import { AuthForm } from './components/AuthForm';
import { useSelector } from 'react-redux';

type AppRoutesProps = {
  fillerMsg: string;
  searchResults: MediaObject[];
  setSearchResults: Function;
  watchlist: MediaObject[];
  setWatchlist: Function;
  isLogged: boolean;
  setIsLogged: Function;
};

function NotFound() {
  return (
    <Heading
      fontFamily="saira"
      color="red.800"
      mt={['2em', '5em']}
      mb="7em"
      alignSelf="center"
    >
      NOTHING HERE
    </Heading>
  );
}

export function AppRoutes(props: AppRoutesProps) {
  const { token } = useSelector((state: ReduxState) => state.auth) || {
    token: '',
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/auth/login"
        element={token ? <Navigate to="/home" /> : <AuthForm signup={false} />}
      />
      <Route
        path="/auth/signup"
        element={token ? <Navigate to="/home" /> : <AuthForm signup={true} />}
      />

      <Route
        path="/:type/:id/:titleForUrl"
        element={
          <InfoDisplayPage
            watchlist={props.watchlist}
            setWatchlist={props.setWatchlist}
          />
        }
      />
      <Route
        path="/home"
        element={
          <TrendingDisplay
            watchlist={props.watchlist}
            setWatchlist={props.setWatchlist}
          />
        }
      />
      <Route
        path="/watchlist"
        element={
          <WatchlistDisplay
            watchlist={props.watchlist}
            setWatchlist={props.setWatchlist}
          />
        }
      />
      <Route
        path="/search/:query"
        element={
          <SearchDisplay
            fillerMsg={props.fillerMsg}
            watchlist={props.watchlist}
            setWatchlist={props.setWatchlist}
            searchResults={props.searchResults}
            isLogged={props.isLogged}
            setIsLogged={props.setIsLogged}
          />
        }
      />
    </Routes>
  );
}
