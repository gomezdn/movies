import { Heading } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TrendingDisplay } from './components/TrendingDisplay';
import { SearchDisplay } from './components/SearchDisplay';
import { WatchlistDisplay } from './components/WatchlistDisplay';
import { InfoDisplayPage } from './components/InfoDisplay/InfoDisplayPage';
import { AuthForm } from './components/AuthForm';
import { useSelector } from 'react-redux';
import { getUserData } from './features/auth/authSlice';

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

export function AppRoutes() {
  const { token } = useSelector(getUserData);

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

      <Route path="/:type/:id/:titleForUrl" element={<InfoDisplayPage />} />
      <Route path="/home" element={<TrendingDisplay />} />
      <Route path="/watchlist" element={<WatchlistDisplay />} />
      <Route path="/search/:query" element={<SearchDisplay />} />
    </Routes>
  );
}
