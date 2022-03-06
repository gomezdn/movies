import { VStack, StackDivider } from '@chakra-ui/react'
import { API } from '../api/API'
import { MediaObject } from '../Types'
import { useState, useEffect } from 'react'
import { MediaCardsDisplay } from './MediaCardsDisplay'

export function TrendingDisplay(props: {watchlist: MediaObject[], setWatchlist: Function}) {
  const [movies, setMovies] = useState([])
  const [shows, setShows] = useState([])

  useEffect(() => {
    API.trending.movies().then(res => {
      const sortedMoviesByPop = res.sort((a: Record<string, number>, b: Record<string, number>) => a.popularity - b.popularity)
      setMovies(sortedMoviesByPop.slice(0,12))
    })
    
    API.trending.shows().then(res => {
      const sortedShowsByPop = res.sort((a: Record<string, number>, b: Record<string, number>) => a.popularity - b.popularity)
      setShows(sortedShowsByPop.slice(0,12))
    })
  }, [])

  return (
    <VStack divider={<StackDivider w='80%' alignSelf='center'/>} bg='black' w='100%' padding='2em' mt={['10em', '2em']} spacing='2em'>
      <MediaCardsDisplay watchlist={props.watchlist} setWatchlist={props.setWatchlist} mediaList={movies} heading='Trending movies'/>
      <MediaCardsDisplay watchlist={props.watchlist} setWatchlist={props.setWatchlist} mediaList={shows} heading='Trending shows'/>
    </VStack>
  )
}