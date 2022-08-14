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
import { tmdbAPI } from '../../services/tmdbAPI';
import { Link } from 'react-router-dom';
import ImgNotFound from '../../images/imageNotFound.png';
import { useAppDispatch } from '../../app/store';
import { handleAddOrDeleteMovie } from '../../services/handleAddOrDeleteMovie';
import {
  getWatchlist,
  getIdBeingUpdated,
} from '../../features/watchlist/watchlistSlice';
import { getUserData } from '../../features/auth/authSlice';

function MediaCard(props: { object: MediaObject; size: string }) {
  const dispatch = useAppDispatch();

  const watchlist = useSelector(getWatchlist) || ([] as MediaObject[]);
  const { token } = useSelector(getUserData);
  const idBeingUpdated = useSelector(getIdBeingUpdated);

  const id = (props.object.id = String(props.object.id));

  const type = (props.object.type = props.object.media_type);

  const isMovie = type == 'movie';

  const imgUrl = (props.object.imgUrl = props.object.poster_path
    ? tmdbAPI.image.getPoster(props.object.poster_path as string, 342)
    : ImgNotFound);

  const title = (props.object.title = isMovie
    ? props.object.title
    : (props.object.name as string));

  const titleForUrl = (props.object.titleForUrl = String(title).replace(
    /\s/g,
    '_'
  ));
  const year = (props.object.year = String(
    isMovie ? props.object.release_date : props.object.first_air_date
  ).slice(0, 4));

  let rating = String(props.object.vote_average);
  rating = String(
    Number(rating.length > 1 ? rating : `${rating}.0`).toFixed(1)
  );

  const added = useMemo(() => {
    return watchlist.some((media: MediaObject) => media.id == id);
  }, [watchlist]);

  const movieObject = {
    id,
    type,
    imgUrl,
    title,
    titleForUrl,
    year,
    overview: props.object.overview,
  };

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
