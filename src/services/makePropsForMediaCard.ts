import { MediaObject } from '../Types';
import { tmdbAPI } from './tmdbAPI';

function getMediaCardProps(object: MediaObject) {
  const id = String(object.id);
  const type = object.media_type as string;
  const imgUrl = tmdbAPI.image.getPoster(object.poster_path as string, 342);
  const title = (type == 'movie' ? object.title : object.name) as string;
  const titleForUrl = title.replace(/\s/g, '_');
  const year = String(
    type == 'movie' ? object.release_date : object.first_air_date
  ).slice(0, 4);
  const overview = object.overview as string;
  let rating = String(object.vote_average);
  rating = String(
    Number(rating.length > 1 ? rating : `${rating}.0`).toFixed(1)
  );

  return {
    movieObject: { id, type, imgUrl, title, titleForUrl, year, overview },
    rating,
  };
}

export { getMediaCardProps };
