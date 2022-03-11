import { VStack, Heading, Grid  } from '@chakra-ui/react'
import { MediaObject } from '../Types'
import { MediaCard } from './MediaDisplayFormats'

function MediaCardsDisplay(props: {mediaList: MediaObject[], heading: string,
                                   watchlist: MediaObject[], setWatchlist: Function}) {

  return (
    <VStack w='100%' align='start' spacing='1.7em'>
      <Heading fontSize={['2.5em','3em']}  fontFamily='saira' fontWeight='800' ml={['0', '1em']}
               color='goldenrod' textShadow='1px 1px 15px rgb(140, 140, 140)' textAlign='center'>
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
