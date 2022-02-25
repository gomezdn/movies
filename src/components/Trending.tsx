import { Grid, VStack, Heading, StackDivider } from '@chakra-ui/react'
import { Card } from './Card'
import { API } from '../api/API'
import { MediaObject } from '../Types'
import { useState, useEffect } from 'react'

export default function Trending() {
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
    <VStack divider={<StackDivider w='80%' alignSelf='center'/>} bg='black' w='100%' padding='2em' spacing='2em'>
      <VStack w='100%'>
        <Heading fontSize={['2.3em','2em']} pb='1em' fontFamily='saira' fontWeight='800' color='goldenrod' textShadow='1px 1px 15px rgb(140, 140, 140)'>
          Trending movies
        </Heading>
        <Grid w='100%' justifyItems='center' templateColumns={['1fr','repeat(4, 1fr)']}>
          {movies?.map((movie: MediaObject) => Card.create(movie))}
        </Grid>
      </VStack>
      <VStack w='100%'>
        <Heading fontSize={['2.3em','2em']} pb='1em' fontFamily='saira' fontWeight='800' color='goldenrod' textShadow='1px 1px 15px rgb(140, 140, 140)'>
          Trending shows
        </Heading>
        <Grid w='100%' justifyItems='center' templateColumns={['1fr','repeat(4, 1fr)']}>
          {shows?.map((show: MediaObject) => Card.create(show))}
        </Grid>
        </VStack>      
    </VStack>
  )
}