import { VStack, StackDivider } from '@chakra-ui/react'
import { MediaObject } from '../Types'
import { MediaResultsDisplay } from './MediaResultsDisplay'
import { Filler } from './MediaDisplayFormats'

function SearchDisplay(props: {searchResults: MediaObject[], fillerMsg: string,
                               isLogged: boolean, setIsLogged: Function,
                               watchlist: MediaObject[], setWatchlist: Function}) {

  function content(fillerMsg: string) {
    return props.searchResults[0]? <MediaResultsDisplay watchlist={props.watchlist}
                                                        resultsToDisplay={props.searchResults}
                                                        setWatchlist={props.setWatchlist}/> : <Filler fillerMsg={fillerMsg}/>
  }
                                
  return (
    content(props.fillerMsg)
  )
}

export { SearchDisplay }