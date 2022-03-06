import { Filler } from './MediaDisplayFormats'
import { MediaObject } from '../Types'
import { MediaResultsDisplay } from './MediaResultsDisplay'
import { StackDivider, VStack } from '@chakra-ui/react'

function WatchlistDisplay(props: {watchlist: MediaObject[], setWatchlist: Function}) {
  
  function content(fillerMsg: string) {
    return props.watchlist[0]? <MediaResultsDisplay resultsToDisplay={props.watchlist}
                                                    watchlist={props.watchlist}
                                                    setWatchlist={props.setWatchlist}/>: <Filler fillerMsg={fillerMsg}/> 
  }

  return (
    content("YOU HAVEN'T SAVED ANY TITLE YET")
  )
}

export { WatchlistDisplay }
