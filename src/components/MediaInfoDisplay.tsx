import { VStack, HStack, Image, Text, Stack,
         Heading, StackDivider, Tag, Grid, Button } from '@chakra-ui/react'
import { BsPlusLg } from 'react-icons/bs'
import { IoRemoveSharp } from 'react-icons/io5'
import { tmdbAPI } from '../services/tmdbAPI'
import { useParams, useNavigate } from 'react-router-dom'
import { MediaInfo, CreditsObject, MediaObject, InfoObject } from '../Types'
import { useEffect, useState, useMemo } from 'react'
import { MdStarRate } from 'react-icons/md'
import { MediaCard } from './MediaDisplayFormats'
import ImgNotFound from '../images/imageNotFound.png'


async function getInfo(type: string, id: string) {

  const info: InfoObject = {
    name: '',
    originalName: '',
    poster: '',
    backdrop: '',
    rating:  '',
    totalVotes: '',
    duration: '',
    year: '',
    description: '',
    budget: '',
    genres: [] as string[],
    countries: [] as string[],
    trailer: '',
    stars: [] as CreditsObject[],
    actors: [] as CreditsObject[],
    directors: [] as CreditsObject[],
    isAnimation: false,
    seasonsNumber: '',
    episodesNumber: '',
    recommendations: [] as MediaObject[],
  }


  await tmdbAPI.info.getCredits(type, id).then(res => {
    info.stars = res.stars
    info.actors = res.actors
    info.directors = res.directors
  })
  
  await tmdbAPI.info.getDetails(type, id).then((res: MediaInfo) => {
      const isMovie = type == 'movie'
      if (!isMovie) {
        info.directors = (res.created_by as CreditsObject[]).map(creator => {
          return {name: creator.name, image: creator.profile_path}
        })
      }
      info.name = String(isMovie ? res.title : res.name)
      info.originalName = String(isMovie ? res.original_title : res.original_name)
      info.poster = res.poster_path? tmdbAPI.image.getPoster(String(res.poster_path), 500) : ImgNotFound
      info.backdrop = res.backdrop_path? tmdbAPI.image.getBackdrop(String(res.backdrop_path)) : ''
      info.rating = String(res.vote_average)
      info.totalVotes = String(res.vote_count)
      info.genres = (res.genres as []).map((item: {id: number, name: string}) => item.name)
     
      info.duration = 
      isMovie 
      ? String(res.runtime) 
      : Math.floor((res.episode_run_time as number[]).reduce((accu: number, current: number) => {
        return accu + current
      },0) / (res.episode_run_time as number[]).length)

      info.year = String(isMovie ? res.release_date : res.first_air_date).slice(0,4)
      info.description = String(res.overview)
      
      info.countries = !isMovie
       ? (res.origin_country) as string[]
       : (res.production_countries as {name: string}[]).map(country => country.name) as string[]

      info.budget = isMovie? String(res.budget) : ''
      info.isAnimation = info.genres.some(genre => genre == 'Animation')
      info.seasonsNumber = !isMovie? String(res.number_of_seasons) : ''
      info.episodesNumber = !isMovie? String(res.number_of_episodes) : ''
  })

  await tmdbAPI.video.getTrailer(type, id).then(res => {
    info.trailer = res!
  })

  await tmdbAPI.recommendations(type, id).then(res => {
    info.recommendations = res
  })

  return info
}

