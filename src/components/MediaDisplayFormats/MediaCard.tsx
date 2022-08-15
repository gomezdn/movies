import { useSelector } from 'react-redux';
import {
  Stack,
  HStack,
  IconButton,
  Text,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { BsBookmarkPlus, BsBookmarkCheck } from 'react-icons/bs';
import { useMemo } from 'react';
import { MediaObject } from '../../Types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { handleAddOrDeleteMovie } from '../../services/handleAddOrDeleteMovie';
import {
  getWatchlist,
  getIdBeingUpdated,
} from '../../features/watchlist/watchlistSlice';
import { getUserData } from '../../features/auth/authSlice';
import { getMediaCardProps } from '../../services/makePropsForMediaCard';

function MediaCard(props: { object: MediaObject; size: string }) {
  const dispatch = useAppDispatch();

  const watchlist = useSelector(getWatchlist) || ([] as MediaObject[]);
  const { token } = useSelector(getUserData);
  const idBeingUpdated = useSelector(getIdBeingUpdated);
  const { movieObject, rating } = getMediaCardProps(props.object);
  const { id, type, imgUrl, title, titleForUrl, year } = movieObject;

  const added = useMemo(() => {
    return watchlist.some((media: MediaObject) => media.id == id);
  }, [watchlist]);

  return (
    <Stack
      p="0.5em"
      rounded="sm"
      bg="black"
      align="center"
      spacing="1em"
      direction={['row', 'column']}
    >
      <Link to={`/${type}/${id}/${titleForUrl}`}>
        <Box
          w={['150px', `${props.size}px`]}
          h={['225px', `${Number(props.size) * 1.5}px`]}
          bgImage={imgUrl}
          bgSize="cover"
        >
          <HStack p="0.5em" justify="space-between" w="100%">
            {idBeingUpdated == id ? (
              <Spinner
                alignSelf="center"
                size="lg"
                color="orange"
                speed="0.8s"
              />
            ) : (
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  handleAddOrDeleteMovie(
                    added,
                    token,
                    id,
                    movieObject,
                    dispatch
                  );
                }}
                variant="solid"
                size="lg"
                colorScheme={added ? 'red' : 'green'}
                aria-label="add or delete movie from watchlist"
                icon={added ? <BsBookmarkCheck /> : <BsBookmarkPlus />}
              />
            )}

            <Text
              fontFamily="saira"
              cursor="pointer"
              userSelect="none"
              fontSize="1.4em"
              p="0.3em"
              borderRadius="50px"
              color="orange"
              bg="rgba(133, 133, 133, 0.322)"
            >
              {rating}
            </Text>
          </HStack>
        </Box>
      </Link>
      <Link to={`/${type}/${id}/${titleForUrl}`}>
        <Box
          fontFamily="roboto"
          wordBreak="break-word"
          fontSize="1em"
          color="orange"
          textAlign={['left', 'center']}
        >
          <Text wordBreak="keep-all">{title}</Text>
          <Text color="whiteAlpha.700">{`${year}`}</Text>
        </Box>
      </Link>
    </Stack>
  );
}

export default MediaCard;
