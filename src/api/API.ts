import axios from 'axios'
import { MediaObject, MediaInfo, CreditsObject } from '../Types'

const key = 'b3fe14b114f41ad7d119818c7cc97d7f'
const baseSearchUrl = `https://api.themoviedb.org/3/search/`
const baseTrendingUrl = `https://api.themoviedb.org/3/trending/`

export const API = {
  search: {
    movies:  (search: string) => {
      const  url = `${baseSearchUrl}movie?&api_key=${key}&query=${search}`
      return axios.get(url).then(response => response.data.results)
    },
    shows: (search: string) => {
      const  url = `${baseSearchUrl}tv?&api_key=${key}&query=${search}`
      const  results = axios.get(url).then(response => response.data.results)
      return results
    },
    people: (search: string) => {
      const  url = `${baseSearchUrl}person?&api_key=${key}&query=${search}`
      return axios.get(url).then(response => response.data.results)
    },
    all: (search: string) => {
      const  url = `${baseSearchUrl}multi?&api_key=${key}&query=${search}`
      return axios.get(url).then(response => response.data.results)
    }
  },
  trending: {
    movies: () => {
      const  url = `${baseTrendingUrl}movie/week?api_key=${key}`
      return axios.get(url).then(response => response.data.results)
    },
    shows: () => {
      const  url = `${baseTrendingUrl}tv/week?api_key=${key}`
      return axios.get(url).then(response => response.data.results)
    }
  },
  image: {
    getPoster: (posterPath: string, size: 154|185|342|500) => {
      return `https://image.tmdb.org/t/p/w${size}${posterPath}`
    }
  },
  video: {
    getTrailer: (type: string, titleId: string) => {
      const url = `https://api.themoviedb.org/3/${type}/${titleId}/videos?api_key=${key}&language=en-US`
      return axios.get(url).then(res => {
        const trailerObject =  res.data.results.find((video: MediaObject) => video.type == 'Trailer' || video.type == 'Teaser')
        if (trailerObject.site == 'YouTube') {return `https://www.youtube.com/embed/${trailerObject.key}`}
        if (trailerObject.site == 'Vimeo') {return `https://www.vimeo.com/${trailerObject.key}`}
      })
    }
  },
  info: {
    getDetails(type: string, titleId: string) {
      const url = `https://api.themoviedb.org/3/${type}/${titleId}?api_key=${key}&language=en-US`
      return axios.get(url).then(response => response.data as MediaInfo)      
    },
    getCredits(type: string, titleId: string) {
      const url = ` https://api.themoviedb.org/3/${type}/${titleId}/credits?api_key=${key}&language=en-US`
      return axios.get(url).then(res => {
        const crew = res.data.crew
        const cast = res.data.cast

        const directors: MediaObject[] = crew.filter((person: CreditsObject) => {
          return person.job == 'Director'
        }).map((person: CreditsObject) => {
          return {name: person.name, image: person.profile_path}
        })
        const allActors: MediaObject[] = cast.filter((person: CreditsObject) => {
          return person.known_for_department == 'Acting'
        }).map((person: CreditsObject) => {
          return {name: person.name, character: person.character, image: person.profile_path}
        })
        const stars: MediaObject[] = allActors.sort((actor1: CreditsObject, actor2: CreditsObject) => {
          return Number(actor2.popularity) - Number(actor1.popularity)
        }).splice(0, 4)

        return {directors, allActors, stars}
      })
    }
  }
}