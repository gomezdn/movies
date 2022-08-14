import { VStack, Heading, Grid } from '@chakra-ui/react';
import { MediaObject } from '../Types';
import MediaCard from './MediaDisplayFormats/MediaCard';

function MediaCardsDisplay(props: {
  mediaList: MediaObject[];
  heading: string;
  size: string;
}) {
  return (
    <VStack w="100%" align="center" spacing="1.7em">
      <Heading
        fontSize={['2.5em', '4em']}
        fontFamily="saira"
        fontWeight="800"
        color="goldenrod"
        textShadow="1px 1px 15px rgb(140, 140, 140)"
      >
        {props.heading}
      </Heading>
      <Grid
        w="100%"
        justifyItems={['left', 'center']}
        templateColumns={['1fr', 'repeat(4, 1fr)']}
      >
        {props.mediaList?.map((media: MediaObject) => (
          <MediaCard size={props.size} key={String(media.id)} object={media} />
        ))}
      </Grid>
    </VStack>
  );
}

export { MediaCardsDisplay };
