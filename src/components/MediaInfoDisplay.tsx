import { VStack, HStack, Image, Text, Stack,
         Heading, StackDivider, Tag, AspectRatio } from '@chakra-ui/react'
import { API } from '../api/API'
import { useParams } from 'react-router-dom'
import { MediaInfo, CreditsObject, InfoObject } from '../Types'
import ImgNotFound from '../images/imageNotFound.png'
import { useEffect, useState } from 'react'
import { MdStarRate } from 'react-icons/md'


async function getInfo(type: string, id: string) {
  const info: InfoObject = {
    name: '',
    originalName: '',
    poster: '',
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
    allActors: [] as CreditsObject[],
    directors: [] as CreditsObject[],
  }

  await API.video.getTrailer(type, id).then(res => {
    info.trailer = res!
    console.log(info.trailer)

  })

  await API.info.getCredits(type, id).then(res => {
    info.stars = res.stars
    info.allActors = res.allActors
    info.directors = res.directors
  })
  
  await API.info.getDetails(type, id).then((res: MediaInfo) => {
      const isMovie = type == 'movie'
      info.name = String(isMovie ? res.title : res.name)
      info.originalName = String(isMovie ? res.original_title : res.original_name)
      info.poster = res.poster_path? API.image.getPoster(String(res.poster_path), 500) : ImgNotFound
      info.rating = String(res.vote_average)
      info.totalVotes = String(res.vote_count)
      info.genres = (res.genres as []).map((item: {id: number, name: string}) => item.name)
      info.duration = String(isMovie ? res.runtime : res.episode_run_time)
      info.year = String(isMovie ? res.release_date : res.first_air_date).slice(0,4)
      info.description = String(res.overview)
      info.countries = !isMovie
       ? (res.origin_country) as string[]
       : (res.production_countries as {name: string}[]).map(country => country.name) as string[]
      info.budget = String(isMovie ? res.budget : "")
  })
  return info
}

function MovieInfoPage(props: {id: string, type: string}) {

  const [info, setInfo] = useState({} as InfoObject)
  
  useEffect(() => {
    getInfo(props.type, props.id).then(res => setInfo(res))
  },[])


  function DisplayGenres(props: {genres: string[]}) {
    return (
      <HStack justify='space-around' w='max-content'>
        {props.genres?.map(genre => <Tag key={genre}>{genre}</Tag>)}
      </HStack>
    )
  }

  function DisplayDirectors(props: {directors: CreditsObject[]}) {
    return (
      <Stack direction={['column', 'row']}  justify='space-around' w='max-content' align={['start', 'end']}>
        <Heading size='md'>Direction:</Heading>
        <Stack direction={['column', 'row']}  divider={<StackDivider/>} align='inherit'>
        {props.directors?.map(director => <Text key={String(director.name)}>{director.name}</Text>)}
        </Stack>
      </Stack>
    )
  }

  function DisplayStars(props: {stars: CreditsObject[]}) {
    return (
      <Stack direction={['column', 'row']} w={['100%', 'max-content']} justify='space-around' align={['start', 'end']}>
        <Heading size='md'>Stars:</Heading>
        <Stack direction={['column', 'row']} divider={<StackDivider borderColor='gray'/>} align='inherit'>
          {props.stars?.map(star => <Text key={String(star.name)}>{star.name}</Text>)}
        </Stack>
      </Stack>
    )
  }

  function DisplayCountries(props: {countries: string[]}) {
    return (
      <HStack>
        <HStack>
          {props.countries?.map(country => <Text key={country} fontSize='sm'>{country}</Text>)}
        </HStack>
      </HStack>
    )
  }
  return (
    <VStack w={['100%', '80%']} color='white' align='start' spacing='1.5em' rounded='md' fontFamily='liberation-sans'>
      <HStack justify='space-between' align='end' p='0.5em' w='100%' bg='rgba(133, 133, 133, 0.15)'>
        <VStack align='start'>
          <Heading color='goldenrod'>{info.name}</Heading>
          {info.name !== info.originalName ? <Text>{`Original title: ${info.originalName}`}</Text> : ""}
          <Text  size='sm'>{`${info.year} | ${info.duration} min.`}</Text>
          <DisplayCountries countries={info.countries}/>
        </VStack>
        <VStack align='end'>
          <Text>TMDB rating</Text>
          <HStack>
            <MdStarRate color='goldenrod'/>
            <Text>{`${info.rating} / 10`}</Text>
          </HStack>
          <Text fontSize='sm'>{`${info.totalVotes} votes`}</Text>
        </VStack>
      </HStack>

      <Stack spacing='2em' w={['100%', '85%']} align={['center', 'start']} direction={['column', 'row']}>
        <Image w='300px' src={info.poster}/>
        <VStack align='left' w='100%' spacing='1em' divider={<StackDivider borderColor='gray'/>}>
          <DisplayGenres genres={info.genres}/>
          <DisplayDirectors directors={info.directors}/>
          <DisplayStars stars={info.stars}/>
          <Text color='orange.200' rounded='sm' bg='rgba(133, 133, 133, 0.1)' p='0.5em'>{info.description}</Text>
        </VStack>
      </Stack>

      <AspectRatio maxW='560px' ratio={1}>
        <iframe referrerPolicy='origin-when-cross-origin' src={info.trailer} title={`${info.name} trailer`} allowFullScreen/>
      </AspectRatio>

    </VStack>
  )
}

function MediaPage() {
  const { id, type } = useParams()

  return (
    <VStack w='100%' align='center'  mt={['9em', '5em']} p='2em'>
      {type == 'movie' ? <MovieInfoPage id={id!} type={type!}/> : ""}
    </VStack>
  )
}


export { MediaPage }