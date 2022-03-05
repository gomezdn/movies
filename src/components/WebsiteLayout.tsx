import { useState, useMemo } from 'react'
import { Flex } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { AppRoutes } from '../AppRoutes'

export default function WebsiteLayout() {
  const [searchResults, setSearchResults] = useState([])
  const [fillerMsg, setFillerMsg] = useState('SEARCH ANY TITLE')
  const [watchlist, setWatchlist] = useState([])
  const [isLogged, setIsLogged] = useState(false)

  return (
    <Flex w='100%' h='100%' align='center' fontFamily='roboto' direction='column'>
      <Header setSearchResults={setSearchResults} setFillerMsg={setFillerMsg}/>
      <AppRoutes fillerMsg={fillerMsg}
                 isLogged={isLogged} setIsLogged={setIsLogged}
                 searchResults={searchResults} setSearchResults={setSearchResults}
                 watchlist={watchlist} setWatchlist={setWatchlist}/>
      <Footer/>
    </Flex>
  )
}