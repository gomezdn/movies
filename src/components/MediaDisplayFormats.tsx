import { Stack, HStack, IconButton, Text, VStack, Image, Box, Heading } from '@chakra-ui/react'
import { BsBookmarkPlus, BsBookmarkCheck } from 'react-icons/bs'
import { useState, useMemo } from 'react'
import { MediaObject } from '../Types'
import { API } from '../api/API'
import { Link } from 'react-router-dom'
import ImgNotFound from '../images/imageNotFound.png'


function addToWatchlist(object: MediaObject, watchlist: MediaObject[], setWatchlist: Function) {
  const newList = Array.from(watchlist).concat([object])
  setWatchlist(newList)
  console.log(newList)
}

function removeFromWatchlist(object: MediaObject, watchlist: MediaObject[], setWatchlist: Function) {
  const newList = watchlist.filter((media: MediaObject) => media.id !== object.id)
  setWatchlist(newList)
  console.log(newList)
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
  const imgUrl = props.object.poster_path? API.image.getPoster(props.object.poster_path as string, 154) : ImgNotFound
  const title = type == 'movie' ? props.object.title : props.object.name 
  const year = String(type == 'movie' ? props.object.release_date : props.object.first_air_date).slice(0,4)
  const overview = props.object.overview? props.object.overview : 'Description not available.' 
  const id = props.object.id

  const [isDescriptionTruncated, setDescriptionTruncated] = useState(true)
  const [toggleText, setToggleText] = useState('see more')
  
  const added = useMemo(() => {
    return props.watchlist.some((media: MediaObject) => media.id == id)
  },[props.watchlist])


  function handleIconClick() {
    if (added) {removeFromWatchlist(props.object, props.watchlist, props.setWatchlist)}
    else {addToWatchlist(props.object, props.watchlist, props.setWatchlist)}
  }

  function toggleTruncated() {
    setDescriptionTruncated(!isDescriptionTruncated)
    const newToggleText = toggleText == 'see more' ? 'see less' : 'see more'
    setToggleText(newToggleText)
  }

  return (
    <Stack rounded={['md', 'sm']} bg='rgba(100, 100, 100, 0.045)' direction={['column', 'row']}
           justify='left' align={['end', 'start']} p='1em' spacing={['1em', '3.5em']}>
      <VStack spacing='1.5' maxW='max-content' mr={['2em', '0']}>
        <Link to={`/${type}/${id}`}>
          <Image maxW='100px' h='auto' rounded='sm' src={imgUrl}/>
        </Link>
        <Text color='orange' ml={['10em', '0']}>{year}</Text>
      </VStack>
      <VStack fontFamily='saira' align={['end', 'start']}>
        <HStack spacing='1em' ml='0.35em' mr={['2em', '0']}>
          <Link to={`/${type}/${id}`}>
            <Text color='orange' wordBreak='break-word' maxW={['200px', 'max-content']}>{title}</Text>
          </Link>
          <IconButton onClick={handleIconClick} variant='outline' colorScheme={added? 'green' : 'yellow'}
                      aria-label='add to watchlist' icon={added ? <BsBookmarkCheck/> : <BsBookmarkPlus/>}/>
        </HStack>
        <Text fontFamily='liberation-sans' p='0.5em' fontSize='0.8em' color='darkgray'
              isTruncated={isDescriptionTruncated} maxW={['320px', '500px']} h='auto' bg='rgba(100, 100, 100, 0.085)' rounded='md'>
                {overview}{String(overview).length >60 ? <Text fontFamily='liberation-sans' color='orange.600' cursor='pointer' onClick={toggleTruncated}>{toggleText}</Text> : ""}

        </Text>
      </VStack>
    </Stack>
  )
}


function MediaCard(props: {object: MediaObject, watchlist: MediaObject[], setWatchlist: Function}) {
  const type = props.object.media_type
  const isMovie = type == 'movie'
  const title = isMovie? props.object.title : props.object.name as string
  const id = Number(props.object.id)
  const imgUrl = props.object.poster_path? API.image.getPoster(props.object.poster_path as string, 342) : ImgNotFound
  const year = String(isMovie? props.object.release_date : props.object.first_air_date).slice(0,4)
  let rating = String(props.object.vote_average)
  rating = rating.length >1 ? rating : `${rating}.0`

  const added = useMemo(() => {
    return props.watchlist.some((media: MediaObject) => media.id == id)
  },[props.watchlist])

  function handleIconClick() {
    if (added) {removeFromWatchlist(props.object, props.watchlist, props.setWatchlist)}
    else {addToWatchlist(props.object, props.watchlist, props.setWatchlist)}
  }

  return (
    <VStack p='0.5em' rounded='sm'
            bg='black' align='center' justify='space-between' maxW='max-content' h='auto'>
        <Box>
          <HStack p='0.5em' w={['60%', '17%']} justify='space-between' position='absolute'>
            <IconButton onClick={handleIconClick} variant='solid' size='lg' colorScheme={added? 'green' : 'yellow'}
                          aria-label='add to watchlist' icon={added ? <BsBookmarkCheck/> : <BsBookmarkPlus/>}/>
            <Text fontFamily='saira' cursor='pointer' userSelect='none' fontSize='1.4em' p='0.25em' 
                  borderRadius='50px'  color='orange' bg='rgba(133, 133, 133, 0.322)'> 
                    {rating}
            </Text>        
          </HStack>
          <Link to={`/${type}/${id}`}>
            <Image rounded='sm' cursor='pointer' src={imgUrl} w='230px' h='auto'/>
          </Link>
        </Box>
      <Link to={`/${type}/${id}`}>
        <Box wordBreak='break-word' fontSize='1em' color='orange' textAlign='center'>
          <Text>{title}</Text>
          {<Text >{`${year}`}</Text>}
        </Box>
      </Link>
    </VStack>
  )
}

export { MediaCard, MediaResult, Filler }