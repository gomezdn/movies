import { Heading } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { TrendingDisplay } from './components/TrendingDisplay'
import { MediaObject } from './Types'
import { SearchDisplay } from './components/SearchDisplay'
import { WatchlistDisplay } from './components/WatchlistDisplay'

type AppRoutesProps = {fillerMsg: string,
                       searchResults: MediaObject[],
                       setSearchResults: Function, 
                       watchlist: MediaObject[],
                       setWatchlist: Function,
                       isLogged: boolean,
                       setIsLogged: Function}

function NotFound() {
  return (
    <Heading fontFamily='saira' color='red.800' mt={['2em', '5em']} mb='7em' alignSelf='center'>NOTHING HERE</Heading>
  )
}

export function AppRoutes(props: AppRoutesProps) {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home'/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/home' element={<TrendingDisplay
                                    watchlist={props.watchlist}
                                    setWatchlist={props.setWatchlist}/>}/>
      <Route path='/watchlist' element={<WatchlistDisplay watchlist={props.watchlist}
                                                          setWatchlist={props.setWatchlist}/>}/>
      <Route path='/search' element={<SearchDisplay fillerMsg={props.fillerMsg}
                                                    watchlist={props.watchlist}
                                                    setWatchlist={props.setWatchlist}
                                                    searchResults={props.searchResults}
                                                    isLogged={props.isLogged}
                                                    setIsLogged={props.setIsLogged}
                                                    />}/>
    </Routes>
  )
}
