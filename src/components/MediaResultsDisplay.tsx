import { MediaObject } from '../Types'
import { MediaResult } from './MediaDisplayFormats'
import { VStack, StackDivider } from '@chakra-ui/react'

function MediaResultsDisplay(props: {resultsToDisplay: MediaObject[], watchlist: MediaObject[], setWatchlist: Function}) {
  return (
    <VStack align='left' justify='center' bg='black' color='white' paddingY='2em' mt={['8em', '3em']}
    spacing='1em' divider={<StackDivider/>} w={['93%', '52%']}>
      {props.resultsToDisplay.map(result => <MediaResult watchlist={props.watchlist}
                                                         setWatchlist={props.setWatchlist}
                                                         object={result} key={String(result.id)}/>)}
    </VStack>
  )
}

export { MediaResultsDisplay }