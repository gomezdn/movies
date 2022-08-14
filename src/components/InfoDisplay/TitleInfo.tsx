import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  VStack,
  HStack,
  Image,
  Text,
  Stack,
  Heading,
  StackDivider,
  Tag,
  Grid,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { MdStarRate } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { IoRemoveSharp } from 'react-icons/io5';
import { tmdbAPI } from '../../services/tmdbAPI';
import { handleAddOrDeleteMovie } from '../../services/handleAddOrDeleteMovie';
import { CreditsObject, MediaObject, TitleInfoObject } from '../../Types';
import MediaCard from '../MediaDisplayFormats/MediaCard';
import ImgNotFound from '../../images/imageNotFound.png';
import { getTitleInfo } from '../../services/getPersonOrTitleInfo';
import { useAppDispatch } from '../../app/store';
import { getUserData } from '../../features/auth/authSlice';
import {
  getIdBeingUpdated,
  getWatchlist,
} from '../../features/watchlist/watchlistSlice';

function DisplayGenres(props: { genres: string[] }) {
  return (
    <HStack justify={['left', 'space-around']} w={['100%', 'max-content']}>
      {props.genres?.map((genre) => (
        <Tag
          fontFamily="roboto"
          fontWeight="800"
          wordBreak="break-all"
          key={genre}
        >
          {genre}
        </Tag>
      ))}
    </HStack>
  );
}

