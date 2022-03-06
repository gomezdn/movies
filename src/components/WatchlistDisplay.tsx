import { Filler } from './MediaDisplayFormats'
import { MediaObject } from '../Types'
import { MediaCardsDisplay } from './MediaCardsDisplay'
import { Box } from '@chakra-ui/react'

function WatchlistDisplay(props: {watchlist: MediaObject[], setWatchlist: Function}) {
  
  function content(fillerMsg: string) {
    return props.watchlist[0]?     <MediaCardsDisplay mediaList={props.watchlist}
                                                   watchlist={props.watchlist}
                                                   heading='Your watchlist'
                                                   setWatchlist={props.setWatchlist}/> : <Filler fillerMsg={fillerMsg}/>

  }

  return (
    <Box mt='2em' p='2em' w='100%'>
      {content("YOU HAVEN'T SAVED ANY TITLE YET")}
    </Box>
  )
}

export { WatchlistDisplay }
