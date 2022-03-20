type MediaObject = Record<string, string|boolean|number>

type MediaInfo = Record<string, string|boolean|number|(object|string|number)[]>

type TitleInfoObject = {
  name: string,
  originalName: string,
  poster: string,
  backdrop: string,
  rating:  string,
  totalVotes: string,
  duration: string|number,
  year: string,
  description: string,
  budget: string,
  genres: string[],
  countries: string[],
  trailer: string,
  stars: MediaObject[],
  actors: MediaObject[],
  directors: MediaObject[],
  isAnimation: boolean,
  seasonsNumber: string,
  episodesNumber: string,
  recommendations: MediaObject[],
}

type PersonInfoObject = {
  birthday: string,
  deathday: string,
  role: string,
  name: string,
  biography: string,
  origin: string,
  image: string,
  knownFor: PersonJobs
}

type PersonJobs = {
  crew: Record<string, MediaObject[]>,
  crewJobNames: string[],
  cast: MediaObject[]
}

export type { MediaInfo, MediaObject, MediaObject as CreditsObject,
              TitleInfoObject, PersonInfoObject, PersonJobs }