function DisplayDirectors(props: { directors: CreditsObject[]; type: string }) {
  return (
    <Stack
      direction={['column', 'row']}
      justify="space-around"
      w="max-content"
      align={['start', 'end']}
    >
      <Heading size="md">
        {props.type == 'movie' ? 'Director(s)' : 'Created by'}
      </Heading>
      <Stack direction={['column', 'row']} spacing="1.1em" align="inherit">
        {props.directors?.length == 0 ? (
          <Text color="darkgray">Info not available</Text>
        ) : (
          props.directors?.map((director) => {
            return (
              <Link
                key={String(director.id)}
                to={`/person/${director.id}/${director.nameForUrl}`}
              >
                <Text color="blue.400" key={String(director.name)}>
                  {director.name}
                </Text>
              </Link>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}

function DisplayStars(props: { stars: CreditsObject[] }) {
  return (
    <Stack
      direction={['column', 'row']}
      w={['100%', 'max-content']}
      justify="space-around"
      align={['start', 'end']}
    >
      <Heading size="md">Starring</Heading>
      <Stack direction={['column', 'row']} align="inherit" spacing="1.1em">
        {props.stars?.length == 0 ? (
          <Text color="darkgray">Info not available</Text>
        ) : (
          props.stars?.map((star) => {
            return (
              <Link
                key={String(star.id)}
                to={`/person/${star.id}/${star.nameForUrl}`}
              >
                <Text size="sm" color="blue.400" key={String(star.name)}>
                  {star.name}
                </Text>
              </Link>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}

function DisplayCountries(props: { countries: string[] }) {
  return (
    <HStack>
      <Stack
        bg={['', 'blackAlpha.500']}
        p="0.15em"
        rounded="sm"
        direction={['column', 'row']}
      >
        {props.countries?.map((country) => (
          <Text key={country} fontSize="sm">
            {country}
          </Text>
        ))}
      </Stack>
    </HStack>
  );
}

function DisplayFullCast(props: { actors: CreditsObject[] }) {
  if (props.actors?.length == 0) {
    return <Text>Not available</Text>;
  }
  return (
    <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap="3em">
      {props.actors?.map((actor) => {
        const imgUrl = actor.image
          ? tmdbAPI.image.getPoster(String(actor.image), 154)
          : ImgNotFound;
        return (
          <HStack key={String(actor.name)} align="end" spacing="1em">
            <Link to={`/person/${actor.id}/${actor.nameForUrl}`}>
              <Image rounded="40%" src={imgUrl} w="80px" />
            </Link>
            <VStack align="start" textAlign="left">
              <Link to={`/person/${actor.id}/${actor.nameForUrl}`}>
                <Heading size="sm">{actor.name}</Heading>
              </Link>
              {actor.character ? (
                <Text color="gray" size="xs">
                  as {actor.character}
                </Text>
              ) : (
                ''
              )}
            </VStack>
          </HStack>
        );
      })}
    </Grid>
  );
}

function DisplayRecommendations(props: { recommendations: MediaObject[] }) {
  if (props.recommendations?.length == 0) {
    return <Text>Not available</Text>;
  }

  return (
    <VStack h="100%" align="start" alignSelf="start">
      <Grid
        templateColumns={['1fr', 'repeat(5, 1fr)']}
        gap="1.5em"
        w="100%"
        alignItems="start"
        justifyItems="start"
      >
        {props.recommendations?.map((media: MediaObject) => {
          return <MediaCard key={String(media.id)} object={media} size="200" />;
        })}
      </Grid>
    </VStack>
  );
}

function TitleInfo(props: {
  id: string;
  type: string;
  setIsLoading: Function;
}) {
  const dispatch = useAppDispatch();

  const watchlist = useSelector(getWatchlist) || [];
  const idBeingUpted = useSelector(getIdBeingUpdated);
  const { token } = useSelector(getUserData);

  const [info, setInfo] = useState({} as TitleInfoObject);
  const [titleObject, setTitleObject] = useState({} as MediaObject);

  const added = useMemo(() => {
    return watchlist.some((media) => media.id == props.id);
  }, [watchlist]);

  async function fetchInfo() {
    const res = await getTitleInfo(props.type, props.id);
    await setInfo(res);
    return res;
  }

  function makeTitleObject(titleInfo: TitleInfoObject) {
    const titleObject = {
      id: props.id,
      type: props.type,
      imgUrl: titleInfo.poster,
      title: titleInfo.name,
      titleForUrl: titleInfo.name.replace(/\s/g, '_'),
      year: titleInfo.year,
      overview: titleInfo.description,
    };
    setTitleObject(titleObject);
  }

  useEffect(() => {
    (async () => {
      props.setIsLoading(true);
      window.scroll({ top: 0, behavior: 'smooth' });
      const titleInfo = await fetchInfo();
      document.title = titleInfo.name;
      makeTitleObject(titleInfo);
      props.setIsLoading(false);
    })();
  }, [props.id]);

  return (
    <VStack
      w={['100%', '85%']}
      color="white"
      align="start"
      spacing="2em"
      rounded="md"
    >
      <HStack
        rounded="md"
        boxShadow="0 0 10px darkgray"
        justify="space-between"
        align="end"
        p="1em"
        w="100%"
        bgImage={['', info.backdrop]}
        bgSize="cover"
        bgColor="rgba(133, 133, 133, 0.035)"
      >
        <VStack align="start" p="0.15em" rounded="sm">
          <Heading
            bg={['', 'blackAlpha.500']}
            p="0.065em"
            fontFamily="liberation-sans"
            rounded="sm"
            color="orange"
            size="2xl"
          >
            {info.name}
          </Heading>
          <Text
            bg={['', 'blackAlpha.500']}
            p="0.15em"
            rounded="sm"
            fontFamily="saira"
            fontSize="0.9em"
          >
            {props.type == 'movie' ? 'Movie' : 'Tv show'}
          </Text>
          {info.name !== info.originalName ? (
            <Text
              bg={['', 'blackAlpha.500']}
              p="0.15em"
              rounded="sm"
            >{`Original title: ${info.originalName}`}</Text>
          ) : (
            ''
          )}
          <Stack direction={['column', 'row']}>
            <Text bg={['', 'blackAlpha.500']} p="0.15em" rounded="sm" size="sm">
              {props.type == 'tv'
                ? `First aired in ${info.year} `
                : `${info.year} `}
            </Text>
            <Text bg={['', 'blackAlpha.500']} p="0.15em" rounded="sm">
              {props.type == 'tv'
                ? `avg runtime ${info.duration} min.`
                : `${info.duration} min.`}
            </Text>
            {props.type == 'tv' ? (
              <>
                <Text bg={['', 'blackAlpha.500']} p="0.15em">{`${
                  info.seasonsNumber
                } season${info.seasonsNumber == '1' ? '' : 's'}`}</Text>
                <Text
                  bg={['', 'blackAlpha.500']}
                  p="0.15em"
                >{`${info.episodesNumber} episodes`}</Text>
              </>
            ) : (
              ''
            )}
          </Stack>
          <DisplayCountries countries={info.countries} />
        </VStack>

        <VStack align="end" fontFamily="saira" wordBreak="keep-all">
          <Text
            bg={['', 'blackAlpha.500']}
            p="0.15em"
            rounded="sm"
            fontSize={['0.6em', '1em']}
          >
            TMDB rating
          </Text>
          <HStack bg={['', 'blackAlpha.500']} p="0.15em" rounded="sm">
            <MdStarRate color="goldenrod" />
            <Text textAlign="center">{`${info.rating} / 10`}</Text>
          </HStack>
          <Text
            bg={['', 'blackAlpha.500']}
            p="0.15em"
            rounded="sm"
            fontSize="xs"
          >{`${info.totalVotes} votes`}</Text>
        </VStack>
      </HStack>

      <Stack
        spacing={['2em', '3.5em']}
        w={['100%', '85%']}
        align={['center', 'start']}
        direction={['column', 'row']}
      >
        <Image
          w={['280px', '342px']}
          rounded="md"
          boxShadow="0 0 10px darkgray"
          src={info.poster}
        />
        <VStack
          align="left"
          w="100%"
          spacing="1em"
          divider={<StackDivider borderColor="gray" />}
        >
          <DisplayGenres genres={info.genres} />

          {idBeingUpted == props.id ? (
            <Spinner
              alignSelf="left"
              ml="5em"
              size="lg"
              color="orange"
              speed="0.8s"
            />
          ) : (
            <Button
              p="0"
              variant="outline"
              w="max-content"
              onClick={() => {
                handleAddOrDeleteMovie(
                  added,
                  token,
                  props.id,
                  titleObject,
                  dispatch
                );
              }}
            >
              <HStack
                rounded="md"
                p="0.5em"
                bg="rgba(133, 133, 133, 0.5)"
                align="center"
                justify="left"
                h="100%"
              >
                {added ? <IoRemoveSharp /> : <BsPlusLg />}
                <Text>
                  {added ? 'Remove from watchlist' : 'Add to watchlist'}
                </Text>
              </HStack>
            </Button>
          )}

          <DisplayDirectors type={props.type} directors={info.directors} />
          <DisplayStars stars={info.stars} />
          <Text
            color="orange.200"
            rounded="sm"
            bg="rgba(133, 133, 133, 0.1)"
            p="0.5em"
          >
            {info.description}
          </Text>
        </VStack>
      </Stack>

      <VStack
        w={['100%', '640px']}
        h={info.trailer ? '360px' : 'auto'}
        align="start"
      >
        <Heading color="orange">Video</Heading>
        {info.trailer ? (
          <iframe
            width="100%"
            height="100%"
            allowFullScreen
            src={`${info.trailer}`}
            title={`${info.name} trailer`}
          />
        ) : (
          <Text>Not available</Text>
        )}
      </VStack>

      <VStack align="start" spacing={['1em', '2em']}>
        <Heading color="orange">
          {info.isAnimation ? 'Voices' : 'Top cast'}
        </Heading>
        <DisplayFullCast actors={info.actors} />
      </VStack>
      <VStack align="start">
        <Heading color="orange" alignSelf="start">
          More like this
        </Heading>
        <DisplayRecommendations recommendations={info.recommendations} />
      </VStack>
    </VStack>
  );
}

export default TitleInfo;
