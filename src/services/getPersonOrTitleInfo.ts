import { tmdbAPI } from './tmdbAPI';
import ImgNotFound from '../images/imageNotFound.png';
import {
  CreditsObject,
  MediaInfo,
  MediaObject,
  PersonInfoObject,
  PersonJobs,
  TitleInfoObject,
} from '../Types';

async function getPersonInfo(id: string) {
  const info: PersonInfoObject = {
    birthday: '',
    deathday: '',
    role: '',
    name: '',
    biography: '',
    origin: '',
    image: '',
    knownFor: {} as PersonJobs,
  };

  await tmdbAPI.info.getDetails('person', id).then((res) => {
    info.birthday =
      res.birthday !== null ? String(res.birthday).slice(0, 4) : '--';
    info.deathday = res.deathday !== null ? String(res.deathday) : '--';
    info.name = String(res.name);
    info.biography = String(res.biography);
    info.origin =
      res.place_of_birth !== null ? String(res.place_of_birth) : '--';
    info.image = res.profile_path
      ? tmdbAPI.image.getPoster(String(res.profile_path), 342)
      : '';
  });

  await tmdbAPI.info.getPersonCredits(id).then((res) => {
    info.knownFor = res;
  });

  return info;
}

async function getTitleInfo(type: string, id: string) {
  const info: TitleInfoObject = {
    name: '',
    originalName: '',
    poster: '',
    backdrop: '',
    rating: '',
    totalVotes: '',
    duration: '',
    year: '',
    description: '',
    genres: [] as string[],
    countries: [] as string[],
    trailer: '',
    stars: [] as CreditsObject[],
    actors: [] as CreditsObject[],
    directors: [] as CreditsObject[],
    isAnimation: false,
    seasonsNumber: '',
    episodesNumber: '',
    recommendations: [] as MediaObject[],
  };

  await tmdbAPI.info.getCredits(type, id).then((res) => {
    info.stars = res.stars;
    info.actors = res.actors;
    info.directors = res.directors;
  });

  await tmdbAPI.info.getDetails(type, id).then((res: MediaInfo) => {
    const isMovie = type == 'movie';

    if (!isMovie) {
      info.directors = (res.created_by as CreditsObject[]).map((creator) => {
        const nameForUrl = String(creator.name).replace(/\s/g, '_');
        return { name: creator.name, nameForUrl, image: creator.profile_path };
      });
    }

    info.name = String(isMovie ? res.title : res.name);

    info.originalName = String(
      isMovie ? res.original_title : res.original_name
    );

    info.poster = res.poster_path
      ? tmdbAPI.image.getPoster(String(res.poster_path), 500)
      : ImgNotFound;

    info.backdrop = res.backdrop_path
      ? tmdbAPI.image.getBackdrop(String(res.backdrop_path))
      : '';

    info.rating = String(res.vote_average);

    info.totalVotes = String(res.vote_count);

    info.genres = (res.genres as []).map(
      (item: { id: number; name: string }) => item.name
    );

    info.duration = isMovie
      ? String(res.runtime)
      : Math.floor(
          (res.episode_run_time as number[]).reduce(
            (accu: number, current: number) => {
              return accu + current;
            },
            0
          ) / (res.episode_run_time as number[]).length
        );

    info.year = String(isMovie ? res.release_date : res.first_air_date).slice(
      0,
      4
    );
    info.description = String(res.overview);

    info.countries = !isMovie
      ? (res.origin_country as string[])
      : ((res.production_countries as { name: string }[]).map(
          (country) => country.name
        ) as string[]);

    info.isAnimation = info.genres.some((genre) => genre == 'Animation');
    info.seasonsNumber = !isMovie ? String(res.number_of_seasons) : '';
    info.episodesNumber = !isMovie ? String(res.number_of_episodes) : '';
  });

  await tmdbAPI.video.getTrailer(type, id).then((res) => {
    info.trailer = res!;
  });

  await tmdbAPI.recommendations(type, id).then((res) => {
    info.recommendations = res;
  });

  return info;
}

export { getTitleInfo, getPersonInfo };
