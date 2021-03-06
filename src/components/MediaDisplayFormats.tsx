import { Stack, HStack, IconButton, Text, VStack, Image, Box, Heading } from '@chakra-ui/react'
import { BsBookmarkPlus, BsBookmarkCheck } from 'react-icons/bs'
import { useState, useMemo } from 'react'
import { MediaObject } from '../Types'
import { tmdbAPI } from '../services/tmdbAPI'
import { Link } from 'react-router-dom'
import ImgNotFound from '../images/imageNotFound.png'


function addToWatchlist(object: MediaObject, watchlist: MediaObject[], setWatchlist: Function) {
  const newList = Array.from(watchlist).concat([object])
  setWatchlist(newList)
}

function removeFromWatchlist(object: MediaObject, watchlist: MediaObject[], setWatchlist: Function) {
  const newList = watchlist.filter((media: MediaObject) => media.id !== object.id)
  setWatchlist(newList)
}

function Filler(props: {fillerMsg: string}) {
  return (
    <Heading fontFamily='saira' color='gray' mt={['6em', '4em']} p={['1em', '0']}
             mb='7em' textAlign='center'>
               {props.fillerMsg}
    </Heading>
  )
}

function MediaResult(props: {object: MediaObject, setWatchlist: Function, watchlist: MediaObject[]}) {
  const type = props.object.media_type
  const imgUrl = props.object.poster_path? tmdbAPI.image.getPoster(props.object.poster_path as string, 154) : ImgNotFound
  const title = props.object.title? props.object.title : props.object.name 
  const titleForUrl = String(title).replace(/\s/g, '_')
  const year = String(props.object.release_date? props.object.release_date : props.object.first_air_date).slice(0,4)
  const overview = props.object.overview? props.object.overview : 'Description not available.' 
  const id = props.object.id

  const [isDescriptionTruncated, setDescriptionTruncated] = useState(true)
  
  const toggleText = useMemo(() => {
    return isDescriptionTruncated ? 'see more' : 'see less'
  },[isDescriptionTruncated])
  
  const added = useMemo(() => {
    return props.watchlist.some((media: MediaObject) => media.id == id)
  },[props.watchlist])


  function handleIconClick() {
    if (added) {removeFromWatchlist(props.object, props.watchlist, props.setWatchlist)}
    else {addToWatchlist(props.object, props.watchlist, props.setWatchlist)}
  }

  function toggleTruncated() {
    setDescriptionTruncated(!isDescriptionTruncated)
  }

  return (
    <Stack rounded={['md', 'sm']} bg='rgba(100, 100, 100, 0.045)' direction={['column', 'row']}
           justify='left' align={['end', 'start']} p='1em' spacing={['1em', '3.5em']}>
      <VStack spacing='1.5' maxW='max-content' mr={['2em', '0']}>
        <Link to={`/${type}/${id}/${titleForUrl}`}>
          <Image maxW='100px' h='auto' rounded='sm' src={imgUrl}/>
        </Link>
        <Text color='orange' ml={['10em', '0']}>{year}</Text>
      </VStack>
      <VStack fontFamily='saira' align={['end', 'start']}>
        <HStack spacing='1em' ml='0.35em' mr={['2em', '0']}>
          <VStack align={['end', 'start']}>
            <Link to={`/${type}/${id}/${titleForUrl}`}>
              <Text color='orange' wordBreak='break-word' maxW={['200px', 'max-content']}>{title}</Text>
            </Link>
            <Text fontSize='0.8em' color='gray'>{type == 'movie'? 'Movie' : 'TV show'}</Text>
          </VStack>
          <IconButton onClick={handleIconClick} variant='outline' colorScheme={added? 'red' : 'green'}
                      aria-label='add to watchlist' icon={added ? <BsBookmarkCheck/> : <BsBookmarkPlus/>}/>
        </HStack>
        <Text fontFamily='liberation-sans' p='0.5em' fontSize='0.8em' color='darkgray'
              isTruncated={isDescriptionTruncated} maxW={['320px', '500px']} h='auto' bg='rgba(100, 100, 100, 0.085)' rounded='md'>
                {overview}
        </Text>{String(overview).length > 60
                  ? <Text fontSize='0.8em' fontFamily='liberation-sans' color='orange.600' cursor='pointer' onClick={toggleTruncated}>{toggleText}</Text>
                  : ""}
      </VStack>
    </Stack>
  )
}


function MediaCard(props: {object: MediaObject, watchlist: MediaObject[], setWatchlist: Function, size: string}) {
  const type = props.object.media_type
  const isMovie = type == 'movie'
  const title = isMovie? props.object.title : props.object.name as string
  const titleForUrl = String(title).replace(/\s/g, '_')
  const id = Number(props.object.id)
  const imgUrl = props.object.poster_path? tmdbAPI.image.getPoster(props.object.poster_path as string, 342) : ImgNotFound
  const year = String(isMovie? props.object.release_date : props.object.first_air_date).slice(0,4)
  let rating = String(props.object.vote_average)
  rating = String(Number(rating.length >1 ? rating : `${rating}.0`).toFixed(1))

  const added = useMemo(() => {
    return props.watchlist.some((media: MediaObject) => media.id == id)
  },[props.watchlist])

  function handleIconClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    if (added) {removeFromWatchlist(props.object, props.watchlist, props.setWatchlist)}
    else {addToWatchlist(props.object, props.watchlist, props.setWatchlist)}
  }

  return (
    <Stack p='0.5em' rounded='sm' bg='black' align='center' spacing='1em' direction={['row', 'column']}>
        <Link to={`/${type}/${id}/${titleForUrl}`}>
          <Box w={['150px', `${props.size}px`]} h={['225px',`${Number(props.size) * 1.5}px`]} bgImage={imgUrl} bgSize='cover'>
            <HStack p='0.5em' justify='space-between' w='100%'>
              <IconButton onClick={handleIconClick} variant='solid' size='lg' colorScheme={added? 'red' : 'green'}
                          aria-label='add to watchlist' icon={added ? <BsBookmarkCheck/> : <BsBookmarkPlus/>}/>
              <Text fontFamily='saira' cursor='pointer' userSelect='none' fontSize='1.4em' p='0.3em'
                    borderRadius='50px'  color='orange' bg='rgba(133, 133, 133, 0.322)'> 
                      {rating}
              </Text>        
            </HStack>
          </Box>
        </Link>
      <Link to={`/${type}/${id}/${titleForUrl}`}>
        <Box fontFamily='roboto' wordBreak='break-word' fontSize='1em' color='orange' textAlign={['left', 'center']}>
          <Text wordBreak='keep-all'>{title}</Text>
          <Text color='whiteAlpha.700'>{`${year}`}</Text>
        </Box>
      </Link>
    </Stack>
  )
}

export { MediaCard, MediaResult, Filler }