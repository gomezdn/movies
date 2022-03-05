import { VStack, StackDivider } from '@chakra-ui/react'
import { MediaObject } from '../Types'
import { MediaResult } from './MediaDisplayFormats'
import { Filler } from './MediaDisplayFormats'

function SearchDisplay(props: {searchResults: MediaObject[], fillerMsg: string,
                               isLogged: boolean, setIsLogged: Function,
                               watchlist: MediaObject[], setWatchlist: Function}) {

  function content(fillerMsg: string) {
    return props.searchResults[0]? props.searchResults.map(result => <MediaResult watchlist={props.watchlist}
                                                          setWatchlist={props.setWatchlist}
                                                          object={result} key={String(result.id)}/>) : <Filler fillerMsg={fillerMsg}/>
  }
                                
  return (
    <VStack align='left'  justify='center' bg='black' color='white' paddingY='1em'
            spacing='1em' divider={<StackDivider/>} w={['90%', '60%']}>
      {content(props.fillerMsg)}
    </VStack>
  )
}

export { SearchDisplay }