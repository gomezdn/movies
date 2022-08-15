import { MediaObject } from '../Types';
import { tmdbAPI } from './tmdbAPI';

function getMediaResultProps(object: MediaObject) {
  const id = String(object.id);
  const type = (object.type || object.media_type) as string;
  const imgUrl = (object.imgUrl ||
    tmdbAPI.image.getPoster(object.poster_path as string, 154)) as string;
  const title = (object.title || object.name) as string;
  const titleForUrl = title.replace(/\s/g, '_');
  const year = String(
    object.year ||
      (object.release_date ? object.release_date : object.first_air_date)
  ).slice(0, 4);
  const overview = object.overview
    ? (object.overview as string)
    : 'Description not available.';

  return { id, type, imgUrl, title, titleForUrl, year, overview };
}

export { getMediaResultProps };
