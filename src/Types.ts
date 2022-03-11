type MediaObject = Record<string, string|boolean|number>
type MediaInfo = Record<string, string|boolean|number|(object|string)[]>
type InfoObject = {
  name: string,
  originalName: string,
  poster: string,
  rating:  string,
  totalVotes: string,
  duration: string,
  year: string,
  description: string,
  budget: string,
  genres: string[],
  countries: string[],
  trailer: string,
  stars: MediaObject[],
  allActors: MediaObject[],
  directors: MediaObject[],
}

export type { MediaInfo, MediaObject, MediaObject as CreditsObject, InfoObject }