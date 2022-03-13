import axios from 'axios'
import { MediaObject, MediaInfo, CreditsObject } from '../Types'

const key = 'b3fe14b114f41ad7d119818c7cc97d7f'
const baseSearchUrl = `https://api.themoviedb.org/3/search/`
const baseTrendingUrl = `https://api.themoviedb.org/3/trending/`

export const tmdbAPI = {
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
  recommendations: (type: string, id: string) => {
    const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${key}`
    return axios.get(url).then(res => res.data.results.splice(0,5))
  },
  image: {
    getPoster: (posterPath: string, size: 154|185|342|500) => {
      return `https://image.tmdb.org/t/p/w${size}${posterPath}`
    },
    getBackdrop: (backdropPath: string) => {
      return `https://image.tmdb.org/t/p/w1280${backdropPath}`
    }
  },
  video: {
    getTrailer: (type: string, id: string) => {
      const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${key}`
      return axios.get(url).then(res => {
        const videos = res.data.results.filter((video: MediaObject) => {
          return video.type == 'Trailer' || video.type == 'Teaser'
        }).sort((video1: MediaObject, video2: MediaObject) => {
          return Number(String(video2.published_at).slice(0,4)) - Number(String(video1.published_at).slice(0,4)) 
        })
        const trailer = videos[0]
        if (trailer?.site == 'YouTube') {return `https://www.youtube.com/embed/${trailer.key}`}
        else if (trailer?.site == 'Vimeo') {return `https://player.vimeo.com/video/${trailer.key}`}
        else {return ''}
      }).catch(err => console.log(err))
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

        const directors: MediaObject[] = type == 'movie'
        ? crew.filter((person: CreditsObject) => {
          return person.job == 'Director'
        }).map((person: CreditsObject) => {
          return {name: person.name, image: person.profile_path}
        })
        : []

        const actors: MediaObject[] = cast.sort((person1: CreditsObject, person2: CreditsObject) => {
          return Number(person2.popularity) - Number(person1.popularity)
        })
        .filter((person: CreditsObject) => {
          return person.known_for_department == 'Acting' && person.profile_path
        })
        .splice(0,9)
        .map((person: CreditsObject) => {
          return {name: person.name, character: person.character, image: person.profile_path}
        })
        
        const stars: MediaObject[] = [...actors].sort((actor1: CreditsObject, actor2: CreditsObject) => {
          return Number(actor2.popularity) - Number(actor1.popularity)
        }).splice(0, 4)

        return {directors, actors, stars}
      })
    }
  }
}