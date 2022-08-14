import { Heading } from '@chakra-ui/react';

function Filler(props: { fillerMsg: string; marginBottom?: string }) {
  return (
    <Heading
      fontFamily="saira"
      color="gray"
      mt={['6em', '4em']}
      p={['1em', '0']}
      mb={props.marginBottom || '7em'}
      textAlign="center"
    >
      {props.fillerMsg}
    </Heading>
  );
}

export { Filler };
