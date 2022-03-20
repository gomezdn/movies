import { VStack, StackDivider } from '@chakra-ui/react'
import { tmdbAPI } from '../services/tmdbAPI'
import { MediaObject } from '../Types'
import { useState, useEffect } from 'react'
import { MediaCardsDisplay } from './MediaCardsDisplay'

export function TrendingDisplay(props: {watchlist: MediaObject[], setWatchlist: Function}) {
  const [movies, setMovies] = useState([])
  const [shows, setShows] = useState([])

  useEffect(() => {
    tmdbAPI.trending.movies().then(res => {
      const sortedMoviesByPop = res.sort((a: Record<string, number>, b: Record<string, number>) => a.popularity - b.popularity)
      setMovies(sortedMoviesByPop)
    })
    
    tmdbAPI.trending.shows().then(res => {
      const sortedShowsByPop = res.sort((a: Record<string, number>, b: Record<string, number>) => a.popularity - b.popularity)
      setShows(sortedShowsByPop)
    })
  }, [])

  return (
    <VStack divider={<StackDivider w='25%' borderColor='darkgray' alignSelf='center'/>} w='100%' padding='2em' mt={['10em', '3em']} spacing='2em'>
      <MediaCardsDisplay size='230' watchlist={props.watchlist} setWatchlist={props.setWatchlist} mediaList={movies} heading='Trending movies'/>
      <MediaCardsDisplay size='230' watchlist={props.watchlist} setWatchlist={props.setWatchlist} mediaList={shows} heading='Trending shows'/>
    </VStack>
  )
}