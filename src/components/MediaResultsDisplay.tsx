import { MediaObject } from '../Types';
import MediaResult from './MediaDisplayFormats/MediaResult';
import { VStack, StackDivider } from '@chakra-ui/react';

function MediaResultsDisplay(props: { resultsToDisplay: MediaObject[] }) {
  return (
    <VStack
      align="center"
      justify="center"
      bg="black"
      color="white"
      paddingY="2em"
      mt={['8em', '3em']}
      spacing="1em"
      divider={<StackDivider w="50%" alignSelf="center" />}
      w={['93%', '100%']}
    >
      {props.resultsToDisplay.map((result) => (
        <MediaResult object={result} key={String(result.id)} />
      ))}
    </VStack>
  );
}

export { MediaResultsDisplay };
