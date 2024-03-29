import { Flex, Text, HStack, Link } from '@chakra-ui/react';

export function Footer() {
  return (
    <Flex as="footer">
      <HStack
        color="gray"
        paddingX={['1em', '0']}
        pb="1em"
        alignSelf="center"
        align="center"
        justify="space-around"
        spacing={['1em', '5em']}
      >
        <Text>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </Text>
        <Text>
          Made by{' '}
          <Link
            color="orange.200"
            target="_blank"
            href="https://gomezdn.github.io/portfolio/"
          >
            gomezdn
          </Link>
        </Text>
      </HStack>
    </Flex>
  );
}
