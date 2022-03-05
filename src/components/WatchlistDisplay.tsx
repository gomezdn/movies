import { Filler } from './MediaDisplayFormats'
import { MediaObject } from '../Types'
import { MediaCardsDisplay } from './MediaCardsDisplay'

function WatchlistDisplay(props: {watchlist: MediaObject[], setWatchlist: Function}) {
  
  function content(fillerMsg: string) {
    return props.watchlist[0]?     <MediaCardsDisplay mediaList={props.watchlist}
                                                   watchlist={props.watchlist}
                                                   heading='Your watchlist'
                                                   setWatchlist={props.setWatchlist}/> : <Filler fillerMsg={fillerMsg}/>

  }

  return (
    content("YOU HAVEN'T SAVED ANY TITLE YET")
  )
}

export { WatchlistDisplay }
