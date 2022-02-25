import { Image, Text, Button, VStack, HStack } from '@chakra-ui/react'
import { MediaObject } from '../Types'
import { API } from '../api/API'
import ImgNotFound from '../images/imageNotFound.png'


function mediaCard(object: MediaObject) {
  const type = object.media_type
  const isMovie = type == 'movie'
  const title = isMovie? object.title : object.name as string
  const id = object.id as number
  const imgUrl = object.poster_path? API.image.getPoster(object.poster_path as string, 342) : ImgNotFound
  const score = `${Number(object.vote_average).toFixed(1)}`
  let year = object.first_air_date? object.first_air_date as string : object.release_date as string
  year = year.slice(0,4)

  return (
    <VStack key={id} cursor='pointer' p='0.5em' rounded='sm'
            bg='black' align='center' justify='space-between' maxW='max-content' h='auto'>
      <Image rounded='sm' src={imgUrl} w='230px' h='auto'/>
      <Text wordBreak='break-word' fontSize='1em'
          color='orange' textAlign='center'>{`${title} ${isMovie ? `(${year})` : ""}`}</Text>
    </VStack>
  )
}

export const Card = {
  create: (media: MediaObject) => {
    return mediaCard(media)
  }
}