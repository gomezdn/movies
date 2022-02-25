import { Flex, Text, HStack, Link } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Flex as='footer'>
      <HStack color='gray' paddingX={['1em','']} pb='1em' alignSelf='center' align='center' justify='space-around' spacing={['1em', '5em']}>
        <Text>This product uses the TMDB API but is not endorsed or certified by TMDB.</Text>
        <Text>Made by <Link color='orange.200' target='_blank' href='https://www.linkedin.com/in/gomezdn/'>gomezdn</Link></Text>
      </HStack>
    </Flex>
  )
}