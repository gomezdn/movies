import axios from 'axios'

const key = 'b3fe14b114f41ad7d119818c7cc97d7f'
const baseSearchUrl = `https://api.themoviedb.org/3/search/`
const baseTrendingUrl = `https://api.themoviedb.org/3/trending/`

export const API = {
  search: {
    movies:  (search: string) => {
      const  url = `${baseSearchUrl}movie?&api_key=${key}&query=${search}`
      const  results = axios.get(url).then(response => response.data.results).catch(err => console.log(err))
      return results
    },
    shows: (search: string) => {
      const  url = `${baseSearchUrl}tv?&api_key=${key}&query=${search}`
      const  results = axios.get(url).then(response => response.data.results).catch(err => console.log(err))
      return results
    },
    people: (search: string) => {
      const  url = `${baseSearchUrl}person?&api_key=${key}&query=${search}`
      const  results = axios.get(url).then(response => response.data.results).catch(err => console.log(err))
      return results
    },
    all: (search: string) => {
      const  url = `${baseSearchUrl}multi?&api_key=${key}&query=${search}`
      const  results = axios.get(url).then(response => response.data.results).catch(err => console.log(err))
      return results
    }
  },
  trending: {
    movies: () => {
      const  url = `${baseTrendingUrl}movie/week?api_key=${key}`
      const  results = axios.get(url).then(response => response.data.results).catch(err => console.log(err))
      return results
    },
    shows: () => {
      const  url = `${baseTrendingUrl}tv/week?api_key=${key}`
      const  results = axios.get(url).then(response => response.data.results).catch(err => console.log(err))
      return results
    }
  },
  image: {
    getPoster: (posterPath: string, size: 154|185|342|500) => {
      return `https://image.tmdb.org/t/p/w${size}${posterPath}`
    }
  }
}

