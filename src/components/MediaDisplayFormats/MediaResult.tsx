import { useSelector } from 'react-redux';
import {
  Stack,
  HStack,
  IconButton,
  Text,
  VStack,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { BsBookmarkPlus, BsBookmarkCheck } from 'react-icons/bs';
import { useState, useMemo } from 'react';
import { MediaObject } from '../../Types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { handleAddOrDeleteMovie } from '../../services/handleAddOrDeleteMovie';
import {
  getWatchlist,
  getIdBeingUpdated,
} from '../../features/watchlist/watchlistSlice';
import { getUserData } from '../../features/auth/authSlice';
import { getMediaResultProps } from '../../services/makePropsForMediaResult';

function MediaResult(props: { object: MediaObject }) {
  const dispatch = useAppDispatch();

  const watchlist = useSelector(getWatchlist) || ([] as MediaObject[]);
  const idBeingUpdated = useSelector(getIdBeingUpdated);
  const { token } = useSelector(getUserData);

  const [isDescriptionTruncated, setDescriptionTruncated] = useState(true);

  const toggleText = useMemo(() => {
    return isDescriptionTruncated ? 'see more' : 'see less';
  }, [isDescriptionTruncated]);

  const movieObject = getMediaResultProps(props.object);
  const { id, type, imgUrl, title, titleForUrl, year, overview } = movieObject;

  const added = useMemo(() => {
    return watchlist.some((media: MediaObject) => media.id == id);
  }, [watchlist]);

  function toggleTruncated() {
    setDescriptionTruncated(!isDescriptionTruncated);
  }

  return (
    <Stack
      w={['100%', '50%']}
      rounded={['md', 'sm']}
      bg="rgba(100, 100, 100, 0.045)"
      direction={['column', 'row']}
      justify="left"
      align={['end', 'start']}
      p="1em"
      spacing={['1em', '3.5em']}
    >
      <VStack spacing="1.5" maxW="max-content" mr={['2em', '0']}>
        <Link to={`/${type}/${id}/${titleForUrl}`}>
          <Image maxW="100px" h="auto" rounded="sm" src={imgUrl} />
        </Link>
        <Text color="orange" ml={['10em', '0']}>
          {year}
        </Text>
      </VStack>
      <VStack fontFamily="saira" align={['end', 'start']}>
        <HStack spacing="1em" ml="0.35em" mr={['2em', '0']}>
          <VStack align={['end', 'start']}>
            <Link to={`/${type}/${id}/${titleForUrl}`}>
              <Text
                color="orange"
                wordBreak="break-word"
                maxW={['200px', 'max-content']}
              >
                {title}
              </Text>
            </Link>
            <Text fontSize="0.8em" color="gray">
              {type == 'movie' ? 'Movie' : 'TV show'}
            </Text>
          </VStack>

          {idBeingUpdated == id ? (
            <Spinner alignSelf="center" size="lg" color="orange" speed="0.8s" />
          ) : (
            <IconButton
              onClick={() =>
                handleAddOrDeleteMovie(added, token, id, movieObject, dispatch)
              }
              variant="outline"
              colorScheme={added ? 'red' : 'green'}
              aria-label="add or delete movie from watchlist"
              icon={added ? <BsBookmarkCheck /> : <BsBookmarkPlus />}
            />
          )}
        </HStack>
        <Text
          fontFamily="liberation-sans"
          p="0.5em"
          fontSize="0.8em"
          color="darkgray"
          isTruncated={isDescriptionTruncated}
          maxW={['320px', '500px']}
          h="auto"
          bg="rgba(100, 100, 100, 0.085)"
          rounded="md"
        >
          {overview}
        </Text>
        {String(overview).length > 60 ? (
          <Text
            fontSize="0.8em"
            fontFamily="liberation-sans"
            color="orange.600"
            cursor="pointer"
            onClick={toggleTruncated}
          >
            {toggleText}
          </Text>
        ) : (
          ''
        )}
      </VStack>
    </Stack>
  );
}

export default MediaResult;
