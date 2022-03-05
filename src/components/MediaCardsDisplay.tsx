import { VStack, StackDivider, Heading, Grid  } from '@chakra-ui/react'
import { MediaObject } from '../Types'
import { MediaCard } from './MediaDisplayFormats'

function MediaCardsDisplay(props: {mediaList: MediaObject[], heading: string,
                                   watchlist: MediaObject[], setWatchlist: Function}) {

  return (
  <VStack w='100%'>
    <Heading fontSize={['2.3em','2em']} pb='1em' fontFamily='saira' fontWeight='800' color='goldenrod' textShadow='1px 1px 15px rgb(140, 140, 140)'>
      {props.heading}
    </Heading>
    <Grid w='100%' justifyItems='center' templateColumns={['1fr','repeat(4, 1fr)']}>
      {props.mediaList?.map((media: MediaObject) => <MediaCard watchlist={props.watchlist} 
                                                               setWatchlist={props.setWatchlist}
                                                               key={String(media.id)}
                                                               object={media}/>)}
    </Grid>
  </VStack>
  )
}

export { MediaCardsDisplay }