function TitleInfo(props: {id: string, type: string, watchlist: MediaObject[], setWatchlist: Function}) {

  const [info, setInfo] = useState({} as InfoObject)

  const added = useMemo(() => {
    return props.watchlist?.some(media => media.id == props.id)
  },[props.watchlist])
  
  useEffect(() => {
    getInfo(props.type, props.id).then(res => setInfo(res))
  },[])

  function addToWatchlist() {
    const mediaObject = {
      media_type: props.type,
      poster_path: info.poster,
      title: info.name,
      release_date: info.year,
      overview: info.description,
      id: props.id
    }
    const newWatchlist = props.watchlist.concat([mediaObject])
    props.setWatchlist(newWatchlist)
  }

  function removeFromWatchlist() {
    const newWatchlist = props.watchlist.filter(media => media.id !== props.id)
    props.setWatchlist(newWatchlist)
  }

  function handleWatchlistButtonClick() {
    if (added) {
      removeFromWatchlist()
    } else {
      addToWatchlist()
    }
  }

  function DisplayGenres(props: {genres: string[]}) {
    return (
      <HStack justify='space-around' w={['100%', 'max-content']}>
        {props.genres?.map(genre => <Tag wordBreak='break-all' key={genre}>{genre}</Tag>)}
      </HStack>
    )
  }

  function DisplayDirectors(props: {directors: CreditsObject[], type: string}) {
    return (
      <Stack direction={['column', 'row']}  justify='space-around' w='max-content' align={['start', 'end']}>
        <Heading size='md'>{props.type == 'movie' ? 'Director(s)' : 'Created by'}</Heading>
        <Stack direction={['column', 'row']} spacing='1.1em' align='inherit'>
        {props.directors
        ? props.directors.length == 0 ? <Text color='darkgray'>Info not available...</Text> 
                                      : props.directors.map(director => <Text color='darkgray' key={String(director.name)}>{director.name}</Text>) 
        : ''}
        </Stack>
      </Stack>
    )
  }

  function DisplayStars(props: {stars: CreditsObject[]}) {
    return (
      <Stack direction={['column', 'row']} w={['100%', 'max-content']} justify='space-around' align={['start', 'end']}>
        <Heading size='md'>Starring</Heading>
        <Stack direction={['column', 'row']} align='inherit' spacing='1.1em'>
          {props.stars?.map(star => <Text size='sm' color='darkgray' key={String(star.name)}>{star.name}</Text>)}
        </Stack>
      </Stack>
    )
  }

  function DisplayCountries(props: {countries: string[]}) {
    return (
      <HStack>
        <Stack bg={['', 'blackAlpha.500']} p='0.15em' rounded='sm' direction={['column', 'row']}>
          {props.countries?.map(country => <Text key={country} fontSize='sm'>{country}</Text>)}
        </Stack>
      </HStack>
    )
  }

  function DisplayFullCast(props: {actors: CreditsObject[]}) {
    return (
      <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap='3em'>
        {props.actors?.map(actor => {
          const imgUrl = actor.image? tmdbAPI.image.getPoster(String(actor.image), 154) : ImgNotFound
          return (
            <HStack key={String(actor.name)} align='end' spacing='1em'>
              <Image rounded='40%'  src={imgUrl} w='80px'/>
              <VStack align='start' textAlign='left'>
                <Heading size='sm'>{actor.name}</Heading>
                <Text color='gray' size='xs'>as {actor.character}</Text>
              </VStack>
            </HStack>
          )})}
      </Grid>
    )
  }

  function DisplayRecommendations(props: {recommendations: MediaObject[], watchlist: MediaObject[], setWatchlist: Function}) {
    return (
      <VStack h='100%' align='start' alignSelf='start'>
        <Heading color='orange' alignSelf={['center', 'start']}>More like this</Heading>
        <Grid templateColumns={['1fr', 'repeat(5, 1fr)']} gap='2em' w='100%' justifyItems='center'>
          {props.recommendations?.map((media: MediaObject) => {
            return <MediaCard key={String(media.id)} object={media} watchlist={props.watchlist}
                              setWatchlist={props.setWatchlist} size='200'/>
            })}
        </Grid>
      </VStack>
    )
  }
  
  return (
    <VStack w={['100%', '85%']} color='white' align='start' spacing='2em' rounded='md' fontFamily='liberation-sans'>
      <HStack justify='space-between' align='end' p='1em' w='100%' bgImage={['', info.backdrop]} bgSize='cover' bgColor='rgba(133, 133, 133, 0.035)'>
        <VStack align='start' p='0.15em' rounded='sm'>
          <Heading bg={['', 'blackAlpha.500']} p='0.065em' rounded='sm' color='orange' size='2xl' fontFamily='liberation-sans'>{info.name}</Heading>
          <Text bg={['', 'blackAlpha.500']} p='0.15em' rounded='sm' fontFamily='saira' size='sm'>{props.type == 'movie' ? 'Movie' : 'Tv show'}</Text>
          {info.name !== info.originalName ? <Text bg={['', 'blackAlpha.500']} p='0.15em' rounded='sm'>{`Original title: ${info.originalName}`}</Text> : ""}
          <Stack direction={['column', 'row']}>
            <Text bg={['', 'blackAlpha.500']} p='0.15em' rounded='sm' size='sm'>{props.type == 'tv' ? `First aired in ${info.year} ` : `${info.year} `}</Text>
            <Text bg={['', 'blackAlpha.500']} p='0.15em' rounded='sm'>{props.type == 'tv' ? `avg runtime ${info.duration} min.` : `| ${info.duration} min.`}</Text>
            {props.type == 'tv'
             ? <>
                <Text bg={['', 'blackAlpha.500']} p='0.15em'>{`${info.seasonsNumber} season${info.seasonsNumber == '1' ? '' : 's'}`}</Text>
                <Text bg={['', 'blackAlpha.500']} p='0.15em'>{`${info.episodesNumber} episodes`}</Text>
               </>
             : ''
            }
          </Stack>
          <DisplayCountries countries={info.countries}/>
        </VStack>

        <VStack align='end' fontFamily='saira'>
          <Text bg={['', 'blackAlpha.500']} p='0.15em' rounded='sm' visibility={['hidden', 'visible']}>TMDB rating</Text>
          <HStack bg={['', 'blackAlpha.500']} p='0.15em' rounded='sm'>
            <MdStarRate color='goldenrod'/>
            <Text>{`${info.rating} / 10`}</Text>
          </HStack>
          <Text bg={['', 'blackAlpha.500']} p='0.15em' rounded='sm' fontSize='xs'>{`${info.totalVotes} votes`}</Text>
        </VStack>
      </HStack>

      <Stack spacing={['2em', '3.5em']} w={['100%', '85%']} align={['center', 'start']} direction={['column', 'row']}>
        <Image w='342px' src={info.poster}/>
        <VStack align='left' w='100%' spacing='1em' divider={<StackDivider borderColor='gray'/>}>
          <DisplayGenres genres={info.genres}/>
          <Button p='0' variant='outline' w='max-content' onClick={handleWatchlistButtonClick}>
            <HStack rounded='md' p='0.5em' bg='rgba(133, 133, 133, 0.5)' align='center' justify='left' h='100%'>
              {added? <IoRemoveSharp/> : <BsPlusLg/>}
              <Text>{added? 'Remove from watchlist' : 'Add to watchlist'}</Text>
            </HStack>
          </Button>
          <DisplayDirectors type={props.type} directors={info.directors}/>
          <DisplayStars stars={info.stars}/>
          <Text color='orange.200' rounded='sm' bg='rgba(133, 133, 133, 0.1)' p='0.5em'>{info.description}</Text>
        </VStack>
      </Stack>

      {info.trailer !== ''
      ?<VStack w={['100%', '640px']} spacing={['1em','2em']} h='360px' align='start'>
          <Heading color='orange'>Video</Heading>
          <iframe width='100%' height='100%' allowFullScreen src={`${info.trailer}`} title={`${info.name} trailer`}/>
       </VStack>
      :''}

      <VStack align='start' spacing={['1em','2em']}>
        <Heading color='orange'>{info.isAnimation? 'Voices' : 'Top cast'}</Heading>
        <DisplayFullCast actors={info.actors}/>
      </VStack>

      {info.recommendations
      ?info.recommendations[0]
        ?<DisplayRecommendations recommendations={info.recommendations} watchlist={props.watchlist} setWatchlist={props.setWatchlist}/>
        :''
      :''}
    </VStack>
  )
}

function MediaInfoDisplay(props: {watchlist: MediaObject[], setWatchlist: Function}) {
  const { id, type } = useParams()

  return (
    <VStack w='100%' align='center' mt={['9em', '5em']} p='2em'>
      <TitleInfo setWatchlist={props.setWatchlist} watchlist={props.watchlist} id={id!} type={type!}/>
    </VStack>
  )
}


export { MediaInfoDisplay }