import { tmdbAPI } from './tmdbAPI';
import { MediaObject } from '../Types';

async function getTrendingTitles() {
  try {
    const movies = await tmdbAPI.trending.movies();
    const sortedMoviesByPop: MediaObject[] = movies.sort(
      (a: Record<string, number>, b: Record<string, number>) =>
        a.popularity - b.popularity
    );

    const shows = await tmdbAPI.trending.shows();
    const sortedShowsByPop: MediaObject[] = shows.sort(
      (a: Record<string, number>, b: Record<string, number>) =>
        a.popularity - b.popularity
    );

    return { movies: sortedMoviesByPop, shows: sortedShowsByPop };
  } catch (e: any) {
    return { error: e.message };
  }
}

export { getTrendingTitles };
