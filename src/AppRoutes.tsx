import { Heading } from '@chakra-ui/react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TrendingDisplay } from './components/TrendingDisplay';
import { SearchDisplay } from './components/SearchDisplay';
import { WatchlistDisplay } from './components/WatchlistDisplay';
import { InfoDisplayPage } from './components/InfoDisplay/InfoDisplayPage';
import { AuthForm } from './components/AuthForm';
import { useSelector } from 'react-redux';
import { getUserData } from './features/auth/authSlice';
import { AnimatedRoute } from './components/AnimatedRoute';

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
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<AnimatedRoute content={<Navigate to="/home" />} />}
        />

        <Route path="*" element={<AnimatedRoute content={<NotFound />} />} />

        <Route
          path="/auth/login"
          element={
            <AnimatedRoute
              content={
                token ? <Navigate to="/home" /> : <AuthForm signup={false} />
              }
            />
          }
        />

        <Route
          path="/auth/signup"
          element={
            <AnimatedRoute
              content={
                token ? <Navigate to="/home" /> : <AuthForm signup={true} />
              }
            />
          }
        />

        <Route
          path="/:type/:id/:titleForUrl"
          element={<AnimatedRoute content={<InfoDisplayPage />} />}
        />

        <Route
          path="/home"
          element={<AnimatedRoute content={<TrendingDisplay />} />}
        />

        <Route
          path="/watchlist"
          element={<AnimatedRoute content={<WatchlistDisplay />} />}
        />

        <Route
          path="/search/:query"
          element={<AnimatedRoute content={<SearchDisplay />} />}
        />
      </Routes>
    </AnimatePresence>
  );
}
