import { VStack, Heading, Grid  } from '@chakra-ui/react'
import { MediaObject } from '../Types'
import { MediaCard } from './MediaDisplayFormats'

function MediaCardsDisplay(props: {mediaList: MediaObject[], heading: string, size: string,
                                   watchlist: MediaObject[], setWatchlist: Function}) {

  return (
    <VStack w='100%' align='center' spacing='1.7em'>
      <Heading fontSize={['2.5em','3em']}  fontFamily='saira' fontWeight='800'
               color='goldenrod' textShadow='1px 1px 15px rgb(140, 140, 140)'>
        {props.heading}
      </Heading>
      <Grid w='100%' p='0' m='0' justifyItems='center' templateColumns={['1fr','repeat(4, 1fr)']}>
        {props.mediaList?.map((media: MediaObject) => <MediaCard size={props.size}
                                                                 watchlist={props.watchlist} 
                                                                 setWatchlist={props.setWatchlist}
                                                                 key={String(media.id)}
                                                                 object={media}/>)}
      </Grid>
    </VStack>
  )
}

export { MediaCardsDisplay }
