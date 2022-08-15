type MediaObject = Record<string, string | boolean | number>;

type MediaInfo = Record<
  string,
  string | boolean | number | (object | string | number)[]
>;

type TitleInfoObject = {
  name: string;
  originalName: string;
  poster: string;
  backdrop: string;
  rating: string;
  totalVotes: string;
  duration: string | number;
  year: string;
  description: string;
  genres: string[];
  countries: string[];
  trailer: string;
  stars: MediaObject[];
  actors: MediaObject[];
  directors: MediaObject[];
  isAnimation: boolean;
  seasonsNumber: string;
  episodesNumber: string;
  recommendations: MediaObject[];
};

type PersonInfoObject = {
  birthday: string;
  deathday: string;
  role: string;
  name: string;
  biography: string;
  origin: string;
  image: string;
  knownFor: PersonJobs;
};

type PersonJobs = {
  crew: Record<string, MediaObject[]>;
  crewJobNames: string[];
  cast: MediaObject[];
};

interface AuthState {
  userData: {
    username: string;
    token: string;
  };
  loading: boolean;
  authMessage: { color: string; message: string };
}

interface WatchlistState {
  userWatchlist: MediaObject[];
  message: string;
  fetching: boolean;
  updatingId: string;
}

interface SearchResultsState {
  searchResults: MediaObject[];
  loading: boolean;
  fillerMsg: string;
}

interface TrendingState {
  trendingMovies: MediaObject[];
  trendingShows: MediaObject[];
  loading: boolean;
}

interface ReduxState {
  auth: AuthState;
  watchlist: WatchlistState;
  searchResults: SearchResultsState;
  trending: TrendingState;
}

export type {
  MediaInfo,
  MediaObject,
  MediaObject as CreditsObject,
  TitleInfoObject,
  PersonInfoObject,
  PersonJobs,
  TrendingState,
  ReduxState,
};
